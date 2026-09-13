import os, re, glob

os.chdir(r'D:\NetSpace\Websit\web-crosspals.com-v4')

links = set()
for f in glob.glob('dist/**/*.html', recursive=True):
    s = open(f, encoding='utf-8').read()
    for m in re.findall(r'href="(/[^"#?]*)"', s):
        links.add(m.rstrip('/') or '/')

routes = set()
for f in glob.glob('dist/**/*.html', recursive=True) + glob.glob('dist/**/*.xml', recursive=True):
    p = os.path.relpath(f, 'dist').replace(os.sep, '/')
    r = '/' + p
    r = r.replace('/index.html', '').replace('index.html', '')
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
