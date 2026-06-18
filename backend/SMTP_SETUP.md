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
