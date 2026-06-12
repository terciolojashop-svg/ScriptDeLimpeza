import { TweakCategory, Preset } from '../types';

export const TWEAK_CATEGORIES: TweakCategory[] = [
  {
    id: 'cleanup',
    name: 'Limpeza de Disco Inteligente',
    description: 'Elimina lixo acumulado, arquivos temporários, caches do sistema e executa rotinas de reparo para liberar gigabytes de espaço.',
    icon: 'Trash2',
    items: [
      {
        id: 'clean_user_temp',
        name: 'Limpar Temporary Files do Usuário',
        description: 'Exclui restos de instaladores, cache de navegadores antigos e lixo armazenado no perfil local.',
        explanation: 'Remove resíduos de aplicativos fechados que continuam ocupando espaço na pasta local do usuário.',
        impact: '+250MB - 5GB liberados',
        safety: 'safe',
        commands: [
          'echo   - Limpando temp do usuario...',
          'rd /s /q "%temp%" >nul 2>&1',
          'md "%temp%" >nul 2>&1'
        ],
        undoCommands: [
          'echo   - Nota: Arquivos temporarios excluidos sao limpezas permanentes e nao precisam de reversao.'
        ]
      },
      {
        id: 'clean_sys_temp',
        name: 'Limpar Temporary Files do Sistema',
        description: 'Remove os arquivos temporários criados por atualizações do Windows e serviços gerais.',
        explanation: 'Foca na pasta Windows\\Temp, limpando arquivos órfãos criados a nível de sistema operacional.',
        impact: '+500MB - 3GB liberados',
        safety: 'safe',
        commands: [
          'echo   - Limpando temp do sistema...',
          'rd /s /q "C:\\Windows\\Temp" >nul 2>&1',
          'md "C:\\Windows\\Temp" >nul 2>&1'
        ],
        undoCommands: [
          'echo   - Telemetria de limpeza: Arquivos do Windows\\Temp deletados. Nao precisam de reversao.'
        ]
      },
      {
        id: 'clean_wu_cache',
        name: 'Limpar Cache do Windows Update',
        description: 'Libera espaço interrompendo o serviço do Windows Update e limpando arquivos de instalações passadas.',
        explanation: 'Limpa a pasta SoftwareDistribution\\Download onde instaladores baixados ficam travados após a atualização.',
        impact: '+1GB - 8GB liberados',
        safety: 'safe',
        commands: [
          'echo   - Parando Windows Update para limpeza de cache...',
          'net stop wuauserv >nul 2>&1',
          'rd /s /q "C:\\Windows\\SoftwareDistribution\\Download" >nul 2>&1',
          'md "C:\\Windows\\SoftwareDistribution\\Download" >nul 2>&1',
          'net start wuauserv >nul 2>&1'
        ],
        undoCommands: [
          'echo   - Nota: Cache de atualizacoes nao precisa de reversao. Windows Update continuara funcionando.'
        ]
      },
      {
        id: 'clean_recycle_bin',
        name: 'Esvaziar Lixeira do Sistema',
        description: 'Esvazia as pastas de lixeiras de todos os discos rígidos e SSDs instalados automaticamente.',
        explanation: 'Útil para automatizar a remoção de arquivos deletados que acumulam nos drives silenciosamente.',
        impact: 'Variável conforme uso',
        safety: 'safe',
        commands: [
          'echo   - Esvaziando Lixeira...',
          'rd /s /q "%systemdrive%\\$Recycle.bin" >nul 2>&1'
        ],
        undoCommands: [
          'echo   - Nota: Lixeira esvaziada e uma acao permanente.'
        ]
      },
      {
        id: 'clean_prefetch',
        name: 'Limpar Pasta Prefetch',
        description: 'Esvazia arquivos de histórico de inicialização de aplicativos antigos para recomeçar o cache.',
        explanation: 'Ajuda se houver problemas de carregamento de aplicativos ou quando o cache de inicialização se corrompe.',
        impact: '+50MB - 300MB liberados',
        safety: 'recommended',
        commands: [
          'echo   - Limpando Prefetch...',
          'rd /s /q "C:\\Windows\\Prefetch" >nul 2>&1',
          'md "C:\\Windows\\Prefetch" >nul 2>&1'
        ],
        undoCommands: [
          'echo   - Prefetch sera auto-gerado normalmente pelo Windows conforme os programas abrem.'
        ]
      },
      {
        id: 'sfc_dism_diagnostics',
        name: 'Diagnóstico Geral (SFC & DISM)',
        description: 'Analisa e restaura arquivos corrompidos e imagens do sistema essenciais.',
        explanation: 'Restaura a estabilidade padrão prevenindo telas azuis e corrigindo erros do kernel e subsistemas.',
        impact: 'Alta Estabilidade / Sem perda de dados',
        safety: 'safe',
        commands: [
          'echo   - Executando SFC Scannow para corrigir arquivos corrompidos...',
          'sfc /scannow',
          'echo   - Executando DISM para reparar imagem de arquivo...',
          'dism /online /cleanup-image /restorehealth'
        ],
        undoCommands: [
          'echo   - SFC e DISM efetuam reparos de arquivos corrompidos do kernel. Nao interfere negativamente.'
        ]
      },
      {
        id: 'clean_component_store',
        name: 'Deep Update Cleanup (Reset Base)',
        description: 'Remove versões antigas de componentes de atualizações passadas que não são mais úteis.',
        explanation: 'Uma ferramenta definitiva que compacta e descarta gigabytes de backups antigos das atualizações do Windows.',
        impact: '+2GB - 12GB liberados',
        safety: 'recommended',
        commands: [
          'echo   - Executando limpeza profunda da base de componentes (ResetBase)...',
          'dism /online /cleanup-image /startcomponentcleanup /resetbase'
        ],
        undoCommands: [
          'echo   - Limpeza profunda ResetBase e definitiva. Sem necessidade de desfazer.'
        ]
      }
    ]
  },
  {
    id: 'gaming',
    name: 'Modo Jogo & Xbox DVR',
    description: 'Desabilita recursos de gravação em segundo plano, barras flutuantes e integrações Xbox que causam stutters e engasgos nos jogos.',
    icon: 'Gamepad2',
    items: [
      {
        id: 'disable_game_bar',
        name: 'Desativar Barra de Jogo (Game Bar)',
        description: 'Remove a sobreposição do Xbox Game Bar das teclas de atalho e serviços ativos.',
        explanation: 'A barra do Xbox roda constantemente para tirar prints e atalhos na tela, consumindo RAM e threads do processador.',
        impact: 'Redução de queda de FPS (Estabilidade)',
        safety: 'recommended',
        commands: [
          'echo   - Desativando Barra de Jogo (Xbox Game Bar)...',
          'reg add "HKCU\\Software\\Microsoft\\GameBar" /v "AllowAutoGameMode" /t REG_DWORD /d 0 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\GameBar" /v "AutoGameModeEnabled" /t REG_DWORD /d 0 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\GameBar" /v "UseNexusForGameBarEnabled" /t REG_DWORD /d 0 /f >nul 2>&1'
        ],
        undoCommands: [
          'echo   - Reativando Barra de Jogo (Xbox Game Bar)...',
          'reg add "HKCU\\Software\\Microsoft\\GameBar" /v "AllowAutoGameMode" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\GameBar" /v "AutoGameModeEnabled" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\GameBar" /v "UseNexusForGameBarEnabled" /t REG_DWORD /d 1 /f >nul 2>&1'
        ]
      },
      {
        id: 'disable_game_dvr',
        name: 'Desativar Gravação DVR em Segundo Plano',
        description: 'Impeça que o Windows grave sua tela em segundo plano aguardando clipes de jogadas.',
        explanation: 'A gravação contínua em segundo plano gera stutters e gargalos de processador em computadores médios e de entrada.',
        impact: 'Ganho palpável de estabilidade de frames',
        safety: 'recommended',
        commands: [
          'echo   - Desativando Captura e Gravação em background (Game DVR)...',
          'reg add "HKCU\\System\\GameConfigStore" /v "GameDVR_Enabled" /t REG_DWORD /d 0 /f >nul 2>&1',
          'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\GameDVR" /v "AllowGameDVR" /t REG_DWORD /d 0 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d 0 /f >nul 2>&1'
        ],
        undoCommands: [
          'echo   - Reativando Gravacao DVR em Segundo Plano...',
          'reg add "HKCU\\System\\GameConfigStore" /v "GameDVR_Enabled" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\GameDVR" /v "AllowGameDVR" /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d 1 /f >nul 2>&1'
        ]
      },
      {
        id: 'disable_xbox_services',
        name: 'Desativar Serviços Xbox em Segundo Plano',
        description: 'Define os serviços do Xbox Network e Authentication como manuais/desabilitados.',
        explanation: 'Para quem joga apenas na Steam, Epic ou Riot, impede processos da Microsoft Store de rodarem sem necessidade.',
        impact: '+80MB RAM Liberados',
        safety: 'recommended',
        commands: [
          'echo   - Configurando servicos Xbox para inicializacao manual...',
          'sc config "XblAuthManager" start= demand >nul 2>&1',
          'sc config "XblGameSave" start= demand >nul 2>&1',
          'sc config "XboxNetApiSvc" start= demand >nul 2>&1',
          'sc config "XboxGipSvc" start= demand >nul 2>&1'
        ],
        undoCommands: [
          'echo   - Habilitando servicos Xbox de volta para automatico...',
          'sc config "XblAuthManager" start= auto >nul 2>&1',
          'sc config "XblGameSave" start= auto >nul 2>&1',
          'sc config "XboxNetApiSvc" start= auto >nul 2>&1',
          'sc config "XboxGipSvc" start= auto >nul 2>&1'
        ]
      }
    ]
  },
  {
    id: 'privacy',
    name: 'Privacidade, Bloqueio de Anúncios & Telemetria',
    description: 'Desabilita o envio de relatórios de diagnóstico falsos, propagandas incluídas no sistema e serviços de rastreio de uso.',
    icon: 'ShieldAlert',
    items: [
      {
        id: 'disable_telemetry',
        name: 'Bloquear Telemetria (Rastreamento de Dados)',
        description: 'Desativa o envio de logs de uso e relatórios anônimos de feedback constantes à Microsoft.',
        explanation: 'Interrompe os serviços de coleta de dados DiagTrack (Experiências de Usuário Conectado e Telemetria) que geram tráfego de rede e leitura de disco.',
        impact: 'Privacidade aumentada / Menos banda utilizada',
        safety: 'recommended',
        commands: [
          'echo   - Desativando Telemetria e Coleta de Dados...',
          'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d 0 /f >nul 2>&1',
          'sc config "DiagTrack" start= disabled >nul 2>&1',
          'net stop "DiagTrack" >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Personalization\\InputPersonalization" /v "RestrictImplicitInkCollection" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Personalization\\InputPersonalization" /v "RestrictImplicitTextCollection" /t REG_DWORD /d 1 /f >nul 2>&1'
        ],
        undoCommands: [
          'echo   - Reativando Telemetria de Diagnostico Microsoft...',
          'reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v "AllowTelemetry" /f >nul 2>&1',
          'sc config "DiagTrack" start= auto >nul 2>&1',
          'sc start "DiagTrack" >nul 2>&1',
          'reg delete "HKCU\\Software\\Microsoft\\Personalization\\InputPersonalization" /v "RestrictImplicitInkCollection" /f >nul 2>&1',
          'reg delete "HKCU\\Software\\Microsoft\\Personalization\\InputPersonalization" /v "RestrictImplicitTextCollection" /f >nul 2>&1'
        ]
      },
      {
        id: 'disable_advertising_id',
        name: 'Desativar ID de Anúncios e Privacidade Comercial',
        description: 'Bloqueia anuncios personalizados, acesso de sites ao idioma, rastreio de abertura de aplicativos e ofertas personalizadas.',
        explanation: 'Desativa o identificador de publicidade da Microsoft, impede sites de verem a sua lista de idiomas instalados, encerra o rastreio de programas abertos para o Menu Iniciar e desliga as ofertas com base nos seus dados de diagnóstico.',
        impact: 'Maxima privacidade nativa no Windows',
        safety: 'safe',
        commands: [
          'echo   - Bloqueando o ID de Anuncios comercial...',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo" /v "Enabled" /t REG_DWORD /d 0 /f >nul 2>&1',
          'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo" /v "Enabled" /t REG_DWORD /d 0 /f >nul 2>&1',
          'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\AdvertisingInfo" /v "Disabled" /t REG_DWORD /d 1 /f >nul 2>&1',
          'echo   - Impedindo sites de acessarem a lista de idiomas...',
          'reg add "HKCU\\Control Panel\\International\\User Profile" /v "HttpAcceptLanguageOptOut" /t REG_DWORD /d 1 /f >nul 2>&1',
          'echo   - Silenciando as Experiencias e Ofertas Personalizadas da Microsoft...',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Privacy" /v "TailoredExperiencesWithDiagnosticDataEnabled" /t REG_DWORD /d 0 /f >nul 2>&1',
          'echo   - Bloqueando o rastreamento de inicializacoes de apps no Iniciar...',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "Start_TrackProgs" /t REG_DWORD /d 0 /f >nul 2>&1'
        ],
        undoCommands: [
          'echo   - Reativando o ID de Anuncios comercial...',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo" /v "Enabled" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg delete "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo" /v "Enabled" /f >nul 2>&1',
          'reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\AdvertisingInfo" /v "Disabled" /f >nul 2>&1',
          'echo   - Permitindo aos sites acessarem lista de idiomas...',
          'reg delete "HKCU\\Control Panel\\International\\User Profile" /v "HttpAcceptLanguageOptOut" /f >nul 2>&1',
          'echo   - Reativando Ofertas Personalizadas de Diagnosticos...',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Privacy" /v "TailoredExperiencesWithDiagnosticDataEnabled" /t REG_DWORD /d 1 /f >nul 2>&1',
          'echo   - Permitindo rastreamento de apps para o Menu Iniciar...',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "Start_TrackProgs" /t REG_DWORD /d 1 /f >nul 2>&1'
        ]
      },
      {
        id: 'disable_bing_start',
        name: 'Remover Pesquisa Web do Bing no Iniciar',
        description: 'Faz o menu Iniciar pesquisar exclusivamente por arquivos locais, em vez de enviar buscas ao Bing na Internet.',
        explanation: 'Transforma o menu Iniciar de um portal lento e pesado em um buscador ultra rápido sem anúncios ou sugestões de web.',
        impact: 'Inicialização 3x mais rápida do Menu Iniciar',
        safety: 'recommended',
        commands: [
          'echo   - Desativando buscas do Bing na barra do Menu Iniciar...',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Search" /v "BingSearchEnabled" /t REG_DWORD /d 0 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Search" /v "CortanaConsent" /t REG_DWORD /d 0 /f >nul 2>&1'
        ],
        undoCommands: [
          'echo   - Reativando pesquisas do Bing Web no menu Iniciar...',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Search" /v "BingSearchEnabled" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Search" /v "CortanaConsent" /t REG_DWORD /d 1 /f >nul 2>&1'
        ]
      },
      {
        id: 'disable_suggestions_tips',
        name: 'Desativar Sugestões, Ofertas e Dicas do Windows',
        description: 'Bloqueia propagandas de assinaturas, dicas de uso e recomendacoes nas Configurações e Explorador de arquivos.',
        explanation: 'Exclui as sugestões de parceiros nas Configurações, na barra de tarefas, na área de trabalho, no explorador e as notificações recomendando produtos e serviços Microsoft.',
        impact: 'Interface Limpa e livre de Popups Patrocinados',
        safety: 'safe',
        commands: [
          'echo   - Bloqueando sugestoes, dicas de uso e apps patrocinados...',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "SoftLandingEnabled" /t REG_DWORD /d 0 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "SubscribedContent-338389Enabled" /t REG_DWORD /d 0 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "SubscribedContent-338388Enabled" /t REG_DWORD /d 0 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "SubscribedContent-353698Enabled" /t REG_DWORD /d 0 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "RemindPlayListLimit" /t REG_DWORD /d 0 /f >nul 2>&1',
          'echo   - Desativando Recomendacoes e Ofertas nas Configurações do Windows...',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "SubscribedContent-338393Enabled" /t REG_DWORD /d 0 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "SubscribedContent-353694Enabled" /t REG_DWORD /d 0 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "SubscribedContent-353696Enabled" /t REG_DWORD /d 0 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "SubscribedContent-318455Enabled" /t REG_DWORD /d 0 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "SubscribedContent-318454Enabled" /t REG_DWORD /d 0 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "SubscribedContent-310093Enabled" /t REG_DWORD /d 0 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v "ShowSyncProviderNotifications" /t REG_DWORD /d 0 /f >nul 2>&1'
        ],
        undoCommands: [
          'echo   - Reativando sugestoes, dicas e instaladores automáticos de parceiros...',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "SoftLandingEnabled" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "SubscribedContent-338389Enabled" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "SubscribedContent-338388Enabled" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "SubscribedContent-353698Enabled" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "RemindPlayListLimit" /t REG_DWORD /d 1 /f >nul 2>&1',
          'echo   - Reativando Recomendacoes e Ofertas nas Configurações...',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "SubscribedContent-338393Enabled" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "SubscribedContent-353694Enabled" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "SubscribedContent-353696Enabled" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "SubscribedContent-318455Enabled" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "SubscribedContent-318454Enabled" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v "SubscribedContent-310093Enabled" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v "ShowSyncProviderNotifications" /t REG_DWORD /d 1 /f >nul 2>&1'
        ]
      },
      {
        id: 'disable_toasts',
        name: 'Desabilitar Notificações em Balão (Toast Popups)',
        description: 'Silencia as notificações que aparecem no canto inferior direito para total imersão e foco.',
        explanation: 'Desativa o sistema de balões de notificações que distraem o usuário e interrompem jogos em tela cheia.',
        impact: 'Foco Absoluto sem Interrupções',
        safety: 'recommended',
        commands: [
          'echo   - Desabilitando Toasts e Notificacoes visuais (Master Toggle)...',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\PushNotifications" /v "ToastEnabled" /t REG_DWORD /d 0 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Notifications\\Settings" /v "NCSettings" /t REG_DWORD /d 0 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Notifications\\Settings" /v "NOC_GLOBAL_SETTING_ALLOW_TOASTS_ABOVE_LOCK" /t REG_DWORD /d 0 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Notifications\\Settings" /v "NOC_GLOBAL_SETTING_ALLOW_NOTIFICATION_SOUND" /t REG_DWORD /d 0 /f >nul 2>&1',
          'echo   - Bloqueando aplicacoes de enviarem notificacoes (Direct Policy)...',
          'reg add "HKCU\\Software\\Policies\\Microsoft\\Windows\\CurrentVersion\\PushNotifications" /v "NoToastApplicationNotification" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\CurrentVersion\\PushNotifications" /v "NoToastApplicationNotification" /t REG_DWORD /d 1 /f >nul 2>&1'
        ],
        undoCommands: [
          'echo   - Reativando notificações em balão (Toast popups)...',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\PushNotifications" /v "ToastEnabled" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Notifications\\Settings" /v "NCSettings" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Notifications\\Settings" /v "NOC_GLOBAL_SETTING_ALLOW_TOASTS_ABOVE_LOCK" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Notifications\\Settings" /v "NOC_GLOBAL_SETTING_ALLOW_NOTIFICATION_SOUND" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg delete "HKCU\\Software\\Policies\\Microsoft\\Windows\\CurrentVersion\\PushNotifications" /v "NoToastApplicationNotification" /f >nul 2>&1',
          'reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\CurrentVersion\\PushNotifications" /v "NoToastApplicationNotification" /f >nul 2>&1'
        ]
      },
      {
        id: 'disable_recall',
        name: 'Desativar Windows Recall e Capturas Automáticas (Segurança)',
        description: 'Bloqueia o Windows de tirar screenshots do seu desktop em segundo plano (Recall e IA da Microsoft).',
        explanation: 'O recurso Recall tira capturas contínuas do que passa no monitor de segundos em segundos para IA. Esse ajuste desabilita as políticas de telemetria de tela, privacidade de atividades do usuário e o analisador de dados de inteligência artificial de forma segura.',
        impact: 'Segurança Máxima de Dados e Menores Leituras de SSD',
        safety: 'recommended',
        commands: [
          'echo   - Desativando o Windows Recall (IA de Screenshots da Microsoft)...',
          'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsAI" /v "DisableAIDataAnalysis" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg add "HKCU\\Software\\Policies\\Microsoft\\Windows\\WindowsAI" /v "DisableAIDataAnalysis" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v "PublishUserActivities" /t REG_DWORD /d 0 /f >nul 2>&1',
          'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v "UploadUserActivities" /t REG_DWORD /d 0 /f >nul 2>&1',
          'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v "EnableActivityFeed" /t REG_DWORD /d 0 /f >nul 2>&1'
        ],
        undoCommands: [
          'echo   - Reativando o Recall e as Capturas automaticas da Microsoft...',
          'reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsAI" /v "DisableAIDataAnalysis" /f >nul 2>&1',
          'reg delete "HKCU\\Software\\Policies\\Microsoft\\Windows\\WindowsAI" /v "DisableAIDataAnalysis" /f >nul 2>&1',
          'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v "PublishUserActivities" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v "UploadUserActivities" /t REG_DWORD /d 1 /f >nul 2>&1',
          'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v "EnableActivityFeed" /t REG_DWORD /d 1 /f >nul 2>&1'
        ]
      }
    ]
  },
  {
    id: 'ssd_booster',
    name: 'SSD Booster (Vida Útil & Velocidade)',
    description: 'Ajustes de baixo nível focados em prolongar a saúde do seu drive SSD e maximizar a taxa de transferência IOPS das memórias Flash.',
    icon: 'Cpu',
    items: [
      {
        id: 'enable_trim',
        name: 'Habilitar Comando TRIM',
        description: 'Garanta que o Windows informe ao SSD quais blocos de dados não são mais necessários para exclusão imediata.',
        explanation: 'Sem o TRIM ativo, a velocidade de escrita do SSD cai drasticamente ao longo do tempo. Esse ajuste força o seu funcionamento ativo.',
        impact: 'Performance de Escrita de Memória Estabilizada',
        safety: 'safe',
        commands: [
          'echo   - Garantindo operacao activa do TRIM no SSD...',
          'fsutil behavior set DisableDeleteNotify 0'
        ],
        undoCommands: [
          'echo   - Nota: Manter TRIM ativo e essencial para SSD. Desabilita-lo pode causar lentidao severa ao drive.'
        ]
      },
      {
        id: 'disable_sysmain',
        name: 'Desativar Serviço SysMain (Superfetch)',
        description: 'Para de carregar programas prévios em background na memória cache, gerando leituras incessantes.',
        explanation: 'O SysMain foi criado para acelerar HDDs mecânicos lentos. Em SSDs, ele é inútil pois o acesso SSD é instantâneo e apenas causa desgaste desnecessário.',
        impact: 'Menos leituras e escritas gratuitas no SSD',
        safety: 'recommended',
        commands: [
          'echo   - Desativando servico de cache SysMain (antigo Superfetch)...',
          'sc config "SysMain" start= disabled >nul 2>&1',
          'net stop "SysMain" >nul 2>&1'
        ],
        undoCommands: [
          'echo   - Reativando servico de cache SysMain (Superfetch)...',
          'sc config "SysMain" start= auto >nul 2>&1',
          'sc start "SysMain" >nul 2>&1'
        ]
      },
      {
        id: 'disable_last_access_timestamp',
        name: 'Desativar Registro de Último Acesso (NTFS)',
        description: 'Impede o Windows de escrever um novo carimbo de data/hora no SSD toda vez que você apenas lê um arquivo.',
        explanation: 'Um arquivo lido 1.000 vezes gera 1.000 escritas de metadados se ativo. Desativar isso reduz o desgaste de escrita do SSD massivamente.',
        impact: 'Redução drástica no volume TBW escritas acumuladas',
        safety: 'safe',
        commands: [
          'echo   - Desativando carimbo de data de ultimo acesso NTFS...',
          'fsutil behavior set disablelastaccess 1'
        ],
        undoCommands: [
          'echo   - Reativando escrita de data de ultimo acesso NTFS...',
          'fsutil behavior set disablelastaccess 0'
        ]
      },
      {
        id: 'disable_hibernation',
        name: 'Desativar Hibernação (Apagar hiberfil.sys)',
        description: 'Desativa o arquivo hiberfil.sys liberando instantaneamente de 8GB a 32GB de espaço limpo.',
        explanation: 'A hibernação salva a RAM inteira no SSD antes de desligar, drenando a capacidade útil de escrita do SSD e devorando espaço precioso em disco.',
        impact: 'Libera de 8GB a 40GB de espaço real em disco!',
        safety: 'recommended',
        commands: [
          'echo   - Liberando espaco gigantesco e desligando arquivo de Hibernacao...',
          'powercfg -h off'
        ],
        undoCommands: [
          'echo   - Reativando Hibernacao (Recriando hiberfil.sys)...',
          'powercfg -h on'
        ]
      },
      {
        id: 'disable_wsearch_indexing',
        name: 'Otimizar Serviço de Indexação (WSearch)',
        description: 'Configura o serviço Search para manual ou o interrompe de ficar gravando indices a cada minuto.',
        explanation: 'Inibe a escrita persistente do indexador no disco. Melhora a performance do sistema se o seu processador e SSD forem de entrada.',
        impact: 'Estabilização de uso de disco em 0%',
        safety: 'advanced',
        commands: [
          'echo   - Reduzindo atividade constante do indexador Search...',
          'sc config "WSearch" start= demand >nul 2>&1',
          'net stop "WSearch" >nul 2>&1'
        ],
        undoCommands: [
          'echo   - Habilitando servico de indexacao automatica (Windows Search)...',
          'sc config "WSearch" start= auto >nul 2>&1',
          'sc start "WSearch" >nul 2>&1'
        ]
      }
    ]
  }
];

