import os, re, glob

os.chdir(r'D:\NetSpace\Websit\web-crosspals.com-v4')

# 收集页面里出现过的站内链接（href）
links = set()
for f in glob.glob('dist/**/*.html', recursive=True):
    s = open(f, encoding='utf-8').read()
    for m in re.findall(r'href="(/[^"#?]*)"', s):
        links.add(m.rstrip('/') or '/')

# 收集 dist 里真实存在的每一个 URL（⚠️ 必须包含 .css/.png/.xml 等静态资源，
# 否则 /_astro/*.css、/favicon*.png 会被误报成死链）
routes = set()
for f in glob.glob('dist/**/*', recursive=True):
    if os.path.isdir(f):
        continue
    p = os.path.relpath(f, 'dist').replace(os.sep, '/')
    r = '/' + p
    if r.endswith('/index.html'):
        r = r[: -len('index.html')]
    routes.add(r)
    routes.add(r.rstrip('/') or '/')

bad = sorted(l for l in links if l not in routes)
print('routes:', len(routes), ' links:', len(links))
print('dead links:', bad if bad else '0 (none)')

# 图片资源检查
imgs = set()
for f in glob.glob('dist/**/*.html', recursive=True):
    s = open(f, encoding='utf-8').read()
    for m in re.findall(r'src="(/img/[^"]+)"', s):
        imgs.add(m)
missing = [i for i in imgs if not os.path.exists('dist' + i.replace('/', os.sep))]
print('imgs referenced:', len(imgs), ' missing:', missing if missing else '0 (none)')
