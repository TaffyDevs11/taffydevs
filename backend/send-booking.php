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

function send_text_email(string $to, string $subject, string $body, array $headers): bool
{
    return mail($to, header_text($subject), $body, implode("\r\n", $headers));
}

function send_email_with_attachments(string $to, string $subject, string $body, array $headers, array $attachments): bool
{
    if (count($attachments) === 0) {
        return send_text_email($to, $subject, $body, array_merge($headers, ['Content-Type: text/plain; charset=UTF-8']));
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

    return mail($to, header_text($subject), $message, implode("\r\n", $headers));
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

$businessSent = send_email_with_attachments($businessEmail, $businessSubject, $businessBody, $businessHeaders, $attachments);
$clientSent = send_text_email($clientEmail, $clientSubject, $clientBody, $clientHeaders);

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
