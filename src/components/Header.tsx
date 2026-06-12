import React from 'react';
import { ShieldAlert, Zap, Laptop } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-800 py-6 px-4 md:px-8 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg ring-4 ring-indigo-500/10 animate-pulse">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight font-sans">
                Windows Optimizer Pro
              </h1>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium font-mono">
                v2.1 Build Builder
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-400 mt-0.5">
              Gerador Inteligente de Scripts (.bat) de Limpeza de Disco, Xbox DVR, Privacidade e SSD Booster.
            </p>
          </div>
        </div>

        {/* Informative Stats */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-2 px-1">
            <Laptop className="h-4 w-4 text-indigo-400" />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold font-mono">Compatibilidade</div>
              <div className="text-xs text-slate-200 font-semibold font-sans">Windows 10 / 11</div>
            </div>
          </div>
          <div className="h-6 w-px bg-slate-800 hidden sm:block" />
          <div className="flex items-center gap-2 px-1">
            <ShieldAlert className="h-4 w-4 text-emerald-400" />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold font-mono">Segurança</div>
              <div className="text-xs text-slate-200 font-semibold font-sans">Sem Instalação / Código Aberto</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
