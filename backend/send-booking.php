<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed.']);
    exit;
}

$businessEmail = 'taffydevs@gmail.com'; // replace here
$fromEmail = 'taffydevs@gmail.com'; // replace here
$siteName = 'TaffyDevs Web Agency';
$maxAttachmentBytes = 10 * 1024 * 1024;
$mailParams = '-f' . $fromEmail;

function env_value(string $key, string $default = ''): string
{
    $value = getenv($key);
    return $value === false ? $default : trim((string) $value);
}

function clean_text(string $key): string
{
    $value = isset($_POST[$key]) ? (string) $_POST[$key] : 'N/A';
    $value = trim(strip_tags($value));
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? $value;
    return $value === '' ? 'N/A' : $value;
}

function header_text(string $value): string
{
    return str_replace(["\r", "\n"], '', $value);
}

function deliver_mail(string $to, string $subject, string $message, array $headers, string $mailParams): bool
{
    $headerText = implode("\r\n", $headers);

    if (env_value('SMTP_HOST') !== '') {
        return smtp_send_mail($to, $subject, $message, $headers);
    }

    if (PHP_OS_FAMILY === 'Windows' || $mailParams === '') {
        return mail($to, header_text($subject), $message, $headerText);
    }

    return mail($to, header_text($subject), $message, $headerText, $mailParams);
}

function smtp_read($socket): string
{
    $response = '';
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (isset($line[3]) && $line[3] === ' ') {
            break;
        }
    }
    return $response;
}

function smtp_command($socket, string $command, array $expectedCodes): bool
{
    fwrite($socket, $command . "\r\n");
    $response = smtp_read($socket);
    $code = (int) substr($response, 0, 3);
    return in_array($code, $expectedCodes, true);
}

function smtp_data_body(array $headers, string $to, string $subject, string $message): string
{
    $allHeaders = array_merge($headers, [
        'To: <' . header_text($to) . '>',
        'Subject: ' . header_text($subject),
        'Date: ' . date(DATE_RFC2822),
    ]);

    $body = implode("\r\n", $allHeaders) . "\r\n\r\n" . $message;
    return preg_replace('/^\./m', '..', $body) ?? $body;
}

function smtp_send_mail(string $to, string $subject, string $message, array $headers): bool
{
    $host = env_value('SMTP_HOST');
    $port = (int) env_value('SMTP_PORT', '587');
    $username = env_value('SMTP_USERNAME');
    $password = env_value('SMTP_PASSWORD', 'idub ejma jbyy vjma');
    $secure = strtolower(env_value('SMTP_SECURE', 'tls'));
    $from = env_value('SMTP_FROM', env_value('SMTP_USERNAME', 'taffydevs@gmail.com'));
    $timeout = 20;
    $target = $secure === 'ssl' ? "ssl://{$host}:{$port}" : "{$host}:{$port}";

    $socket = @stream_socket_client($target, $errno, $errstr, $timeout);
    if (!$socket) {
        error_log("SMTP connection failed: {$errstr} ({$errno})");
        return false;
    }

    stream_set_timeout($socket, $timeout);
    $greeting = smtp_read($socket);
    if ((int) substr($greeting, 0, 3) !== 220) {
        fclose($socket);
        return false;
    }

    $serverName = $_SERVER['SERVER_NAME'] ?? 'localhost';
    if (!smtp_command($socket, "EHLO {$serverName}", [250])) {
        fclose($socket);
        return false;
    }

    if ($secure === 'tls') {
        if (!smtp_command($socket, 'STARTTLS', [220])) {
            fclose($socket);
            return false;
        }

        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            fclose($socket);
            return false;
        }

        if (!smtp_command($socket, "EHLO {$serverName}", [250])) {
            fclose($socket);
            return false;
        }
    }

    if ($username !== '' || $password !== '') {
        if (!smtp_command($socket, 'AUTH LOGIN', [334])) {
            fclose($socket);
            return false;
        }
        if (!smtp_command($socket, base64_encode($username), [334])) {
            fclose($socket);
            return false;
        }
        if (!smtp_command($socket, base64_encode($password), [235])) {
            fclose($socket);
            return false;
        }
    }

    if (!smtp_command($socket, 'MAIL FROM:<' . header_text($from) . '>', [250])) {
        fclose($socket);
        return false;
    }
    if (!smtp_command($socket, 'RCPT TO:<' . header_text($to) . '>', [250, 251])) {
        fclose($socket);
        return false;
    }
    if (!smtp_command($socket, 'DATA', [354])) {
        fclose($socket);
        return false;
    }

    fwrite($socket, smtp_data_body($headers, $to, $subject, $message) . "\r\n.\r\n");
    $sent = in_array((int) substr(smtp_read($socket), 0, 3), [250], true);
    smtp_command($socket, 'QUIT', [221]);
    fclose($socket);

    return $sent;
}

function money_line(): string
{
    return clean_text('price') . ' | Preferred currency: ' . clean_text('currency');
}

