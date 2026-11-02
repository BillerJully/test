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

Поднимаются два контейнера:
- `annotica` — Next.js на внутреннем порту 3000 (наружу не публикуется);
- `annotica-caddy` — веб-сервер Caddy на портах 80 и 443, проксирует запросы в приложение
  и сам получает HTTPS-сертификат Let's Encrypt для `annotica.ru` и `www.annotica.ru`.

Для получения сертификата домен должен указывать на сервер, а порты 80 и 443 должны быть
открыты снаружи. Проверить по IP без HTTPS: `SITE_ADDRESS=:80 docker compose up -d`.

Шрифты лежат локально в `public/fonts`, поэтому сборке не нужен доступ к Google Fonts.

Без compose:

```bash
docker build -t annotica .
docker run -d --name annotica --restart unless-stopped -p 3000:3000 annotica
```

В этом варианте HTTPS нужно настраивать отдельно (nginx, Caddy, Traefik).
# test
