<?php

// ================= SECURITY =================
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: index.html");
    exit();
}

// ================= SPAM CHECK =================
if (!empty($_POST['hidden_field'])) {
    exit("Spam detected");
}

// ================= FETCH DATA =================
$name    = htmlspecialchars(trim($_POST['name'] ?? ''), ENT_QUOTES, 'UTF-8');
$email   = htmlspecialchars(trim($_POST['email'] ?? ''), ENT_QUOTES, 'UTF-8');
$phone   = htmlspecialchars(trim($_POST['phone'] ?? ''), ENT_QUOTES, 'UTF-8');
$service = htmlspecialchars(trim($_POST['service'] ?? ''), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(trim($_POST['message'] ?? ''), ENT_QUOTES, 'UTF-8');

// ================= VALIDATION =================
if ($name === '' || $email === '' || $phone === '' || $service === '') {
    echo "Required fields missing.";
    exit();
}

// PHONE VALIDATION (India)
if (!preg_match('/^[6-9]\d{9}$/', $phone)) {
    echo "Invalid phone number.";
    exit();
}

// ================= EMAIL =================
$to = "hello@afrazalam.com";
$subject = "🔥 New Lead - AfrazAlam.com";

$fromEmail = "no-reply@afrazalam.com";
$fromName  = "Afraz Alam Website";

// ================= EMAIL BODY =================
$body = "
<html>
<head>
<style>
body { font-family: Arial; }
table { border-collapse: collapse; width: 100%; }
td { padding: 10px; border: 1px solid #ddd; }
</style>
</head>
<body>

<h2>🚀 New Lead Received</h2>

<table>
<tr><td><strong>Name</strong></td><td>{$name}</td></tr>
<tr><td><strong>Email</strong></td><td>{$email}</td></tr>
<tr><td><strong>Phone</strong></td><td>{$phone}</td></tr>
<tr><td><strong>Service</strong></td><td>{$service}</td></tr>
<tr><td><strong>Message</strong></td><td>{$message}</td></tr>
</table>

<br>
<p>
<b>Website:</b> https://afrazalam.com
</p>

</body>
</html>
";

// ================= HEADERS =================
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type:text/html;charset=UTF-8\r\n";
$headers .= "From: {$fromName} <{$fromEmail}>\r\n";
$headers .= "Reply-To: {$email}\r\n";

// ================= SEND =================
if (mail($to, $subject, $body, $headers)) {
    header("Location: thank-you.html");
    echo "<script>window.location.href='thank-you.html';</script>";
    exit();
} else {
    echo "Something went wrong.";
}

?>