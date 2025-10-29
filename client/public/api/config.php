<?php
/**
 * Configuração do Banco de Dados e Email - DarkVoice
 */

// Configurações do MySQL
define('DB_HOST', getenv('DB_HOST') ?: 'srv1783.hstgr.io');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_NAME', getenv('DB_NAME') ?: 'u237960740_darkvoice');
define('DB_USER', getenv('DB_USER') ?: 'u237960740_darkvoice');
define('DB_PASS', getenv('DB_PASS') ?: 'h)5.P/Sfzn23}6f"');

// Configurações de Email - Resend API
define('RESEND_API_KEY', getenv('RESEND_API_KEY') ?: 're_ECXfg7F1_5hoT6jVSAgvVYa5JDCE8vYWp');
define('EMAIL_FROM', 'suporte@criandocomisaac.com');
define('EMAIL_FROM_NAME', 'DarkVoice');
define('EMAIL_REPLY_TO', 'atendimento@criandocomisaac.com');

// Timezone
date_default_timezone_set('America/Sao_Paulo');

// Headers CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Função para conectar ao banco
function getDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]);
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Erro ao conectar ao banco de dados'
        ]);
        exit;
    }
}

/**
 * Enviar email via Resend API
 */
function sendEmailViaResend($to, $subject, $htmlBody, $toName = '') {
    $url = 'https://api.resend.com/emails';
    
    $data = [
        'from' => EMAIL_FROM_NAME . ' <' . EMAIL_FROM . '>',
        'to' => $toName ? [$toName . ' <' . $to . '>'] : [$to],
        'reply_to' => EMAIL_REPLY_TO,
        'subject' => $subject,
        'html' => $htmlBody
    ];
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . RESEND_API_KEY,
        'Content-Type: application/json'
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        return [
            'success' => true,
            'response' => json_decode($response, true)
        ];
    } else {
        error_log('Erro ao enviar email via Resend: ' . $response);
        return [
            'success' => false,
            'error' => $response
        ];
    }
}
