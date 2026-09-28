# 🏎️ Traffic Racer

3D araba oyunu - kaza yapmadan ilerle, para kazan!

## Kurulum

1. Vercel'de GitHub repo'yu import et
2. Environment Variables ekle:
   - `EMAIL_USER` → Gmail adresin
   - `EMAIL_PASS` → Gmail App Password
   - `EMAIL_TO` → Bildirimlerin geleceği e-posta
3. Deploy et

## Dosyalar

- `index.html` - Oyun
- `api/notify.js` - E-posta bildirim API'si
- `models/` - 3D araba modelleri (.glb)

## Modeller

`models/player.glb` ve `models/enemy.glb` dosyalarını yükle.
Model yoksa oyun otomatik olarak yedek kutu araba kullanır.
