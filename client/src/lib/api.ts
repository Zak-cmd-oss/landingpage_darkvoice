// Configuração da API
const isDevelopment = import.meta.env.DEV;
const PRODUCTION_API_URL = 'https://darkvoice.criandocomisaac.com';

export const API_BASE_URL = isDevelopment ? '' : PRODUCTION_API_URL;

// Função para fazer requisições à API
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Mock para desenvolvimento - captura de leads
  if (isDevelopment) {
    return mockApiRequest(endpoint, options);
  }
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

// Mock da API para desenvolvimento
async function mockApiRequest(endpoint: string, options: RequestInit = {}) {
  // Simular delay de rede
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Captura de leads
  if (endpoint.includes('capture-lead')) {
    const body = JSON.parse(options.body as string);
    
    // Simular salvamento do lead (em produção, isso será enviado ao backend)
    console.log('Lead capturado (mock):', body);
    
    // Salvar no localStorage temporariamente
    const leads = JSON.parse(localStorage.getItem('darkvoice_leads') || '[]');
    leads.push({
      ...body,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('darkvoice_leads', JSON.stringify(leads));
    
    return {
      success: true,
      message: 'Lead capturado com sucesso!'
    };
  }
  
  // Fallback
  return {
    success: false,
    message: 'Endpoint não implementado'
  };
}
