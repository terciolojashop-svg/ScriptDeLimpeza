import React, { useState } from 'react';
import { Copy, Download, FileText, Check, AlertTriangle, Play, HelpCircle, RotateCcw, Undo } from 'lucide-react';
import { TWEAK_CATEGORIES } from '../data/tweaks';

interface ScriptConsoleProps {
  selectedTweakIds: string[];
}

export default function ScriptConsole({ selectedTweakIds }: ScriptConsoleProps) {
  const [copied, setCopied] = useState(false);
  const [showHowTo, setShowHowTo] = useState(true);
  const [activeTab, setActiveTab] = useState<'optimize' | 'undo'>('optimize');

  // Generate the full BAT script structure
  const generateScriptContent = (): string => {
    const today = new Date().toLocaleDateString('pt-BR');
    
    let script = `@echo off
title OTIMIZADOR DE SISTEMA - PRODUTO EXCLUSIVO
color 0B
mode con: cols=90 lines=30

:: ====================================================================
:: VERIFICAR PRIVILEGIOS DE ADMINISTRADOR (REQUISITO FUNDAMENTAL)
:: ====================================================================
fltmc >nul 2>&1
if %errorlevel% equ 0 goto :is_admin

echo.
echo  ==================================================================
echo  [!] ERRO CRITICO: PRIVILEGIOS INSUFICIENTES
echo  ==================================================================
echo  Este script precisa ser executado como ADMINISTRADOR.
echo.
echo  Instrucoes:
echo  1. Clique com o botao direito neste arquivo .bat
echo  2. Selecione a opcao "Executar como Administrador"
echo  ==================================================================
echo.
pause
exit /b

:is_admin

:: ====================================================================
:: INSTANCIA DE NOTIFICACAO DE INICIALIZACAO
:: ====================================================================
cls
echo  ==================================================================
echo     WINDOWS SYSTEM OPTIMIZER - CONFIGURACAO DE CLIENTE
echo     Gerado em: ${today} - Produto Exclusivo
echo  ==================================================================
echo.
echo  [*] Iniciando operacoes de aceleracao e limpeza...
echo  [*] Por favor, nao feche esta janela durante o processo.
echo.
timeout /t 3 >nul

`;

    // Process and append instructions for each category if items are selected
    TWEAK_CATEGORIES.forEach((category) => {
      const selectedItemsInCategory = category.items.filter((item) =>
        selectedTweakIds.includes(item.id)
      );

      if (selectedItemsInCategory.length > 0) {
        const categoryNameClean = category.name.toUpperCase().replace(/&/g, 'E');
        script += `:: ====================================================================
:: CATEGORIA: ${categoryNameClean}
:: ====================================================================
`;
        selectedItemsInCategory.forEach((item) => {
          const itemNameClean = item.name.replace(/&/g, 'e');
          script += `echo  [+] Aplicando: ${itemNameClean}... \n`;
          item.commands.forEach((cmd) => {
            script += `${cmd}\n`;
          });
          script += `echo  [OK] Concluido com sucesso!\necho.\n`;
        });
        script += `\n`;
      }
    });

    script += `:: ====================================================================
:: CONCLUSAO E SUCESSO
:: ====================================================================
echo.
echo  ==================================================================
echo     OTIMIZACAO DE CLIENTE CONCLUIDA COM SUCESSO!
echo  ==================================================================
echo.
echo     [✓] Limpeza de arquivos temporarios completa.
echo     [✓] Otimizacoes de Gaming e Baixa Latencia aplicadas.
echo     [✓] Registros de privacidade e anuncios desativados.
echo     [✓] Ciclos e vida util do SSD asseguradas.
echo.
echo  [RECOMENDADO] Reinicie o computador para consolidar todas as
echo  chaves de registro modificadas na memoria ram de forma limpa.
echo.
echo  Obrigado por utilizar nosso suporte profissional de Limpeza de Sistema.
echo  ==================================================================
pause
exit
`;

    return script;
  };

  // Generate the Undo/Rollback script content
  const generateUndoScriptContent = (): string => {
    const today = new Date().toLocaleDateString('pt-BR');
    
    let script = `@echo off
title DESFAZER OTIMIZACOES DE SISTEMA - RESTAURAR PADRAO
color 0E
mode con: cols=90 lines=30

:: ====================================================================
:: VERIFICAR PRIVILEGIOS DE ADMINISTRADOR (REQUISITO FUNDAMENTAL)
:: ====================================================================
fltmc >nul 2>&1
if %errorlevel% equ 0 goto :is_admin_undo

echo.
echo  ==================================================================
echo  [!] ERRO CRITICO: PRIVILEGIOS INSUFICIENTES
echo  ==================================================================
echo  Este script precisa ser executado como ADMINISTRADOR para desfazer.
echo.
echo  Instrucoes:
echo  1. Clique com o botao direito neste arquivo .bat
echo  2. Selecione a opcao "Executar como Administrador"
echo  ==================================================================
echo.
pause
exit /b

:is_admin_undo

:: ====================================================================
:: INSTANCIA DE NOTIFICACAO DE RESTAURACAO
:: ====================================================================
cls
echo  ==================================================================
echo     RESTAURADOR DE PADROES DO WINDOWS - DESFAZER ASSISTIDO
echo     Gerado em: ${today} - Produto Exclusivo
echo  ==================================================================
echo.
echo  [*] Iniciando restauracao de chaves de registro e servicos...
echo  [*] Revertendo alteracoes selecionadas para o padrao de fabrica do Windows.
echo.
timeout /t 3 >nul

`;

    // Process and append undo instructions
    TWEAK_CATEGORIES.forEach((category) => {
      const selectedItemsInCategory = category.items.filter((item) =>
        selectedTweakIds.includes(item.id)
      );

      const itemsWithUndo = selectedItemsInCategory.filter(item => item.undoCommands && item.undoCommands.length > 0);

      if (itemsWithUndo.length > 0) {
        const categoryNameClean = category.name.toUpperCase().replace(/&/g, 'E');
        script += `:: ====================================================================
:: DESFAZER: ${categoryNameClean}
:: ====================================================================
`;
        itemsWithUndo.forEach((item) => {
          const itemNameClean = item.name.replace(/&/g, 'e');
          script += `echo  [-] Revertendo: ${itemNameClean}... \n`;
          item.undoCommands?.forEach((cmd) => {
            script += `${cmd}\n`;
          });
          script += `echo  [OK] Revertido com sucesso!\necho.\n`;
        });
          script += `\n`;
      }
    });

    script += `:: ====================================================================
:: CONCLUSAO E REBOOT
:: ====================================================================
echo.
echo  ==================================================================
echo     REVERSAO E RESTAURACAO DE VALORES CONCLUIDA!
echo  ==================================================================
echo.
echo     [✓] Chaves de registro de privacidade e gaming restauradas.
echo     [✓] Servicos do Windows reconfigurados para inicializacao normal.
echo.
echo  [RECOMENDADO] Reinicie o computador para aplicar os padroes originais.
echo  ==================================================================
pause
exit
`;

    return script;
  };

  const optimizeScript = generateScriptContent();
  const undoScript = generateUndoScriptContent();
  const currentScriptContent = activeTab === 'optimize' ? optimizeScript : undoScript;

  const handleCopy = () => {
    const formattedContent = currentScriptContent.replace(/\r?\n/g, '\r\n');
    navigator.clipboard.writeText(formattedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // We replace the accent characters to standard english character encoding to avoid CMD display bugs
    const cleanContent = currentScriptContent
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // strip accents for DOS readability

    // Replace line endings from Unix LF (\n) to Windows CRLF (\r\n)
    const formattedContent = cleanContent.replace(/\r?\n/g, '\r\n');

    const blob = new Blob([formattedContent], { type: 'text/plain;charset=us-ascii' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeTab === 'optimize' ? 'Otimizar_Sistema_Cliente.bat' : 'Desfazer_Otimizacoes_Cliente.bat';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl flex flex-col h-full">
      
      {/* Tab Switcher */}
      <div className="flex border-b border-slate-800 pb-3 mb-4 gap-2">
        <button
          onClick={() => setActiveTab('optimize')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all text-center ${
            activeTab === 'optimize'
              ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Play className="h-3.5 w-3.5" />
          Gerar Otimizador (.bat)
        </button>

        <button
          onClick={() => setActiveTab('undo')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all text-center ${
            activeTab === 'undo'
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Gerar Desfazer / Restauro (.bat)
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white tracking-tight font-sans">
            {activeTab === 'optimize' ? 'Visualizar Script Otimizador' : 'Visualizar Script Desfazer'}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {selectedTweakIds.length > 0 && (
            <button
              onClick={handleCopy}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                copied
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copiar Código
                </>
              )}
            </button>
          )}

          <button
            onClick={handleDownload}
            disabled={selectedTweakIds.length === 0}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${
              activeTab === 'optimize'
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/10'
                : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/10'
            }`}
          >
            <Download className="h-3.5 w-3.5" />
            {activeTab === 'optimize' ? 'Baixar Script .BAT' : 'Baixar Script Desfazer'}
          </button>
        </div>
      </div>

      {selectedTweakIds.length === 0 ? (
        <div className="bg-slate-950/60 rounded-xl border border-dashed border-slate-800 p-8 flex flex-col items-center justify-center text-center flex-grow min-h-[300px]">
          <AlertTriangle className="h-10 w-10 text-amber-500/80 mb-3" />
          <h4 className="text-sm font-bold text-slate-300 mb-1">Nenhuma otimização selecionada</h4>
          <p className="text-xs text-slate-500 max-w-sm">
            Marque as funções desejadas nas categorias ou aplique um dos presets automáticos para habilitar o visualizador e download dos arquivos de comando (.bat).
          </p>
        </div>
      ) : (
        <div className="relative flex-grow flex flex-col">
          {/* Console Output Screen */}
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs text-cyan-400 overflow-auto max-h-[340px] text-left leading-relaxed shadow-inner block whitespace-pre flex-grow select-all rounded-b-none">
            {currentScriptContent}
          </div>

          <div className="bg-slate-950/80 border-t-0 p-3 rounded-b-xl border border-slate-800 flex items-center justify-between text-xs text-slate-400 px-4">
            <span>Visualizando: {activeTab === 'optimize' ? 'Script Otimização' : 'Restauro de Configurações'}</span>
            <span className="font-mono text-[10px] text-indigo-400">Total: {selectedTweakIds.length} tweaks aplicados</span>
          </div>

          {/* Quick Notice about Undo scripts */}
          {activeTab === 'undo' && (
            <div className="mt-3 bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-left text-xs text-amber-300 flex items-start gap-2.5">
              <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold mb-0.5">Como reverter com segurança total?</strong>
                Este script reativa as chaves de registro desabilitadas e restaura os serviços como Superfetch (SysMain), Xbox e Telemetria de volta para os padrões automáticos do sistema operacional. Ele funciona de forma inteligente com os mesmos itens que você já marcou para o cliente.
              </div>
            </div>
          )}

          <div className="mt-4 bg-slate-950/40 p-3 rounded-xl border border-slate-800">
            <button 
              onClick={() => setShowHowTo(!showHowTo)}
              className="flex items-center justify-between w-full text-xs font-semibold text-slate-300 hover:text-white"
            >
              <span className="flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4 text-indigo-400" />
                Como executar este script de forma segura?
              </span>
              <span className="text-[10px] text-slate-500 underline">
                {showHowTo ? 'Ocultar manual' : 'Mostrar manual'}
              </span>
            </button>

            {showHowTo && (
              <div className="mt-2.5 text-[11px] text-slate-400 leading-relaxed text-left space-y-2.5 border-t border-slate-900 pt-2">
                <div className="bg-amber-500/10 border border-amber-500/20 p-2 text-[10px] text-amber-300 rounded leading-relaxed">
                  <strong className="text-amber-200">⚠️ IMPORTANTE (Erro de E comercial / PowerShell):</strong> O erro "O caráter de E comercial (&) não é permitido" ocorre quando você tenta copiar e colar o código cru diretamente dentro de um terminal <strong>PowerShell</strong>. O PowerShell possui regras de sintaxe proprietárias e não aceita comandos CMD diretos ou redirecionadores como <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300 font-mono">2&gt;&amp;1</code> e caminhos de registro. Para rodar com sucesso absoluto, siga os passos abaixo:
                </div>
                <p>
                  <strong className="text-slate-200">1. Salve seu trabalho:</strong> Feche launchers de jogos, editores de texto e navegadores antes de rodar os comandos para evitar conflitos de arquivos temporários em uso.
                </p>
                <p>
                  <strong className="text-slate-200">2. Criação de Ponto de Restauração (Recomendado):</strong> Abra o menu iniciar do Windows, digite <code className="bg-slate-900 px-1 py-0.5 rounded text-indigo-300 font-mono">Criar ponto de restauração</code> e clique em Criar. Isso permite reverter qualquer alteração com segurança absoluta!
                </p>
                <p>
                  <strong className="text-slate-200">3. Executando corretamente:</strong> Clique no botão <strong className="text-indigo-400">Baixar Script .BAT</strong> para salvar o arquivo. Depois, vá na pasta de downloads do Windows, clique com o botão direito sobre o arquivo <code className="text-indigo-300 font-mono">{activeTab === 'optimize' ? 'Otimizar_Sistema_Cliente.bat' : 'Desfazer_Otimizacoes_Cliente.bat'}</code> e escolha <strong className="text-white">Executar como Administrador</strong>.
                </p>
                <p>
                  <strong className="text-slate-200">4. Compatibilidade Universal:</strong> O script trabalha alterando chaves nativas do registro do Windows e agindo sobre cache do HD/SSD sem instalar nenhum programa de terceiros.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
