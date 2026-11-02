# Annotica

Лендинг annotica.ru на Next.js (App Router, standalone-сборка).

## Разработка

```bash
npm install
npm run dev
```

## Деплой в Docker

```bash
docker compose up -d --build
```

Сайт будет доступен на порту `3000` (другой порт: `PORT=8080 docker compose up -d --build`).
Шрифты лежат локально в `public/fonts`, поэтому сборке не нужен доступ к Google Fonts.

Без compose:

```bash
docker build -t annotica .
docker run -d --name annotica --restart unless-stopped -p 3000:3000 annotica
```

Для HTTPS поставьте перед контейнером reverse proxy (nginx, Caddy, Traefik).
# test
