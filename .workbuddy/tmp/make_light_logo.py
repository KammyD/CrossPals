"""生成 CrossPals 反白（米白）logo —— 用于深色顶栏。
源图是单色深绿 + alpha，只需保留 alpha 通道、把 RGB 平铺成米白。
"""
from PIL import Image

SRC = r'D:\NetSpace\Websit\web-crosspals.com-v4\public\img\logo-horizontal.png'
OUT = r'D:\NetSpace\Websit\web-crosspals.com-v4\public\img\logo-horizontal-light.png'
CREAM = (0xE8, 0xE5, 0xDA)   # #E8E5DA

im = Image.open(SRC).convert('RGBA')
w, h = im.size

flat = Image.new('RGBA', (w, h), CREAM + (0,))
# 用源图 alpha 作为新图的 alpha（保留抗锯齿边缘）
out = Image.new('RGBA', (w, h))
r, g, b, a = im.split()
cream_r = Image.new('L', (w, h), CREAM[0])
cream_g = Image.new('L', (w, h), CREAM[1])
cream_b = Image.new('L', (w, h), CREAM[2])
out = Image.merge('RGBA', (cream_r, cream_g, cream_b, a))
# 轻微锐化 alpha 边缘，避免深色底上发虚
out.save(OUT, 'PNG', optimize=True)
print('saved', OUT, out.size)

# 校验：不透明像素应全部为米白
px = out.load()
bad = 0
checked = 0
for y in range(0, h, 3):
    for x in range(0, w, 3):
        rr, gg, bb, aa = px[x, y]
        if aa > 200:
            checked += 1
            if (rr, gg, bb) != CREAM:
                bad += 1
print('opaque sampled:', checked, 'non-cream:', bad)