export const PRESETS: Preset[] = [
  {
    id: 'safe',
    name: '🛡️ Limpeza Segura & Diagnóstico',
    icon: 'Shield',
    description: 'Ideal para qualquer usuário. Execute sem medo de quebrar configurações do Windows. Limpa lixo, atualizações e valida arquivos vitais com SFC/DISM.',
    recommendedTweakIds: [
      'clean_user_temp',
      'clean_sys_temp',
      'clean_wu_cache',
      'clean_recycle_bin',
      'sfc_dism_diagnostics'
    ]
  },
  {
    id: 'gamer',
    name: '🎮 Desempenho & Modo Gamer Completo',
    icon: 'Swords',
    description: 'Para computadores domésticos de jogos. Desativa sobreposições, Xbox, alertas incômodos do Windows e otimiza a latência geral de processamento.',
    recommendedTweakIds: [
      'clean_user_temp',
      'clean_sys_temp',
      'clean_wu_cache',
      'clean_recycle_bin',
      'clean_prefetch',
      'disable_game_bar',
      'disable_game_dvr',
      'disable_xbox_services',
      'disable_suggestions_tips',
      'disable_toasts'
    ]
  },
  {
    id: 'privacy_focused',
    name: '🔒 Focado em Privacidade & Bloqueio Web',
    icon: 'EyeOff',
    description: 'Mais velocidade tirando o Bing da barra de busca do iniciar, impedindo rastreamento corporativo e interrompendo o serviço DiagTrack.',
    recommendedTweakIds: [
      'disable_telemetry',
      'disable_advertising_id',
      'disable_bing_start',
      'disable_suggestions_tips',
      'disable_toasts',
      'disable_recall'
    ]
  },
  {
    id: 'ssd_booster_all',
    name: '🚀 SSD Booster Máximo & Vida Útil',
    icon: 'Cpu',
    description: 'Otimizações avançadas recomendadas se você usa um SSD (SATA, NVMe ou M.2). Ativa TRIM, reduz gravações inúteis e economiza vários Gigabytes deletando a Hibernação.',
    recommendedTweakIds: [
      'clean_user_temp',
      'clean_sys_temp',
      'enable_trim',
      'disable_sysmain',
      'disable_last_access_timestamp',
      'disable_hibernation'
    ]
  },
  {
    id: 'ultra',
    name: '⚡ Otimização Geral Extrema',
    icon: 'Zap',
    description: 'Selecione praticamente todas as melhores ferramentas do painel para obter a máquina o mais rápida, estável e privada possível de uma só vez.',
    recommendedTweakIds: [
      'clean_user_temp',
      'clean_sys_temp',
      'clean_wu_cache',
      'clean_recycle_bin',
      'clean_prefetch',
      'sfc_dism_diagnostics',
      'clean_component_store',
      'disable_game_bar',
      'disable_game_dvr',
      'disable_xbox_services',
      'disable_telemetry',
      'disable_advertising_id',
      'disable_bing_start',
      'disable_suggestions_tips',
      'disable_toasts',
      'disable_recall',
      'enable_trim',
      'disable_sysmain',
      'disable_last_access_timestamp',
      'disable_hibernation'
    ]
  }
];

