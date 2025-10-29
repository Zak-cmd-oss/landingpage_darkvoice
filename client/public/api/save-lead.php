<?php
/**
 * API para Salvar Leads - DarkVoice
 */

require_once 'config.php';
require_once 'email-template.php';

// Permitir OPTIONS para CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Apenas POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Método não permitido'
    ]);
    exit;
}

// Obter dados do POST
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validar dados
$nome = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$whatsapp = trim($data['whatsapp'] ?? '');

// Validações
$errors = [];

if (empty($nome)) {
    $errors[] = 'Nome é obrigatório';
}

if (empty($email)) {
    $errors[] = 'Email é obrigatório';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Email inválido';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Dados inválidos',
        'errors' => $errors
    ]);
    exit;
}

try {
    // Conectar ao banco
    $pdo = getDBConnection();
    
    // Verificar se email já existe
    $stmt = $pdo->prepare("SELECT id FROM Leads_DarkVoice WHERE email = ?");
    $stmt->execute([$email]);
    
    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode([
            'success' => false,
            'message' => 'Este email já está cadastrado!'
        ]);
        exit;
    }
    
    // Inserir lead
    $stmt = $pdo->prepare("
        INSERT INTO Leads_DarkVoice (nome, email, whatsapp, status, created_at, updated_at)
        VALUES (?, ?, ?, 'new', NOW(), NOW())
    ");
    
    $stmt->execute([$nome, $email, $whatsapp]);
    
    // Enviar email de boas-vindas via Resend
    $emailResult = sendWelcomeEmail($nome, $email);
    
    // Resposta de sucesso
    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Lead cadastrado com sucesso!',
        'email_sent' => $emailResult['success'],
        'data' => [
            'id' => $pdo->lastInsertId(),
            'nome' => $nome,
            'email' => $email
        ]
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Erro ao salvar lead',
        'error' => $e->getMessage()
    ]);
}

/**
 * Enviar email de boas-vindas via Resend API
 */
function sendWelcomeEmail($nome, $email) {
    $subject = '🎉 Bem-vindo ao DarkVoice - Black Friday Antecipada 2025!';
    $htmlBody = getWelcomeEmailTemplate($nome);
    
    // Enviar via Resend API
    return sendEmailViaResend($email, $subject, $htmlBody, $nome);
}
