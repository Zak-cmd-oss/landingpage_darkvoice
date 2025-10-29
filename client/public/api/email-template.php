<?php
/**
 * Template de Email de Boas-Vindas - DarkVoice
 */

function getWelcomeEmailTemplate($nome) {
    $template = '
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo ao DarkVoice</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, sans-serif; background-color: #000000;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <!-- Container Principal -->
                <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); border-radius: 20px; border: 2px solid #00FF00; box-shadow: 0 0 40px rgba(0, 255, 0, 0.3);">
                    
                    <!-- Header com Logo -->
                    <tr>
                        <td align="center" style="padding: 40px 20px 20px;">
                            <img src="https://criandocomisaac.com/logo.png" alt="DarkVoice" width="120" height="120" style="border-radius: 20px; box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);">
                        </td>
                    </tr>
                    
                    <!-- Título -->
                    <tr>
                        <td align="center" style="padding: 20px 40px;">
                            <h1 style="margin: 0; font-size: 32px; font-weight: bold; background: linear-gradient(135deg, #00FF00 0%, #6B5FFF 50%, #FF1493 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                                🎉 Bem-vindo ao DarkVoice!
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Saudação Personalizada -->
                    <tr>
                        <td style="padding: 20px 40px;">
                            <p style="margin: 0; font-size: 18px; color: #FFFFFF; line-height: 1.6;">
                                Olá <strong style="color: #00FF00;">' . htmlspecialchars($nome) . '</strong>! 👋
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Mensagem Principal -->
                    <tr>
                        <td style="padding: 20px 40px;">
                            <p style="margin: 0 0 15px; font-size: 16px; color: #C0C0C0; line-height: 1.6;">
                                Ficamos muito felizes em ter você conosco! Você acaba de dar o primeiro passo para revolucionar a forma como cria conteúdo com voz.
                            </p>
                            <p style="margin: 0 0 15px; font-size: 16px; color: #C0C0C0; line-height: 1.6;">
                                O <strong style="color: #00FF00;">DarkVoice</strong> é a solução definitiva para clonagem de voz com IA, totalmente local, sem mensalidades e com privacidade total.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Box de Destaque -->
                    <tr>
                        <td style="padding: 20px 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(0, 255, 0, 0.1) 0%, rgba(107, 95, 255, 0.1) 100%); border-radius: 12px; border: 1px solid #00FF00;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <h2 style="margin: 0 0 15px; font-size: 20px; color: #00FF00; font-weight: bold;">
                                            🚀 O que você vai receber:
                                        </h2>
                                        <ul style="margin: 0; padding-left: 20px; color: #FFFFFF; font-size: 15px; line-height: 1.8;">
                                            <li><strong style="color: #6B5FFF;">Avisos exclusivos</strong> sobre o lançamento</li>
                                            <li><strong style="color: #6B5FFF;">Promoções especiais</strong> para primeiros clientes</li>
                                            <li><strong style="color: #6B5FFF;">Novidades</strong> e atualizações em primeira mão</li>
                                            <li><strong style="color: #6B5FFF;">Conteúdo exclusivo</strong> sobre IA de voz</li>
                                            <li><strong style="color: #FF1493;">Bônus especiais</strong> para membros da lista VIP</li>
                                        </ul>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Black Friday Antecipada -->
                    <tr>
                        <td style="padding: 20px 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(255, 20, 147, 0.2) 0%, rgba(107, 95, 255, 0.2) 100%); border-radius: 12px; border: 2px solid #FF1493;">
                                <tr>
                                    <td style="padding: 25px; text-align: center;">
                                        <h2 style="margin: 0 0 10px; font-size: 24px; color: #FF1493; font-weight: bold;">
                                            🔥 BLACK FRIDAY ANTECIPADA 2025
                                        </h2>
                                        <p style="margin: 0 0 10px; font-size: 16px; color: #FFFFFF;">
                                            Lançamento Especial - Começa dia <strong style="color: #00FF00;">10 de Novembro</strong>
                                        </p>
                                        <p style="margin: 0; font-size: 18px; color: #00FF00; font-weight: bold;">
                                            🎁 As 100 primeiras pessoas ganham TTS Emotion GRÁTIS!
                                        </p>
                                        <p style="margin: 10px 0 0; font-size: 14px; color: #C0C0C0;">
                                            (Valor: R$ 297)
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- CTA Button -->
                    <tr>
                        <td align="center" style="padding: 30px 40px;">
                            <a href="https://darkvoice.com" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #00FF00 0%, #6B5FFF 100%); color: #000000; text-decoration: none; font-size: 18px; font-weight: bold; border-radius: 50px; box-shadow: 0 4px 20px rgba(0, 255, 0, 0.4);">
                                🚀 Acessar DarkVoice
                            </a>
                        </td>
                    </tr>
                    
                    <!-- Mensagem de Agradecimento -->
                    <tr>
                        <td style="padding: 20px 40px;">
                            <p style="margin: 0; font-size: 16px; color: #C0C0C0; line-height: 1.6; text-align: center;">
                                Fique ligado! Em breve você receberá mais novidades. 🎤
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; border-top: 1px solid rgba(0, 255, 0, 0.2);">
                            <p style="margin: 0 0 10px; font-size: 14px; color: #6B5FFF; text-align: center;">
                                <strong>DarkVoice</strong> - IA de Clonagem de Voz Totalmente Local
                            </p>
                            <p style="margin: 0; font-size: 12px; color: #666666; text-align: center;">
                                © 2025 DarkVoice. Todos os direitos reservados.
                            </p>
                            <p style="margin: 10px 0 0; font-size: 12px; color: #666666; text-align: center;">
                                Desenvolvido por <span style="color: #00FF00;">Isaac Santana</span> — Connect Tribe
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    ';
    
    return $template;
}
