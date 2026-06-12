export type SafetyLevel = 'safe' | 'recommended' | 'advanced';

export interface TweakItem {
  id: string;
  name: string;
  description: string;
  impact: string;
  safety: SafetyLevel;
  commands: string[];
  undoCommands?: string[];
  explanation: string;
}

export interface TweakCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  items: TweakItem[];
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  icon: string;
  recommendedTweakIds: string[];
}
