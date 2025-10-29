<?php
/**
 * Configuração do Banco de Dados - DarkVoice
 */

// Configurações do MySQL
define('DB_HOST', getenv('DB_HOST') ?: 'srv1783.hstgr.io');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_NAME', getenv('DB_NAME') ?: 'u237960740_darkvoice');
define('DB_USER', getenv('DB_USER') ?: 'u237960740_darkvoice');
define('DB_PASS', getenv('DB_PASS') ?: 'h)5.P/Sfzn23}6f"');

// Configurações de Email
define('SMTP_HOST', getenv('SMTP_HOST') ?: 'smtp.hostinger.com');
define('SMTP_PORT', getenv('SMTP_PORT') ?: '465');
define('SMTP_USER', getenv('SMTP_USER') ?: 'contato@darkvoice.com');
define('SMTP_PASS', getenv('SMTP_PASS') ?: '');
define('SMTP_FROM_EMAIL', 'contato@darkvoice.com');
define('SMTP_FROM_NAME', 'DarkVoice');

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
