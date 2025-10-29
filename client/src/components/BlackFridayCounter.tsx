export function BlackFridayCounter() {
  return (
    <div className="space-y-4">
      {/* Badge de Black Friday */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-full animate-pulse">
        <span className="text-lg">🔥</span>
        <span>BLACK FRIDAY ANTECIPADA 2025</span>
        <span className="text-lg">🔥</span>
      </div>

      {/* Bônus TTS Emotion */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-4xl">🎁</div>
          <div className="flex-1">
            <p className="font-bold text-xl text-purple-300 mb-2">
              BÔNUS EXCLUSIVO PARA AS 100 PRIMEIRAS PESSOAS!
            </p>
            <p className="text-white font-semibold text-lg mb-3">
              🎤 TTS Emotion - A melhor IA de Voz com Emoções do mundo
            </p>
            <div className="space-y-2">
              <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-base font-bold">
                TOTALMENTE GRÁTIS (Valor: R$ 297)
              </div>
              <p className="text-sm text-gray-300 mt-2">
                ✨ Crie narrações com emoções realistas: alegria, tristeza, raiva, surpresa e muito mais!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
        <div className="flex items-center gap-2 text-sm text-green-400">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="font-semibold">
            Lançamento especial - Garanta seu bônus exclusivo!
          </span>
        </div>
      </div>
    </div>
  );
}
