# API de Captura de Leads - DarkVoice

Esta API gerencia a captura e armazenamento de leads no banco de dados MySQL.

## 📁 Estrutura

```
api/
├── config.php           # Configurações do banco e email
├── save-lead.php        # Endpoint para salvar leads
├── email-template.php   # Template HTML do email de boas-vindas
└── README.md           # Este arquivo
```

## 🚀 Deploy

### 1. Copiar arquivos para o servidor

Copie todos os arquivos da pasta `api/` para a raiz do seu servidor web (junto com o `index.html`).

```bash
# Estrutura no servidor:
/
├── index.html
├── api/
│   ├── config.php
│   ├── save-lead.php
│   └── email-template.php
├── assets/
└── ...
```

### 2. Configurar permissões

```bash
chmod 644 api/*.php
```

### 3. Configurar SMTP (Opcional)

Edite o arquivo `api/config.php` e configure as credenciais SMTP:

```php
define('SMTP_HOST', 'smtp.hostinger.com');
define('SMTP_PORT', '465');
define('SMTP_USER', 'contato@darkvoice.com');
define('SMTP_PASS', 'SUA_SENHA_AQUI');
```

**Nota:** Se não configurar o SMTP, os leads serão salvos no banco mas o email de boas-vindas não será enviado.

## 📡 Endpoint

### POST /api/save-lead

Salva um novo lead no banco de dados e envia email de boas-vindas.

**Request:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "whatsapp": "11999999999"
}
```

**Response (Sucesso - 201):**
```json
{
  "success": true,
  "message": "Lead cadastrado com sucesso!",
  "email_sent": true,
  "data": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com"
  }
}
```

**Response (Email duplicado - 409):**
```json
{
  "success": false,
  "message": "Este email já está cadastrado!"
}
```

**Response (Erro de validação - 400):**
```json
{
  "success": false,
  "message": "Dados inválidos",
  "errors": ["Nome é obrigatório", "Email inválido"]
}
```

## 🎨 Template de Email

O template de email utiliza a identidade visual do DarkVoice:

- **Cores:** Verde Neon (#00FF00), Roxo (#6B5FFF), Rosa (#FF1493)
- **Logo:** Incluída no email
- **Design:** Dark mode com gradientes
- **Conteúdo:** Boas-vindas + Black Friday Antecipada

## 🗄️ Banco de Dados

**Tabela:** `Leads_DarkVoice`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | int(11) | ID único (auto increment) |
| nome | varchar(255) | Nome completo |
| email | varchar(255) | Email (único) |
| whatsapp | varchar(20) | WhatsApp (opcional) |
| status | enum | new, contacted, converted, lost |
| created_at | timestamp | Data de criação |
| updated_at | timestamp | Data de atualização |

## 🔒 Segurança

- ✅ Validação de dados no servidor
- ✅ Prepared statements (proteção contra SQL Injection)
- ✅ CORS configurado
- ✅ Email único (evita duplicatas)
- ✅ Sanitização de inputs

## 🧪 Teste Local

Para testar localmente, você precisa de:
1. PHP 7.4+ com extensão PDO MySQL
2. Servidor web (Apache/Nginx)
3. Acesso ao banco de dados MySQL

```bash
# Testar com curl
curl -X POST http://localhost:3000/api/save-lead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "teste@example.com",
    "whatsapp": "11999999999"
  }'
```

## 📝 Logs

Erros de email são registrados no error_log do PHP. Verifique:
```bash
tail -f /var/log/apache2/error.log
```

## 🆘 Troubleshooting

### Email não está sendo enviado
- Verifique as credenciais SMTP em `config.php`
- Verifique se a porta 465 está aberta
- Confira os logs de erro do PHP

### Erro ao conectar no banco
- Verifique as credenciais em `config.php`
- Confirme que o servidor MySQL está acessível
- Verifique se a tabela `Leads_DarkVoice` existe

### CORS Error
- Verifique se o header `Access-Control-Allow-Origin` está configurado
- Confirme que o domínio está correto

---

**Desenvolvido por Isaac Santana — Connect Tribe**
