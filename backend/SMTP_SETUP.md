# Booking Email SMTP Setup

The booking form sends automatic emails through `backend/send-booking.php`.
HTML, CSS, and JavaScript cannot send real emails by themselves, so the site must be served by PHP.

## Local PHP Test

From the `taffydevs` folder, run:

```bash
php -S localhost:8000
```

Then open:

```text
http://localhost:8000/pages/booking.html
```

Do not open `booking.html` directly from the file system.

## SMTP Environment Variables

Set these on your hosting account/server:

```text
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=tls
SMTP_USERNAME=taffydevs@gmail.com
SMTP_PASSWORD=replace here
SMTP_FROM=taffydevs@gmail.com
```

For Gmail, `SMTP_PASSWORD` should be a Gmail App Password, not the normal Gmail login password.

If `SMTP_HOST` is not set, the PHP file falls back to PHP `mail()`, which only works when the hosting provider has email sending enabled.

## GitHub Pages vs Hostinger

GitHub Pages cannot run PHP. The booking page will load there, but automatic booking emails cannot be sent because `backend/send-booking.php` is never executed.

If you keep the frontend on GitHub Pages and host only the PHP backend on Hostinger:

1. Upload `backend/send-booking.php` to Hostinger, for example:

```text
https://yourdomain.com/backend/send-booking.php
```

2. In `js/main.js`, set:

```js
const BOOKING_ENDPOINT_URL = 'https://yourdomain.com/backend/send-booking.php';
```

3. Keep `https://taffydevs11.github.io` in the `$allowedOrigins` list inside `send-booking.php`.

For Hostinger:

1. Upload the contents of the `taffydevs` folder to `public_html`.
2. Open the booking page from your Hostinger domain, not from GitHub Pages.
3. Add the SMTP values above in Hostinger's environment/configuration area if available.
4. If your Hostinger plan does not expose environment variables, copy `backend/booking-config.example.php` to `backend/booking-config.php` on Hostinger and put the real app password there.
5. Never commit or upload your real Gmail app password to GitHub.
