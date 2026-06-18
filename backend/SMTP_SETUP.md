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

For Hostinger:

1. Upload the contents of the `taffydevs` folder to `public_html`.
2. Open the booking page from your Hostinger domain, not from GitHub Pages.
3. Add the SMTP values above in Hostinger's environment/configuration area if available.
4. If your Hostinger plan does not expose environment variables, put the values into a private PHP config file outside `public_html` and load it from `send-booking.php`.
5. Never commit or upload your real Gmail app password to GitHub.
