<?php
$to = 'taffythedev@gmail.com';
$name = !empty($_POST['name']) ? filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING) : '';
$from = !empty($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : $to;
$message = !empty($_POST['message']) ? filter_var(trim($_POST['message']), FILTER_SANITIZE_STRING) : '';

$body = "Name: {$name}\r\nEmail: {$from}\r\nMessage: {$message}";

$body = wordwrap($body, 70, "\r\n");

$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/plain; charset=iso-8859-1',
    "From: $name <$from>",
    "Reply-To: <$from>",
    'X-Mailer: PHP/' .phpversion()
];

$success = mail($to, $subject, $body, implode("\r\n", $headers));

if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
    die(json_encode(['success' => $success]));
}

echo $success ? 'Sent Successfully.' : 'An error occurred';

ini_set('display_errors', 1); error_reporting(E_ALL);