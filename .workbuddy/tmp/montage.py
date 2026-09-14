import os
from PIL import Image, ImageDraw, ImageFont

S = r"D:\NetSpace\Websit\web-crosspals.com-v4\.workbuddy\tmp\shots"
OUT = r"D:\NetSpace\Websit\web-crosspals.com-v4\.workbuddy\tmp"

def font(sz):
    for p in [r"C:\Windows\Fonts\segoeui.ttf", r"C:\Windows\Fonts\arial.ttf"]:
        if os.path.exists(p):
            return ImageFont.truetype(p, sz)
    return ImageFont.load_default()

def load(p):
    return Image.open(os.path.join(S, p)).convert("RGB")

# ---------- 1) BEFORE / AFTER (WHY section) ----------
before = load("el_why390.png")      # captured before fix
after  = load("after_why390.png")
H = 1000
def fit(im, h):
    w = int(im.width * h / im.height)
    return im.resize((w, h), Image.LANCZOS)
b, a = fit(before, H), fit(after, H)
gap, pad, top = 40, 40, 96
W = pad*2 + b.width + gap + a.width
canvas = Image.new("RGB", (W, H + top + pad), "#f4ede0")
d = ImageDraw.Draw(canvas)
fbig, fmid = font(34), font(22)
d.text((pad, 30), "WHY section · iPhone 390px", font=fbig, fill="#1c2114")
cx = pad
for im, label, col in [(b, "BEFORE · right column clipped", "#be3a2e"),
                       (a, "AFTER · single column, clean", "#3a4a24")]:
    canvas.paste(im, (cx, top))
    d.rectangle([cx, top, cx+im.width-1, top+im.height-1], outline="#d4bfa0")
    d.text((cx, top-34), label, font=fmid, fill=col)
    cx += im.width + gap
p1 = os.path.join(OUT, "mobile_why_before_after.png")
canvas.save(p1)

# ---------- 2) MOBILE CONTACT SHEET ----------
order = [("top_home.png","Home"), ("top_services.png","Services"), ("top_about.png","About"),
         ("top_contact.png","Contact"), ("top_blog.png","Blog"),
         ("top_article.png","Article"), ("top_es.png","Home (ES)")]
th = 720
tiles = [(fit(load(f), th), lbl) for f, lbl in order]
gap, pad, top = 26, 36, 86
tw = sum(t[0].width for t in tiles) + gap*(len(tiles)-1)
canvas = Image.new("RGB", (pad*2 + tw, th + top + pad), "#faf6ef")
d = ImageDraw.Draw(canvas)
d.text((pad, 24), "CrossPals — mobile check @390px (all pages, no horizontal overflow)", font=font(34), fill="#1c2114")
cx = pad
for im, lbl in tiles:
    canvas.paste(im, (cx, top))
    d.rectangle([cx, top, cx+im.width-1, top+im.height-1], outline="#e8d8c0")
    d.text((cx+2, top-30), lbl, font=font(24), fill="#7a6848")
    cx += im.width + gap
p2 = os.path.join(OUT, "mobile_site_contact_sheet.png")
canvas.save(p2)

print("OK", p1, os.path.getsize(p1))
print("OK", p2, os.path.getsize(p2))