function booking_details(): string
{
    $rows = [
        'Package selected' => clean_text('package'),
        'Price' => money_line(),
        'Payment method chosen' => clean_text('paymentMethod'),
        'Full name' => clean_text('fullName'),
        'Email' => clean_text('email'),
        'Phone' => clean_text('phone'),
        'WhatsApp' => clean_text('whatsapp'),
        'Preferred call option' => clean_text('strategyCall'),
        'Service type' => clean_text('serviceType'),
        'Business name' => clean_text('businessName'),
        'Industry' => clean_text('industry'),
        'Business description' => clean_text('businessDescription'),
        'Target clients' => clean_text('targetClients'),
        'Main goal' => clean_text('mainGoal'),
        'Current website' => clean_text('currentWebsite'),
        'Preferred timeline' => clean_text('preferredTimeline'),
        'Visual style' => clean_text('visualStyle'),
        'Websites they like' => clean_text('inspiration'),
        'Competitors' => clean_text('competitors'),
        'Preferred / avoided colours' => clean_text('colours'),
        'Features needed' => clean_text('features'),
        'Logo file names' => clean_text('logoFile'),
        'Photos / image file names' => clean_text('photosFiles'),
        'Written content ready' => clean_text('contentReady'),
        'Other file names' => clean_text('otherFiles'),
        'Additional notes' => clean_text('additionalNotes'),
    ];

    $lines = [];
    foreach ($rows as $label => $value) {
        $lines[] = $label . ': ' . $value;
    }

    return implode("\n", $lines);
}

function uploaded_attachments(int $maxAttachmentBytes): array
{
    if (!isset($_FILES['booking_files'])) {
        return [];
    }

    $files = $_FILES['booking_files'];
    $attachments = [];
    $count = is_array($files['name']) ? count($files['name']) : 0;

    for ($i = 0; $i < $count; $i++) {
        if (($files['error'][$i] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
            continue;
        }

        $tmpName = (string) $files['tmp_name'][$i];
        $size = (int) $files['size'][$i];

        if (!is_uploaded_file($tmpName) || $size <= 0 || $size > $maxAttachmentBytes) {
            continue;
        }

        $safeName = preg_replace('/[^A-Za-z0-9._-]/', '_', basename((string) $files['name'][$i])) ?: 'attachment';
        $mimeType = (string) ($files['type'][$i] ?: 'application/octet-stream');

        $attachments[] = [
            'name' => $safeName,
            'type' => $mimeType,
            'content' => chunk_split(base64_encode((string) file_get_contents($tmpName))),
        ];
    }

    return $attachments;
}

function send_text_email(string $to, string $subject, string $body, array $headers, string $mailParams): bool
{
    return deliver_mail($to, $subject, $body, $headers, $mailParams);
}

function send_email_with_attachments(string $to, string $subject, string $body, array $headers, array $attachments, string $mailParams): bool
{
    if (count($attachments) === 0) {
        return send_text_email($to, $subject, $body, array_merge($headers, ['Content-Type: text/plain; charset=UTF-8']), $mailParams);
    }

    $boundary = 'TD-' . bin2hex(random_bytes(16));
    $message = "--{$boundary}\r\n";
    $message .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $message .= $body . "\r\n\r\n";

    foreach ($attachments as $attachment) {
        $name = header_text((string) $attachment['name']);
        $type = header_text((string) $attachment['type']);
        $message .= "--{$boundary}\r\n";
        $message .= "Content-Type: {$type}; name=\"{$name}\"\r\n";
        $message .= "Content-Transfer-Encoding: base64\r\n";
        $message .= "Content-Disposition: attachment; filename=\"{$name}\"\r\n\r\n";
        $message .= $attachment['content'] . "\r\n";
    }

    $message .= "--{$boundary}--";

    $headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';

    return deliver_mail($to, $subject, $message, $headers, $mailParams);
}

$clientEmail = clean_text('email');
$clientName = clean_text('fullName');

if (!filter_var($clientEmail, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'A valid client email is required.']);
    exit;
}

if ($clientName === 'N/A') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'A full name is required.']);
    exit;
}

$bookingReference = 'TD-' . gmdate('Ymd-His');
$details = booking_details();
$attachments = uploaded_attachments($maxAttachmentBytes);

$baseHeaders = [
    'MIME-Version: 1.0',
    'From: ' . header_text($siteName) . ' <' . header_text($fromEmail) . '>',
    'X-Mailer: PHP/' . phpversion(),
];

$businessHeaders = array_merge($baseHeaders, [
    'Reply-To: ' . header_text($clientName) . ' <' . header_text($clientEmail) . '>',
]);

$clientHeaders = array_merge($baseHeaders, [
    'Reply-To: ' . header_text($businessEmail),
    'Content-Type: text/plain; charset=UTF-8',
]);

$businessSubject = 'New TaffyDevs booking - ' . $clientName . ' - ' . $bookingReference;
$businessBody = "New booking received by TaffyDevs.\n\n"
    . "Booking reference: {$bookingReference}\n\n"
    . $details
    . "\n\nUploaded files are attached to this email when the client provided them.";

$clientSubject = 'TaffyDevs booking confirmation and invoice - ' . $bookingReference;
$clientBody = "Hi {$clientName},\n\n"
    . "Thank you for booking with TaffyDevs. Your booking has been received.\n\n"
    . "Invoice summary\n"
    . "Booking reference: {$bookingReference}\n"
    . "Package: " . clean_text('package') . "\n"
    . "Price: " . clean_text('price') . "\n"
    . "Preferred currency: " . clean_text('currency') . "\n"
    . "Payment method chosen: " . clean_text('paymentMethod') . "\n\n"
    . "Booking confirmation details\n"
    . $details
    . "\n\nTaffyDevs will follow up within 24 hours.\n\n"
    . "TaffyDevs\n"
    . $businessEmail;

$businessSent = send_email_with_attachments($businessEmail, $businessSubject, $businessBody, $businessHeaders, $attachments, $mailParams);
$clientSent = send_text_email($clientEmail, $clientSubject, $clientBody, $clientHeaders, $mailParams);

if (!$businessSent || !$clientSent) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'message' => 'The server could not send one or more emails.',
        'businessSent' => $businessSent,
        'clientSent' => $clientSent,
    ]);
    exit;
}

echo json_encode([
    'ok' => true,
    'message' => 'Booking emails sent.',
    'reference' => $bookingReference,
    'attachments' => count($attachments),
]);
