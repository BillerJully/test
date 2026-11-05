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

## Заявки в Telegram

Форма «Оставить заявку» отправляет `POST /api/lead`, сервер пересылает заявку ботом в Telegram.

1. Создайте `.env` на сервере рядом с `docker-compose.yml`:
   ```bash
   cp .env.example .env
   ```
   и впишите `TELEGRAM_BOT_TOKEN` (токен от @BotFather).
2. Узнайте ID чата: напишите боту `/start` (или добавьте бота в группу и напишите там что-нибудь),
   затем выполните на сервере и возьмите значение `"chat":{"id": ...}`:
   ```bash
   curl -s "https://api.telegram.org/bot$(grep ^TELEGRAM_BOT_TOKEN .env | cut -d= -f2)/getUpdates"
   ```
   Впишите его в `TELEGRAM_CHAT_ID` (для групп ID начинается с `-`; несколько — через запятую).
3. Перезапустите: `docker compose up -d`.

Ошибки доставки видны в `docker compose logs web`.

Без compose:

```bash
docker build -t annotica .
docker run -d --name annotica --restart unless-stopped -p 3000:3000 annotica
```

В этом варианте HTTPS нужно настраивать отдельно (nginx, Caddy, Traefik).
# test
