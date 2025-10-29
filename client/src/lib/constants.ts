// DarkVoice - Constantes da Aplicação

export const BACKEND_URL = import.meta.env.PROD
  ? 'https://darkvoice.criandocomisaac.com'
  : 'https://darkvoice.criandocomisaac.com'; // Sempre usar backend PHP em produção

export const API_ENDPOINTS = {
  login: `${BACKEND_URL}/backend/server.php`,
  recover: `${BACKEND_URL}/backend/server.php`,
  validate: `${BACKEND_URL}/backend/server.php`,
  lessons: `${BACKEND_URL}/backend/server.php`,
  stats: `${BACKEND_URL}/backend/server.php`,
} as const;

export const KIWIFY_CHECKOUT_URL = 'https://pay.kiwify.com.br/pRA6NfD';

export const ROUTES = {
  home: '/',
  login: '/login',
  recover: '/recuperar-senha',
  members: '/membros',
  admin: '/admin',
} as const;

export const TESTIMONIALS = [
  {
    name: 'AS',
    username: '@asilva',
    platform: 'YouTube',
    text: 'O suporte multilíngue do DarkVoice é incrível. Boas vozes, sem qualquer ruído.',
  },
  {
    name: 'LF',
    username: '@lucasferreira',
    platform: 'Twitter',
    text: 'Comprando diretamente, o DarkVoice superou minha autenticidade e privacidade. Você realmente escolhe.',
  },
  {
    name: 'MC',
    username: '@mariacosta',
    platform: 'YouTube',
    text: 'O DarkVoice me ajudou a economizar horas de gravação. A comunidade aberta traz inovação e melhorias rápidas.',
  },
  {
    name: 'BT',
    username: '@brunotoste',
    platform: 'Reddit',
    text: 'É uma das melhores plataformas que usei. A clareza, expressividade e naturalidade superam as expectativas.',
  },
  {
    name: 'XX',
    username: '@xavierx',
    platform: 'Twitter',
    text: 'A qualidade lembra o leve — mais expressivo, estilisticamente natural e realista.',
  },
  {
    name: 'JS',
    username: '@joaosilva',
    platform: 'Discord',
    text: 'Sou um diretor de Spot. A comunidade aberta traz inovação e melhorias rápidas.',
  },
];

export const FEATURES = [
  {
    number: '1',
    title: 'Gravar voz',
    description: 'Use seu WAV com qualidade ideal para treinamento.',
  },
  {
    number: '2',
    title: 'Clonar com IA local',
    description: 'Processamento via ChatGPT/AI com total privacidade.',
  },
  {
    number: '3',
    title: 'Narrar roteiros (TTS)',
    description: 'Use modelos personalizados para narrações.',
  },
];

export const ADVANTAGES = [
  {
    title: 'Sem mensalidades',
    description: 'Clone e use, sem limites de uso.',
  },
  {
    title: '100% totalmente local',
    description: 'Nada sai do seu computador.',
  },
  {
    title: 'Privacidade total',
    description: 'Arquivos e dados não são enviados.',
  },
];

export const SYSTEM_REQUIREMENTS = {
  os: 'Windows 10/11',
  cpu: 'Quad-core 64-bit',
  gpu: 'NVIDIA CUDA Core (GTX 1060 ou superior)',
  ram: '8GB (mínimo)',
  storage: '10GB (espaço)',
};

