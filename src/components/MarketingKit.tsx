import React, { useState } from 'react';
import { Megaphone, Copy, Check, MessageSquare, Compass, Send } from 'lucide-react';
import { MARKETING_TEMPLATES } from '../data/tweaks';

export default function MarketingKit() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <Megaphone className="h-5 w-5 text-indigo-400" />
        <h3 className="text-base font-bold text-white tracking-tight font-sans">
          Kit Empreendedor & Vendas de Otimização
        </h3>
      </div>
      
      <p className="text-xs text-slate-400 mb-5 leading-relaxed">
        Você mencionou que divulga seu produto no link <code className="text-indigo-300 font-mono">limpezadesistema.netlify.app</code> nas redes sociais. 
        Use estes templates profissionais de alta conversão para atrair mais clientes no Instagram, TikTok, WhatsApp e para entregar as instruções corretas de uso!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MARKETING_TEMPLATES.map((template, idx) => (
          <div 
            key={idx} 
            className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                {idx === 0 ? (
                  <Compass className="h-4 w-4 text-pink-400" />
                ) : idx === 1 ? (
                  <MessageSquare className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Send className="h-4 w-4 text-sky-400" />
                )}
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-sans">
                  {template.name}
                </h4>
              </div>
              <p className="text-xs text-slate-400 font-mono whitespace-pre-wrap bg-slate-950 p-2.5 rounded-lg border border-slate-900/50 max-h-48 overflow-y-auto mb-3 text-left">
                {template.copy}
              </p>
            </div>
            
            <button
              onClick={() => copyToClipboard(template.copy, idx)}
              className={`w-full py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wide transition-all ${
                copiedIndex === idx
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-800 hover:bg-slate-705 text-slate-300 border border-slate-750/30'
              }`}
            >
              {copiedIndex === idx ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copiado para Área de Trabalho!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copiar Copy / Template
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
