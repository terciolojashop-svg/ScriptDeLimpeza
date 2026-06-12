import React from 'react';
import { HardDrive, Play, ShieldAlert, Cpu } from 'lucide-react';

interface PerformanceImpactProps {
  selectedTweakIds: string[];
}

export default function PerformanceImpact({ selectedTweakIds }: PerformanceImpactProps) {
  // Estimate calculations
  const calculateSpaceFreed = () => {
    let mb = 0;
    if (selectedTweakIds.includes('clean_user_temp')) mb += 1500;
    if (selectedTweakIds.includes('clean_sys_temp')) mb += 1000;
    if (selectedTweakIds.includes('clean_wu_cache')) mb += 3500;
    if (selectedTweakIds.includes('clean_recycle_bin')) mb += 1200;
    if (selectedTweakIds.includes('clean_prefetch')) mb += 150;
    if (selectedTweakIds.includes('clean_component_store')) mb += 4500;
    if (selectedTweakIds.includes('disable_hibernation')) mb += 16384; // 16GB
    
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(1)} GB`;
    }
    return `${mb} MB`;
  };

  const getPrivacyScore = () => {
    let score = 5; // base score out of 100
    if (selectedTweakIds.includes('disable_telemetry')) score += 35;
    if (selectedTweakIds.includes('disable_advertising_id')) score += 15;
    if (selectedTweakIds.includes('disable_bing_start')) score += 20;
    if (selectedTweakIds.includes('disable_suggestions_tips')) score += 15;
    if (selectedTweakIds.includes('disable_toasts')) score += 10;
    return score;
  };

  const getGamingStability = () => {
    let score = 0;
    if (selectedTweakIds.includes('disable_game_bar')) score += 35;
    if (selectedTweakIds.includes('disable_game_dvr')) score += 40;
    if (selectedTweakIds.includes('disable_xbox_services')) score += 15;
    if (selectedTweakIds.includes('clean_prefetch')) score += 5;
    if (selectedTweakIds.includes('disable_toasts')) score += 5;
    return score;
  };

  const getSSDLongevity = () => {
    let score = 0; // percentage
    if (selectedTweakIds.includes('enable_trim')) score += 30;
    if (selectedTweakIds.includes('disable_sysmain')) score += 30;
    if (selectedTweakIds.includes('disable_last_access_timestamp')) score += 25;
    if (selectedTweakIds.includes('disable_hibernation')) score += 15;
    return score;
  };

  const spaceFreed = calculateSpaceFreed();
  const privacyScore = getPrivacyScore();
  const gamingStability = getGamingStability();
  const ssdLongevity = getSSDLongevity();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl">
      <h3 className="text-base font-bold text-white tracking-tight mb-4 flex items-center gap-2 font-sans">
        <Cpu className="h-5 w-5 text-indigo-400" />
        Impacto Estimado no Sistema
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Core metric 1: Space saved */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between transition hover:border-indigo-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Espaço Liberado</span>
            <HardDrive className="h-4 w-4 text-sky-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-white tracking-tight font-mono">
              {spaceFreed}
            </span>
            <p className="text-[10px] text-slate-500 mt-1">Estimativa média</p>
          </div>
        </div>

        {/* Core metric 2: Privacy */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 transition hover:border-emerald-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Privacidade Corporal</span>
            <ShieldAlert className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-emerald-400 font-mono">{privacyScore}%</span>
              <span className="text-[10px] text-slate-500">seguro</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${privacyScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Core metric 3: Gaming boost */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 transition hover:border-violet-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Estabilidade Gaming</span>
            <Play className="h-4 w-4 text-violet-400" />
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-violet-400 font-mono">+{gamingStability}%</span>
              <span className="text-[10px] text-slate-500">estável</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-violet-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${gamingStability}%` }}
              />
            </div>
          </div>
        </div>

        {/* Core metric 4: SSD wear */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 transition hover:border-amber-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Otimização SSD</span>
            <Cpu className="h-4 w-4 text-amber-400" />
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-amber-400 font-mono">{ssdLongevity}%</span>
              <span className="text-[10px] text-slate-500">otimizado</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${ssdLongevity}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
