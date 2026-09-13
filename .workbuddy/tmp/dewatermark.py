"""Remove the bottom-right "AI生成 / WORKBUDDY>" watermark from ImageGen output.

Pure Pillow (no numpy/cv2).

Method per image:
  1. Box the watermark at the bottom-right corner (size scales with image height).
  2. Harmonic (Laplace) inpaint inside the box, seeded with the block above it,
     so the patch meets every surrounding pixel exactly -> no seam.
  3. Inject high-frequency texture from the block directly above, so the patch
     keeps the local grain instead of looking like a smooth blob.
"""
from PIL import Image, ImageFilter, ImageChops
import os, sys, glob, time

BOX_W = 170                      # covers x = w-124 .. w-6 with padding
MARGIN_R = 0
MARGIN_B = 2


def box_of(w, h):
    bh = max(64, int(h * 0.085))          # 768 -> 65, 1280 -> 108, 720 -> 64
    x1, y1 = w - MARGIN_R, h - MARGIN_B
    return (x1 - BOX_W, y1 - bh, x1, y1)


def harmonic_fill(im, box, iters=150):
    """Jacobi relaxation inside `box`; boundary = the surrounding image pixels."""
    x0, y0, x1, y1 = box
    bw, bh = x1 - x0, y1 - y0
    W, H = im.size
    P = im.load()

    # grid with a 1px fixed ring, initialised from the block directly above the box
    sy = max(0, y0 - bh - 2)
    grid = [[[0.0, 0.0, 0.0] for _ in range(bw + 2)] for _ in range(bh + 2)]
    for gy in range(bh + 2):
        for gx in range(bw + 2):
            ix, iy = x0 + gx - 1, y0 + gy - 1
            if gx == 0 or gy == 0 or gx == bw + 1 or gy == bh + 1:
                ix, iy = max(0, min(W - 1, ix)), max(0, min(H - 1, iy))
                px = P[ix, iy]
            else:
                px = P[max(0, min(W - 1, ix)), max(0, min(H - 1, sy + min(gy, bh + 1)))]
            grid[gy][gx] = [float(px[0]), float(px[1]), float(px[2])]

    for _ in range(iters):
        for gy in range(1, bh + 1):
            row, up, dn = grid[gy], grid[gy - 1], grid[gy + 1]
            for gx in range(1, bw + 1):
                lf, rt = row[gx - 1], row[gx + 1]
                cur = row[gx]
                cur[0] = (lf[0] + rt[0] + up[gx][0] + dn[gx][0]) * 0.25
                cur[1] = (lf[1] + rt[1] + up[gx][1] + dn[gx][1]) * 0.25
                cur[2] = (lf[2] + rt[2] + up[gx][2] + dn[gx][2]) * 0.25

    out = Image.new("RGB", (bw, bh))
    op = out.load()
    for gy in range(1, bh + 1):
        for gx in range(1, bw + 1):
            c = grid[gy][gx]
            op[gx - 1, gy - 1] = (
                max(0, min(255, int(c[0] + 0.5))),
                max(0, min(255, int(c[1] + 0.5))),
                max(0, min(255, int(c[2] + 0.5))),
            )
    return out


def process(path, verbose=True):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    x0, y0, x1, y1 = box_of(w, h)
    bw, bh = x1 - x0, y1 - y0

    t0 = time.time()
    base = harmonic_fill(im, (x0, y0, x1, y1), iters=150)

    # high-frequency detail borrowed from the block above (texture, not tone)
    sy = max(0, y0 - bh - 2)
    donor = im.crop((x0, sy, x1, sy + bh))
    donor = donor.resize((bw, bh), Image.LANCZOS)
    detail = ImageChops.subtract(
        donor, donor.filter(ImageFilter.GaussianBlur(4.5)), scale=1.0, offset=128
    )
    patch = ImageChops.add(base, detail, scale=1.0, offset=-128)

    # taper the injected detail right at the top/left seams to avoid a hairline
    taper = Image.new("L", (bw, bh), 255)
    tp = taper.load()
    F = 6
    for y in range(bh):
        for x in range(bw):
            a = 255
            if x < F:
                a = min(a, int(255 * (x + 1) / (F + 1)))
            if y < F:
                a = min(a, int(255 * (y + 1) / (F + 1)))
            tp[x, y] = a
    patch = Image.composite(patch, base, taper)

    out = im.copy()
    out.paste(patch, (x0, y0))
    out.save(path, "PNG")
    if verbose:
        print(f"{os.path.basename(path):22s} {w}x{h} box={bw}x{bh} {time.time()-t0:5.1f}s")
    return out


if __name__ == "__main__":
    files = sys.argv[1:] or sorted(
        f for f in glob.glob("public/img/*.png") if "logo" not in os.path.basename(f)
    )
    for f in files:
        process(f)
