import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Send, Copy, RefreshCw } from 'lucide-react';

interface AIAssistantProps {
  apiKey?: string; // We'll use process.env.API_KEY actually, but component structure kept clean
}

export const AIAssistant: React.FC<AIAssistantProps> = () => {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'Email' | 'Instagram' | 'Ads'>('Email');

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsLoading(true);

    try {
      // In a real env, verify API KEY exists
      if (!process.env.API_KEY) {
        setOutput("Erro: API Key não configurada. Por favor configure a variável de ambiente.");
        setIsLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemContext = `
        Você é um especialista em Copywriting para lançamentos de produtos de alto padrão (High Copy).
        Estamos na Fase 2: Consciência. O objetivo é levar pessoas para um grupo de WhatsApp e aplicar num formulário.
        Evento: Coquetel de Lançamento do Aparelho.
        Data: 19 de Março em São Paulo.
        Vagas presenciais: Apenas 30 selecionados.
        Tom de voz: Sofisticado, urgente, exclusivo.
      `;

      let specificInstruction = "";
      if (mode === 'Email') specificInstruction = "Crie um email curto e persuasivo com assunto.";
      if (mode === 'Instagram') specificInstruction = "Crie uma legenda para post de Instagram com hashtags.";
      if (mode === 'Ads') specificInstruction = "Crie 3 opções de headline e corpo para anúncio (Meta Ads).";

      const fullPrompt = `${systemContext}\n\nTarefa: ${specificInstruction}\nDetalhes do usuário: ${prompt}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-latest',
        contents: fullPrompt,
      });

      setOutput(response.text || "Sem resposta gerada.");
    } catch (error) {
      console.error(error);
      setOutput("Desculpe, ocorreu um erro ao gerar o copy. Verifique sua conexão ou API Key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Assistente Criativo</h2>
            <p className="text-xs text-slate-500">Powered by Gemini 2.5</p>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          {['Email', 'Instagram', 'Ads'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m as any)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-all ${
                mode === m 
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">O que você precisa comunicar?</label>
          <textarea
            className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            placeholder="Ex: Avise que faltam apenas 10 vagas para o coquetel e que a seleção termina amanhã..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt}
          className={`mt-4 w-full py-3 rounded-lg flex items-center justify-center gap-2 font-medium text-white transition-all ${
            isLoading || !prompt ? 'bg-slate-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200'
          }`}
        >
          {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          {isLoading ? 'Gerando...' : 'Gerar Copy'}
        </button>
      </div>

      {/* Output Section */}
      <div className="bg-slate-900 p-6 rounded-xl shadow-lg text-slate-300 flex flex-col">
        <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-indigo-400">Resultado</span>
          <button 
            onClick={() => navigator.clipboard.writeText(output)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
            title="Copiar"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-auto font-mono text-sm leading-relaxed whitespace-pre-wrap">
          {output ? output : <span className="text-slate-600 italic">O resultado aparecerá aqui...</span>}
        </div>
      </div>
    </div>
  );
};