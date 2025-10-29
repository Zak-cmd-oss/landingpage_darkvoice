import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card3D } from '@/components/Card3D';
import { BlackFridayCounter } from '@/components/BlackFridayCounter';
import { useState } from 'react';
import { apiRequest } from '@/lib/api';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '@/components/LanguageSelector';

const KIWIFY_LINK = 'https://pay.kiwify.com.br/NomtmUP';

export default function Home() {
  const { t } = useTranslation();
  const [leadData, setLeadData] = useState({ name: '', email: '', whatsapp: '' });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!leadData.name || !leadData.email) {
      alert(t('home.lead_form.error_fields'));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/save-lead.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(leadData)
      });
      
      const result = await response.json();

      if (result.success) {
        alert(t('home.lead_form.success'));
        setLeadData({ name: '', email: '', whatsapp: '' });
      } else {
        alert(result.message || t('home.lead_form.error_submit'));
      }
    } catch (error) {
      console.error('Erro ao capturar lead:', error);
      alert(t('home.lead_form.error_submit'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-primary/20">
        <div className="container mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="DarkVoice" className="w-10 h-10" />
            <span className="font-display text-xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              DarkVoice
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#como-funciona" className="hover:text-primary transition-colors">{t('home.nav.how_it_works')}</a>
            <a href="#vantagens" className="hover:text-primary transition-colors">{t('home.nav.advantages')}</a>
            <a href="#depoimentos" className="hover:text-primary transition-colors">{t('home.nav.testimonials')}</a>
            <a href="#preco" className="hover:text-primary transition-colors">{t('home.nav.pricing')}</a>
            <a href="#requisitos" className="hover:text-primary transition-colors">{t('home.nav.requirements')}</a>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <a href={KIWIFY_LINK} target="_blank" rel="noopener noreferrer">
                {t('home.header.buy_now')}
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section com Captura de Leads */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background com estrelas */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.05),transparent_50%)]" />
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.7 + 0.3,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div className="space-y-6">
              <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight">
                {t('home.hero.title_part1')}{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t('home.hero.title_highlight1')}
                </span>{' '}
                {t('home.hero.title_part2')}{' '}
                <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                  {t('home.hero.title_highlight2')}
                </span>
              </h1>

              <p className="text-lg text-foreground leading-relaxed">
                {t('home.hero.description')}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  {t('home.hero.feature1')}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  {t('home.hero.feature2')}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <a href={KIWIFY_LINK} target="_blank" rel="noopener noreferrer">
                    {t('home.hero.cta_primary')}
                  </a>
                </Button>
              </div>
            </div>

            {/* Formulário de Captura de Leads */}
            <Card3D className="p-8 bg-card border border-primary/30 rounded-lg">
              <h3 className="font-display text-2xl font-bold mb-2 text-center">
                {t('home.lead_form.title')}
              </h3>
              <p className="text-sm text-foreground text-center mb-6">
                {t('home.lead_form.subtitle')}
              </p>

              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t('home.lead_form.name_label')}
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={t('home.lead_form.name_placeholder')}
                    value={leadData.name}
                    onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                    required
                    className="bg-background/50 border-primary/20"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t('home.lead_form.email_label')}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('home.lead_form.email_placeholder')}
                    value={leadData.email}
                    onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                    required
                    className="bg-background/50 border-primary/20"
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium mb-2">
                    {t('home.lead_form.whatsapp_label')}
                  </label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder={t('home.lead_form.whatsapp_placeholder')}
                    value={leadData.whatsapp}
                    onChange={(e) => setLeadData({ ...leadData, whatsapp: e.target.value })}
                    className="bg-background/50 border-primary/20"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('common.loading') : t('home.lead_form.submit_button')}
                </Button>
              </form>

              <div className="mt-6 flex items-center justify-center gap-4 text-xs text-foreground">
                <div className="flex items-center gap-1">
                  <span className="text-primary">🔒</span>
                  {t('home.lead_form.feature_record')}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-accent">🎤</span>
                  {t('home.lead_form.feature_clone')}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-secondary">🎙️</span>
                  {t('home.lead_form.feature_narrate')}
                </div>
              </div>
            </Card3D>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 bg-card/30">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="font-display text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('home.how_it_works_section.title')}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card3D className="card-how-it-works card-how-it-works-1 p-8 bg-card border border-primary/20 rounded-lg">
              <div className="card-icon text-6xl font-bold text-primary mb-4">1</div>
              <h3 className="font-display text-xl font-bold mb-3">{t('home.how_it_works_section.step1_title')}</h3>
              <p className="text-foreground">
                {t('home.how_it_works_section.step1_desc')}
              </p>
            </Card3D>

            <Card3D className="card-how-it-works card-how-it-works-2 p-8 bg-card border border-accent/20 rounded-lg">
              <div className="card-icon text-6xl font-bold text-accent mb-4">2</div>
              <h3 className="font-display text-xl font-bold mb-3">{t('home.how_it_works_section.step2_title')}</h3>
              <p className="text-foreground">
                {t('home.how_it_works_section.step2_desc')}
              </p>
            </Card3D>

            <Card3D className="card-how-it-works card-how-it-works-3 p-8 bg-card border border-secondary/20 rounded-lg">
              <div className="card-icon text-6xl font-bold text-secondary mb-4">3</div>
              <h3 className="font-display text-xl font-bold mb-3">{t('home.how_it_works_section.step3_title')}</h3>
              <p className="text-foreground">
                {t('home.how_it_works_section.step3_desc')}
              </p>
            </Card3D>
          </div>
        </div>
      </section>

      {/* Vantagens */}
      <section id="vantagens" className="py-20">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="font-display text-4xl font-bold text-center mb-12 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
            {t('home.advantages_section.title')}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card3D className="card-vantagens p-8 bg-card border border-primary/20 rounded-lg">
              <h3 className="font-display text-xl font-bold mb-3 text-primary">{t('home.advantages_section.adv1_title')}</h3>
              <p className="text-foreground">
                {t('home.advantages_section.adv1_desc')}
              </p>
            </Card3D>

            <Card3D className="card-vantagens p-8 bg-card border border-accent/20 rounded-lg">
              <h3 className="font-display text-xl font-bold mb-3 text-accent">{t('home.advantages_section.adv2_title')}</h3>
              <p className="text-foreground">
                {t('home.advantages_section.adv2_desc')}
              </p>
            </Card3D>

            <Card3D className="card-vantagens p-8 bg-card border border-secondary/20 rounded-lg">
              <h3 className="font-display text-xl font-bold mb-3 text-secondary">{t('home.advantages_section.adv3_title')}</h3>
              <p className="text-foreground">
                {t('home.advantages_section.adv3_desc')}
              </p>
            </Card3D>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-20 bg-card/30">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="font-display text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('home.testimonials_section.title')}
          </h2>
          <p className="text-center text-foreground mb-12">
            {t('home.testimonials_section.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(t('home.testimonials', { returnObjects: true }) as Array<{name: string, username: string, platform: string, text: string}>).map((testimonial, i) => (
              <Card3D key={i} className="card-testimonial p-6 bg-card border border-primary/10 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="avatar w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {testimonial.name}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.username}</div>
                    <div className="text-xs text-foreground">{testimonial.platform}</div>
                  </div>
                </div>
                <p className="text-sm text-foreground">{testimonial.text}</p>
                <Button variant="outline" size="sm" className="mt-4 w-full border-primary/20">
                  {t('home.testimonials_section.test_button')}
                </Button>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* Preço - Black Friday */}
      <section id="preco" className="py-20 relative overflow-hidden">
        {/* Background effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-orange-500/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            🔥 BLACK FRIDAY ANTECIPADA 2025 🔥
          </h2>
          <p className="text-center text-xl text-gray-300 mb-2">
            Lançamento Especial - Começa dia 10 de Novembro
          </p>
          <p className="text-center text-lg text-purple-400 mb-12 font-semibold">
            🎁 As 100 primeiras pessoas ganham TTS Emotion GRÁTIS!
          </p>

          <div className="max-w-4xl mx-auto">
            <Card3D className="card-pricing p-8 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-yellow-500/50 rounded-2xl shadow-2xl shadow-yellow-500/20">
              
              {/* Black Friday Counter */}
              <div className="mb-8">
                <BlackFridayCounter />
              </div>

              {/* Preços */}
              <div className="text-center mb-8 p-6 bg-black/50 rounded-xl border border-yellow-500/30">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-gray-500">
                    <p className="text-sm font-semibold mb-1">De:</p>
                    <p className="text-3xl md:text-4xl font-bold line-through">R$ 397</p>
                  </div>
                  <div className="text-6xl">→</div>
                  <div>
                    <p className="text-sm font-semibold mb-1 text-yellow-400">Por apenas:</p>
                    <p className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                      R$ 247
                    </p>
                  </div>
                </div>
                
                <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full font-bold text-lg">
                  💰 ECONOMIZE R$ 150 (38% OFF)
                </div>
                
                <p className="text-gray-400 mt-4 text-sm">
                  Pagamento único • Sem mensalidades • Acesso vitalício
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 bg-black/30 p-6 rounded-xl border border-gray-700">
                {/* Bônus TTS Emotion em destaque */}
                <li className="flex items-start gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3 rounded-lg border border-purple-500/30">
                  <span className="text-purple-400 mt-1 text-xl">🎁</span>
                  <span className="text-white font-bold">BÔNUS: TTS Emotion - IA de Voz com Emoções (Valor R$ 297) - GRÁTIS para as 100 primeiras pessoas!</span>
                </li>
                {(t('home.pricing_features', { returnObjects: true }) as string[]).map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-400 mt-1 text-xl">✓</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button 
                size="lg" 
                className="w-full h-16 text-xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-400 hover:via-orange-400 hover:to-red-400 text-black shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70 transition-all duration-300 hover:scale-105 animate-pulse"
                asChild
              >
                <a href={KIWIFY_LINK} target="_blank" rel="noopener noreferrer">
                  🔥 {t('home.pricing_section.buy_button')} 🔥
                </a>
              </Button>

              {/* Garantia e Social Proof */}
              <div className="mt-6 space-y-3">
                <p className="text-center text-sm text-gray-400">
                  🔒 {t('home.pricing_section.guarantee')}
                </p>
                
                <div className="flex items-center justify-center gap-2 text-sm text-green-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">Compra 100% segura e protegida</span>
                </div>

                <div className="text-center text-xs text-gray-500 italic">
                  ⚡ Oferta de lançamento válida a partir de 10 de Novembro ou até esgotar as 100 vagas
                </div>
                
                <div className="text-center mt-3 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                  <p className="text-sm text-purple-300 font-semibold">
                    🎁 Garanta seu bônus TTS Emotion (R$ 297) totalmente GRÁTIS!
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Apenas as 100 primeiras pessoas terão acesso a este bônus exclusivo
                  </p>
                </div>
              </div>
            </Card3D>
          </div>
        </div>
      </section>

      {/* Requisitos */}
      <section id="requisitos" className="py-20 bg-card/30">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="font-display text-4xl font-bold text-center mb-12 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
            {t('home.requirements_section.title')}
          </h2>

          <Card3D className="max-w-2xl mx-auto p-8 bg-card border border-primary/20 rounded-lg">
            <div className="space-y-4">
              {[
                { label: t('home.requirements_section.system'), value: t('home.requirements_section.system_value') },
                { label: t('home.requirements_section.cpu'), value: t('home.requirements_section.cpu_value') },
                { label: t('home.requirements_section.gpu'), value: t('home.requirements_section.gpu_value') },
                { label: t('home.requirements_section.ram'), value: t('home.requirements_section.ram_value') },
                { label: t('home.requirements_section.storage'), value: t('home.requirements_section.storage_value') },
              ].map((req, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-background/50 rounded border border-primary/10">
                  <span className="font-semibold text-foreground">{req.label}</span>
                  <span className="text-foreground/80">{req.value}</span>
                </div>
              ))}
            </div>
          </Card3D>
        </div>
      </section>

      {/* Footer Profissional */}
      <footer className="bg-card/50 border-t border-primary/20">
        <div className="container mx-auto px-6 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Logo e Descrição */}
            <div className="col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.png" alt="DarkVoice" className="w-12 h-12" />
                <span className="font-display text-xl font-bold">DarkVoice</span>
              </div>
              <p className="text-sm text-foreground mb-4">
                {t('home.footer.description')}
              </p>
              <div className="flex gap-3">
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                </a>
              </div>
            </div>

            {/* Links Rápidos */}
            <div>
              <h3 className="font-semibold mb-4">{t('home.footer.quick_links')}</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#funcionalidades" className="text-foreground hover:text-primary transition-colors">{t('home.nav.how_it_works')}</a></li>
                <li><a href="#vantagens" className="text-foreground hover:text-primary transition-colors">{t('home.nav.advantages')}</a></li>
                <li><a href="#depoimentos" className="text-foreground hover:text-primary transition-colors">{t('home.nav.testimonials')}</a></li>
                <li><a href="#preco" className="text-foreground hover:text-primary transition-colors">{t('home.nav.pricing')}</a></li>
                <li><a href="#requisitos" className="text-foreground hover:text-primary transition-colors">{t('home.nav.requirements')}</a></li>
              </ul>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="font-semibold mb-4">{t('home.footer.faq_title')}</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">{t('home.footer.faq_1')}</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">{t('home.footer.faq_2')}</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">{t('home.footer.faq_3')}</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">{t('home.footer.faq_4')}</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">{t('home.footer.faq_5')}</a></li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h3 className="font-semibold mb-4">{t('home.footer.contact_title')}</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-foreground">{t('home.footer.contact_email')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span className="text-foreground">{t('home.footer.contact_phone')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-foreground">{t('home.footer.contact_hours')}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Linha de separação */}
          <div className="border-t border-primary/20 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground">
              <div>
                {t('home.footer.copyright')}
              </div>
              <div className="flex gap-6">
                <a href="/legal/termos-de-uso.md" target="_blank" className="hover:text-primary transition-colors">{t('home.footer.terms')}</a>
                <a href="/legal/politica-de-privacidade.md" target="_blank" className="hover:text-primary transition-colors">{t('home.footer.privacy')}</a>
                <a href="/legal/politica-de-reembolso.md" target="_blank" className="hover:text-primary transition-colors">{t('home.footer.refund')}</a>
              </div>
              <div>
                {t('home.footer.developed_by')} <span className="text-primary">Isaac Santana</span> — Connect Tribe
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

