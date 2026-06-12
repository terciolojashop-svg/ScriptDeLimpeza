import React, { useState } from 'react';
import Header from './components/Header';
import PerformanceImpact from './components/PerformanceImpact';
import ScriptConsole from './components/ScriptConsole';
import MarketingKit from './components/MarketingKit';
import { TWEAK_CATEGORIES, PRESETS } from './data/tweaks';

import {
  Trash2,
  Gamepad2,
  ShieldAlert,
  Cpu,
  Shield,
  Swords,
  EyeOff,
  Zap,
  Info,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  CheckCircle2,
  Lock,
  ExternalLink
} from 'lucide-react';

export default function App() {
  // Preset defaults to the popular safe cleanup recommendation
  const defaultPreset = PRESETS.find(p => p.id === 'ultra') || PRESETS[0];
  const [selectedTweakIds, setSelectedTweakIds] = useState<string[]>(
    defaultPreset.recommendedTweakIds
  );
  const [expandedTweakId, setExpandedTweakId] = useState<string | null>(null);
  const [activePresetId, setActivePresetId] = useState<string | null>('ultra');

  // Helper to render Category Icons dynamically & safely
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trash2':
        return <Trash2 className="h-5 w-5 text-sky-400" />;
      case 'Gamepad2':
        return <Gamepad2 className="h-5 w-5 text-violet-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="h-5 w-5 text-pink-400" />;
      case 'Cpu':
        return <Cpu className="h-5 w-5 text-amber-400" />;
      default:
        return <SlidersHorizontal className="h-5 w-5 text-indigo-400" />;
    }
  };

  // Helper to render Preset Icons dynamically & safely
  const renderPresetIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="h-4 w-4 text-emerald-400" />;
      case 'Swords':
        return <Swords className="h-4 w-4 text-violet-400" />;
      case 'EyeOff':
        return <EyeOff className="h-4 w-4 text-pink-400" />;
      case 'Cpu':
        return <Cpu className="h-4 w-4 text-amber-400" />;
      case 'Zap':
        return <Zap className="h-4 w-4 text-amber-300" />;
      default:
        return <Info className="h-4 w-4 text-indigo-400" />;
    }
  };

  // Handle individual toggle checkbox click
  const handleToggleTweak = (tweakId: string) => {
    setActivePresetId(null); // Switch to manual selection mode
    if (selectedTweakIds.includes(tweakId)) {
      setSelectedTweakIds(selectedTweakIds.filter(id => id !== tweakId));
    } else {
      setSelectedTweakIds([...selectedTweakIds, tweakId]);
    }
  };

  // Handle Preset Button click
  const handleSetPreset = (presetId: string, itemIds: string[]) => {
    setSelectedTweakIds(itemIds);
    setActivePresetId(presetId);
  };

  // Handle select all in a category
  const handleSelectAllInCategory = (categoryIds: string[]) => {
    setActivePresetId(null);
    const allSelectedInCat = categoryIds.every(id => selectedTweakIds.includes(id));
    if (allSelectedInCat) {
      // Remove all elements of this category
      setSelectedTweakIds(selectedTweakIds.filter(id => !categoryIds.includes(id)));
    } else {
      // Add all missing elements in this category
      const uniqueIds = Array.from(new Set([...selectedTweakIds, ...categoryIds]));
      setSelectedTweakIds(uniqueIds);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header component */}
      <Header />

      {/* Main Content View */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-6 md:gap-8">
        
        {/* Welcome Pitch and Conversion Pitch */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-indigo-950 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 h-40 w-40 bg-indigo-600/5 blur-[100px] pointer-events-none" />
          <div className="flex-1 text-left">
            <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
              Acelere a Entrega de Limpezas para seus clientes
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 leading-relaxed">
              Você já tem um MVP no ar. Agora, use esta plataforma para gerar scripts customizados de alta segurança para resolver as dores reais do cliente: lentidão, perda de foco com notificações, stutters em jogos, telemetrias secretas e desgaste acelerado de drives SSD.
            </p>
          </div>
          <div className="flex items-center gap-3 self-stretch md:self-auto">
            <a 
              href="https://limpezadesistema.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-700/80 hover:bg-slate-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-slate-200"
            >
              Visitar limpezadesistema.netlify.app
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Dynamic Estimated Dashboard Metrics */}
        <PerformanceImpact selectedTweakIds={selectedTweakIds} />

        {/* Core Layout: Customizer Column & Live Code Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          
          {/* LEFT: Tweaks Selection Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Quick Presets Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-xl">
              <h3 className="text-sm font-bold text-slate-200 mb-3 text-left uppercase tracking-wider font-mono">
                1. Selecione um Preset Pronto ou Customize
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => {
                  const isActive = activePresetId === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSetPreset(p.id, p.recommendedTweakIds)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all text-left ${
                        isActive
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/10'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-300'
                      }`}
                    >
                      {renderPresetIcon(p.icon)}
                      <div>
                        <div className="font-bold">{p.name}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Show preset short description */}
              {activePresetId && (
                <div className="mt-3 bg-indigo-950/10 border border-indigo-500/10 p-3 rounded-xl text-xs text-indigo-300 leading-relaxed text-left">
                  {PRESETS.find(p => p.id === activePresetId)?.description}
                </div>
              )}
            </div>

            {/* Custom Interactive Checklist Accordions */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
                  2. Ajustar Itens Individualmente
                </h3>
                <button 
                  onClick={() => handleSetPreset('custom_empty', [])}
                  className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline"
                >
                  Desmarcar Tudo
                </button>
              </div>

              {TWEAK_CATEGORIES.map((category) => {
                const categoryItemIds = category.items.map(i => i.id);
                const allSelected = categoryItemIds.every(id => selectedTweakIds.includes(id));
                const someSelected = categoryItemIds.some(id => selectedTweakIds.includes(id)) && !allSelected;

                return (
                  <div 
                    key={category.id} 
                    className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:border-slate-700/80"
                  >
                    {/* Category Header */}
                    <div className="bg-slate-900 p-4 md:p-5 flex items-start sm:items-center justify-between gap-3 border-b border-slate-800 text-left">
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                          {renderCategoryIcon(category.icon)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white font-sans">
                            {category.name}
                          </h4>
                          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      {/* Header Actions */}
                      <button
                        onClick={() => handleSelectAllInCategory(categoryItemIds)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition-all whitespace-nowrap ${
                          allSelected
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : someSelected
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-900 hover:text-slate-200'
                        }`}
                      >
                        {allSelected ? 'Todos Ativos' : someSelected ? 'Parcial' : 'Ativar Categoria'}
                      </button>
                    </div>

                    {/* Category Items List */}
                    <div className="divide-y divide-slate-800 bg-slate-900/50">
                      {category.items.map((item) => {
                        const isChecked = selectedTweakIds.includes(item.id);
                        const isExpanded = expandedTweakId === item.id;

                        // Color badge mapping
                        let safetyBadge = 'text-sky-400 bg-sky-500/10 border-sky-500/20';
                        if (item.safety === 'recommended') {
                          safetyBadge = 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
                        } else if (item.safety === 'advanced') {
                          safetyBadge = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
                        }

                        return (
                          <div 
                            key={item.id} 
                            className={`p-4 transition-colors text-left ${
                              isChecked ? 'bg-indigo-950/5' : 'bg-transparent'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {/* Custom Switch Checkbox */}
                              <label className="relative flex items-center cursor-pointer mt-0.5">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleToggleTweak(item.id)}
                                  className="sr-only peer"
                                />
                                <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 peer-checked:after:bg-indigo-400 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-650" />
                              </label>

                              {/* Text description */}
                              <div className="flex-grow">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span 
                                    onClick={() => handleToggleTweak(item.id)}
                                    className="text-xs sm:text-sm font-bold text-slate-100 cursor-pointer hover:text-indigo-300 transition-colors"
                                  >
                                    {item.name}
                                  </span>
                                  <span className={`text-[9px] px-1.5 py-0.5 rounded border uppercase tracking-wider font-bold font-mono ${safetyBadge}`}>
                                    {item.safety === 'safe' ? 'Seguro' : item.safety === 'recommended' ? 'Pró' : 'Avançado'}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-400 mt-1">
                                  {item.description}
                                </p>
                                
                                <div className="flex items-center gap-3 mt-2 text-[10px]">
                                  <span className="text-slate-500 font-medium">Impacto:</span>
                                  <span className="text-indigo-300 font-semibold">{item.impact}</span>
                                </div>
                              </div>

                              {/* Accordion view actions */}
                              <button
                                onClick={() => setExpandedTweakId(isExpanded ? null : item.id)}
                                className="text-slate-500 hover:text-slate-300 p-1 rounded-lg hover:bg-slate-800 transition"
                                title="Mostrar Código e Detalhes"
                              >
                                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                              </button>
                            </div>

                            {/* Detailed Code Accordion Dropdown */}
                            {isExpanded && (
                              <div className="mt-3 bg-slate-950 rounded-xl border border-slate-800 p-3.5 space-y-2">
                                <div className="text-[11px] text-slate-300 leading-relaxed">
                                  <strong className="text-indigo-400 font-semibold">O que isso faz:</strong> {item.explanation}
                                </div>
                                <div>
                                  <span className="text-[10px] text-slate-500 uppercase font-bold block font-mono">Linhas correspondentes de comando (.bat):</span>
                                  <pre className="text-[10px] text-emerald-400 font-mono bg-slate-900 border border-slate-900 p-2.5 rounded-lg overflow-x-auto mt-1 block mb-0 leading-normal">
                                    {item.commands.join('\n')}
                                  </pre>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* RIGHT: Live Script Console & Download Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6 md:sticky lg:top-6">
            <ScriptConsole selectedTweakIds={selectedTweakIds} />
          </div>

        </div>

        {/* Sales & Promotion Kit for our Entrepreneur */}
        <div className="mt-4">
          <MarketingKit />
        </div>

      </main>

      {/* Modern, clean footer */}
      <footer className="bg-slate-950 border-t border-slate-900/60 py-6 mt-12 text-center text-xs text-slate-500">
        <p>© 2026 Windows Optimizer Builder. Criado para otimizar e apoiar a profissionalização de formatadores e técnicos de TI.</p>
        <p className="mt-1 text-slate-600">Não infringimos políticas de segurança de rede da Microsoft; as alterações efetuam limpezas físicas e chamadas nativas de desativação.</p>
      </footer>
    </div>
  );
}