export const MARKETING_TEMPLATES = [
  {
    name: 'Instagram / Redes Sociais - Foco em Jogos',
    copy: `Seu PC está sofrendo com engasgos (stutters) e FPS baixo nos jogos? 🤦‍♂️🎮

Muitas vezes o culpado não é sua placa de vídeo, mas sim o Windows acumulando lixo em segundo plano, telemetria inútil da Microsoft, serviços do Xbox e arquivos gravando sem parar no seu SSD!

Criamos uma solução definitiva que:
⚡ Remove Arquivos Temporários de instaladores
🎮 Desliga a gravação de tela fantasma "Game DVR" que consome CPU
🔒 Impede dados de serem coletados em segundo plano
🚀 Ativa de forma correta a saúde do SSD prolongando a vida útil!

Garanta já o seu! Link do otimizador na Bio! 👇📊`
  },
  {
    name: 'Abordagem Comercial WhatsApp - Foco em Escritório/Dono de PC Lento',
    copy: `Olá, tudo bem? 😃
Seu computador de trabalho está travando ou demorando para abrir o menu Iniciar e pesquisar as coisas? 

Isso acontece porque a Microsoft ativa vários "rastreadores de propaganda" e pesquisas na Internet toda vez que você busca um arquivo simples! Além de arquivos temporários do sistema que chegam a pesar mais de 10GB.

Eu desenvolvi um otimizador sob medida profissional que:
1. Limpa profundamente lixo em menos de 1 minuto.
2. Faz o menu Iniciar abrir instantaneamente desativando buscas do Bing Web.
3. Desliga processos invisíveis que causam lentidão.

O script é limpo, leve e executável na hora. Quer testar no seu PC hoje e ver a rapidez voltar? Só mandar uma mensagem aqui!`
  },
  {
    name: 'Mensagem de Entrega / Instruções para o Cliente',
    copy: `Opa! Aqui está o seu otimizador personalizado de sistema! 🚀

Siga os passos rápidos para executar com sucesso:

1️⃣ Certifique-se de salvar todos os seus trabalhos abertos.
2️⃣ Clique no arquivo ".bat" com o BOTÃO DIREITO do mouse.
3️⃣ Escolha "EXECUTAR COMO ADMINISTRADOR" (obrigatório para aplicar as limpezas de núcleos e chaves de registro do sistema).
4️⃣ Uma tela preta de comando se abrirá e fará a mágica sozinha.
5️⃣ Quando terminar, revise os arquivos otimizados e Reinicie o Computador para aplicar todas as melhorias visuais e de rede.

Qualquer dúvida estou à disposição nas redes sociais!`
  }
];
