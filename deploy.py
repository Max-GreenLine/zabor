# -*- coding: utf-8 -*-
"""Деплой сайта на reg.ru по SFTP.
   python deploy.py            — index.html, styles.css, app.js, politika.html, img/, api/lead.php
   python deploy.py --htaccess — дополнительно .htaccess (только после выпуска валидного сертификата!)
Доступы — в ../.ftp_creds (host=/user=/pass=). Секреты ТГ лежат на сервере в ~/secrets/, их не трогаем."""
import io, os, re, sys, pathlib, paramiko

ROOT = pathlib.Path(__file__).resolve().parent
kv = dict(re.findall(r'(\w+)\s*[=:]\s*(\S+)', io.open(ROOT.parent / '.ftp_creds', encoding='utf-8-sig').read()))
DOC = '/var/www/u3616200/data/www/arsenal-zabor.ru'

files = ['index.html', 'styles.css', 'app.js', 'politika.html', 'favicon.ico', 'api/lead.php']
files += [p.relative_to(ROOT).as_posix() for p in (ROOT / 'img').rglob('*') if p.is_file()]
if '--htaccess' in sys.argv:
    files.append('.htaccess')

c = paramiko.SSHClient(); c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect(kv['host'], username=kv['user'], password=kv['pass'], timeout=20)
sftp = c.open_sftp()

def mkdirp(p):
    try: sftp.stat(p)
    except FileNotFoundError: mkdirp(os.path.dirname(p)); sftp.mkdir(p)

uploaded = 0
for f in files:
    src = ROOT / f
    if not src.exists():
        print('skip (нет файла):', f); continue
    dst = f'{DOC}/{f}'
    mkdirp(os.path.dirname(dst))
    try:
        if sftp.stat(dst).st_size == src.stat().st_size and f.startswith('img/'):
            continue  # картинки не меняются — не гоняем
    except FileNotFoundError:
        pass
    sftp.put(str(src), dst); uploaded += 1
sftp.close(); c.close()
print(f'deployed {uploaded} files -> {DOC}')
