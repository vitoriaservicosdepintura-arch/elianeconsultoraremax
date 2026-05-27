import React, { useState, useEffect, useRef } from 'react';

/* ── Configuração ──────────────────────────────────────────── */
const CONFIG = {
    TELEFONE: "+351913663154",
    WHATSAPP_URL: "https://wa.me/351913663154?text=Olá! Vim pelo site e gostaria de falar com a Eliane.",
    TELEFONE_URL: "tel:+351913663154",
    SITE_URL: "https://www.remax.pt/agentes/elianelamarque",
};

/* ── Prompt Premium ──────────────────────────────────────── */
const SYSTEM_INSTRUCTION = `Você é a Assistente Virtual Oficial de Eliane Lamarque, Consultora Imobiliária certificada da RE/MAX em Portugal.

MISSÃO: Atendimento sofisticado e humanizado como Consultora Imobiliária Premium.

OBJETIVO: Qualificar leads → criar confiança → gerar desejo → converter para WhatsApp/chamada.

PERSONALIDADE: Elegante, segura, prestativa, consultiva. NUNCA robótica.

IDIOMAS: PT-PT, PT-BR, EN, ES. Detecte e responda no idioma do utilizador.
- PT-PT: "arrendamento", "imóvel", "habitação"
- PT-BR: "aluguel", "apartamento", "financiamento"

SOBRE ELIANE LAMARQUE:
Consultora certificada RE/MAX Portugal. Especialista em:
✅ Compra e venda de imóveis
✅ Arrendamento
✅ Investimento imobiliário
✅ Apoio a estrangeiros em Portugal

DIFERENCIAIS:
1. Atendimento exclusivo e personalizado
2. Imóveis premium e oportunidades off-market
3. Apoio completo documental e jurídico
4. Suporte em financiamento bancário
5. Acompanhamento até à assinatura
6. Negociação estratégica

CONTACTOS:
📱 WhatsApp: +351 913 663 154
📧 Email: elianelamarque@remax.pt
🌐 Portfólio: https://www.remax.pt/agentes/elianelamarque

REGRAS DE RESPOSTA (MUITO IMPORTANTE):
- Respostas SEMPRE curtas: máximo 3-4 linhas. Seja direto e objetivo.
- Use SEMPRE emojis de forma elegante para tornar a conversa mais visual.
- NUNCA invente valores, taxas ou conselhos jurídicos definitivos.
- NUNCA saia do contexto imobiliário.
- Termine SEMPRE com 1 pergunta curta para manter o diálogo.
- Quando detectar interesse real → converta para WhatsApp ou chamada.
- Se perguntado sobre o portfólio → mencione: https://www.remax.pt/agentes/elianelamarque

FLUXO DE CONVERSA:
Boas-vindas → Descobrir intenção (Comprar/Vender/Arrendar/Investir) → Perguntas estratégicas (região, orçamento, tipologia) → Gerar valor → Converter para contacto.

EXEMPLO DE CONVERSÃO:
"Perfeito 😊 Para que a Eliane analise o seu perfil e envie opções exclusivas, o ideal é falar diretamente com ela. Prefere WhatsApp ou uma breve chamada?"

FECHAMENTO PREMIUM:
"A Eliane terá todo o prazer em ajudá-lo(a) pessoalmente! 😊"`;

/* ── Respostas fallback ────────────────────────────────────── */
function getFallbackResponse(text: string): { msg: string; showActions?: boolean; quickReplies?: string[] } {
    const t = text.toLowerCase();
    if (t.match(/comprar|buy|purchase|adquirir/))
        return { msg: '🏠 Ótima decisão!\n\nA Eliane tem acesso a imóveis exclusivos, incluindo opções **off-market** em todo Portugal.\n\nQual região tem em mente?', quickReplies: ['Viseu 🌲', 'Porto 🌉', 'Lisboa 🏙️', 'Algarve 🌊'] };
    if (t.match(/vender|sell|venda/))
        return { msg: '💰 Perfeito!\n\nA Eliane oferece avaliação de mercado gratuita e estratégia de venda personalizada para maximizar o valor do seu imóvel.\n\nQuer agendar uma conversa?', showActions: true };
    if (t.match(/arrendar|arrendamento|rent|alugar|aluguer/))
        return { msg: '🔑 Processo simples e seguro!\n\nA Eliane trata de toda a documentação para proprietários e inquilinos.\n\nÉ para arrendar ou procura um imóvel para alugar?', quickReplies: ['Quero arrendar o meu imóvel 🏡', 'Procuro imóvel para alugar 🔍'] };
    if (t.match(/investir|investimento|invest|rendimento|yield/))
        return { msg: '📈 Portugal é um destino premium para investimentos!\n\nA Eliane identifica imóveis com alto potencial de rentabilidade e segurança.\n\nQual o orçamento de investimento previsto?', quickReplies: ['Até 200k€ 💶', '200k - 500k€ 💰', 'Acima de 500k€ 🏆'] };
    if (t.match(/financiamento|crédito|credito|empréstimo|banco/))
        return { msg: '💳 A Eliane oferece apoio completo no financiamento bancário!\n\nAcompanhamos todo o processo até à aprovação, sem stress.\n\nJá tem pré-aprovação de crédito?', quickReplies: ['Sim, tenho ✅', 'Não, preciso de ajuda 🤝', 'Ainda a explorar opções 🔍'] };
    if (t.match(/preço|preco|price|custo|cost|valor/))
        return { msg: '📊 Os valores variam consoante a zona e tipologia.\n\nA Eliane faz um levantamento personalizado para o seu perfil.\n\nVer o portfólio pode ajudar a ter uma ideia:', showActions: true };
    if (t.match(/portugal|viseu|porto|lisboa|algarve|cascais|sintra/))
        return { msg: '🇵🇹 Trabalhamos em todo Portugal!\n\nViseu, Porto, Lisboa, Algarve, Cascais, Sintra e muito mais.\n\nQual zona mais lhe interessa?', quickReplies: ['Viseu 🌲', 'Porto 🌉', 'Lisboa 🏙️', 'Algarve 🌊'] };
    if (t.match(/obrigad|thank|merci/))
        return { msg: '😊 Fico feliz em ajudar!\n\nA Eliane está sempre disponível para si.\n\nAté breve! 🏠' };
    return { msg: '🏡 A Eliane é especialista em Compra, Venda, Arrendamento e Investimento em Portugal.\n\nComo posso ajudá-lo(a) hoje?', quickReplies: ['Comprar 🏠', 'Vender 💰', 'Arrendar 🔑', 'Investir 📈'] };
}

/* ── Tipos ─────────────────────────────────────────────────── */
interface Message {
    role: 'user' | 'model';
    text: string;
    isAction?: boolean;
    quickReplies?: string[];
}
interface GroqMessage { role: 'user' | 'assistant'; content: string; }
interface UserData {
    name: string;
    phone: string;
    email: string;
}

/* ── Chamada REST Groq ─────────────────────────────────────── */
async function callGroq(apiKey: string, history: GroqMessage[], userMessage: string, userData: UserData | null): Promise<string> {
    const personalizedInstruction = SYSTEM_INSTRUCTION +
        (userData ? `\n\nINSTRUÇÃO CRÍTICA ADICIONAL: O nome do utilizador é ${userData.name}. MENCIONE O NOME DO UTILIZADOR nas tuas respostas de forma natural, cordial e elegante.` : '');

    const messages = [
        { role: 'system', content: personalizedInstruction },
        ...history,
        { role: 'user', content: userMessage }
    ];
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages, max_tokens: 250, temperature: 0.75 })
    });
    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error((err as any).error?.message || `HTTP ${response.status}`);
    }
    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'Sem resposta disponível.';
}

/* ── SVGs ──────────────────────────────────────────────────── */
function SendIcon() {
    return <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>;
}
function MicIcon({ active }: { active?: boolean }) {
    return <svg viewBox="0 0 24 24" className="w-5 h-5" fill={active ? '#ef4444' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>;
}
function BotIcon() {
    return <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>;
}
function WhatsAppSVG() {
    return <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>;
}
function PhoneSVG() {
    return <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.19 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
}
function GlobeSVG() {
    return <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;
}

/* ── Renderizador de Markdown ──────────────────────────────── */
function RenderText({ text }: { text: string }) {
    return (
        <>
            {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
                part.startsWith('**') && part.endsWith('**')
                    ? <strong key={i} className="font-bold text-[#cc0000]">{part.slice(2, -2)}</strong>
                    : <span key={i}>{part}</span>
            )}
        </>
    );
}

/* ── Componente Principal ──────────────────────────────────── */
export const LeadBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [groqHistory, setGroqHistory] = useState<GroqMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [hasNewMessage, setHasNewMessage] = useState(false);
    const [isClosed, setIsClosed] = useState(false);
    const [isHoveringBtn, setIsHoveringBtn] = useState(false);

    // Novas states para a captura do lead
    const [userData, setUserData] = useState<UserData | null>(null);
    const [formName, setFormName] = useState('');
    const [formEmail, setFormEmail] = useState('');
    const [formPhone, setFormPhone] = useState('');

    const apiKey = import.meta.env.VITE_GROQ_API_KEY as string;
    const hasApiKey = !!apiKey && apiKey !== 'COLOQUE_SUA_CHAVE_AQUI';

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const initialized = useRef(false);

    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isLoading]);

    useEffect(() => {
        if (isOpen) { setTimeout(() => inputRef.current?.focus(), 300); setHasNewMessage(false); setIsClosed(false); }
    }, [isOpen]);

    /* ── Inicialização ─────────────────────────────────────── */
    const initChat = (data: UserData) => {
        if (!hasApiKey) {
            setMessages([{ role: 'model', text: '⚠️ VITE_GROQ_API_KEY não configurada no .env' }]);
            return;
        }

        setIsLoading(true);
        callGroq(apiKey, [], `Dê as boas-vindas a ${data.name} de forma elegante e muito breve (máximo 3 linhas). Use 1-2 emojis. Pergunte logo o que procura - comprar, vender, arrendar ou investir.`, data)
            .then(text => {
                setMessages([{
                    role: 'model', text,
                    quickReplies: ['🏠 Comprar', '💰 Vender', '🔑 Arrendar', '📈 Investir']
                }]);
                setGroqHistory([
                    { role: 'user', content: `Dê as boas-vindas a ${data.name} de forma elegante e muito breve (máximo 3 linhas). Use 1-2 emojis. Pergunte logo o que procura - comprar, vender, arrendar ou investir.` },
                    { role: 'assistant', content: text }
                ]);
                setIsLoading(false);
                setHasNewMessage(true);
            })
            .catch(err => {
                console.error('Groq init error:', err);
                setMessages([{
                    role: 'model',
                    text: `Olá ${data.name}! 😊 Bem-vindo(a)!\n\nSou a assistente da **Eliane Lamarque**, Consultora RE/MAX Portugal. Como posso ajudá-lo(a)?`,
                    quickReplies: ['🏠 Comprar', '💰 Vender', '🔑 Arrendar', '📈 Investir']
                }]);
                setIsLoading(false);
                setHasNewMessage(true);
            });
    }

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formName.trim() || !formEmail.trim() || !formPhone.trim()) return;
        const data = { name: formName, email: formEmail, phone: formPhone };
        setUserData(data);
        setTimeout(() => initChat(data), 100);
    }

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.lang = 'pt-PT';
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.onresult = (event: any) => sendMessage(event.results[0][0].transcript);
            recognitionRef.current.onend = () => setIsListening(false);
            recognitionRef.current.onerror = () => setIsListening(false);
        }
    }, []);

    /* ── Fechar com mensagem de encerramento ───────────────── */
    const handleClose = () => {
        if (!isClosed) {
            setIsClosed(true);
            setMessages(prev => [...prev, {
                role: 'model',
                text: 'Foi um prazer falar consigo! 🙏\n\nA **Eliane Lamarque** está sempre disponível para ajudá-lo(a).\n\nAté breve! ✨🏠',
            }]);
            setTimeout(() => setIsOpen(false), 2000);
        } else {
            setIsOpen(false);
        }
    };

    /* ── Extrair quick-replies das respostas da IA ──────────── */
    const extractQuickReplies = (response: string, userMsg: string): string[] | undefined => {
        const lower = response.toLowerCase();
        const msgLower = userMsg.toLowerCase();
        if (lower.includes('região') || lower.includes('zona') || lower.includes('onde'))
            return ['Viseu 🌲', 'Porto 🌉', 'Lisboa 🏙️', 'Algarve 🌊'];
        if (lower.includes('orçamento') || lower.includes('faixa') || lower.includes('valor') || lower.includes('investimento'))
            return ['Até 200k€', '200k-500k€', '+ de 500k€', 'A definir'];
        if (lower.includes('habitação') || lower.includes('morar') || lower.includes('própri') || lower.includes('investir'))
            return ['Habitação própria 🏡', 'Investimento 📈', 'Ambos 💼'];
        if (lower.includes('whatsapp') || lower.includes('chamada') || lower.includes('contacto') || lower.includes('falar'))
            return undefined; // já vai mostrar action_buttons
        if (msgLower.match(/comprar|vender|arrendar|investir|ajuda|oi|olá|hello|bom/))
            return ['Comprar 🏠', 'Vender 💰', 'Arrendar 🔑', 'Investir 📈'];
        return undefined;
    };

    /* ── Enviar mensagem ───────────────────────────────────── */
    const sendMessage = async (text?: string) => {
        const messageText = (text || inputValue).trim();
        if (!messageText || isLoading || isClosed) return;

        setInputValue('');
        setMessages(prev => [...prev, { role: 'user', text: messageText }]);
        setIsLoading(true);

        try {
            const responseText = await callGroq(apiKey, groqHistory, messageText, userData);
            setGroqHistory(prev => [
                ...prev,
                { role: 'user', content: messageText },
                { role: 'assistant', content: responseText }
            ]);

            const quickReplies = extractQuickReplies(responseText, messageText);
            setMessages(prev => [...prev, { role: 'model', text: responseText, quickReplies }]);

            const lower = responseText.toLowerCase();
            if (lower.includes('whatsapp') || lower.includes('chamada') || lower.includes('agendar') || lower.includes('+351')) {
                setTimeout(() => setMessages(prev => [...prev, { role: 'model', text: 'action_buttons', isAction: true }]), 600);
            }
            if (!isOpen) setHasNewMessage(true);
        } catch (err: any) {
            console.error('Groq falhou, usando fallback:', err);
            const fallback = getFallbackResponse(messageText);
            setMessages(prev => [...prev, { role: 'model', text: fallback.msg, quickReplies: fallback.quickReplies }]);
            if (fallback.showActions)
                setTimeout(() => setMessages(prev => [...prev, { role: 'model', text: 'action_buttons', isAction: true }]), 600);
            if (!isOpen) setHasNewMessage(true);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleListening = () => {
        if (isListening) { recognitionRef.current?.stop(); setIsListening(false); }
        else { recognitionRef.current?.start(); setIsListening(true); }
    };

    /* ── Render ─────────────────────────────────────────────── */
    return (
        <>
            {/* Botão flutuante */}
            <button
                id="leadbot-toggle"
                onClick={() => setIsOpen(prev => !prev)}
                onMouseEnter={() => setIsHoveringBtn(true)}
                onMouseLeave={() => setIsHoveringBtn(false)}
                aria-label="Abrir assistente virtual"
                className={`fixed bottom-6 right-6 z-[9999] w-24 h-24 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen ? 'text-white shadow-2xl' : ''}`}
                style={isOpen ? { background: 'linear-gradient(135deg, #cc0000, #8b0000)', boxShadow: '0 8px 32px rgba(204,0,0,0.5)' } : { background: 'transparent' }}
            >
                {isOpen
                    ? <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    : <>
                        <img src="/images/eliane-hq-chatbot.png" alt="Assistente" className="w-[150%] h-[150%] max-w-none object-contain drop-shadow-2xl absolute transition-all duration-300" style={{ opacity: isHoveringBtn ? 0 : 1, transform: isHoveringBtn ? 'scale(0.9)' : 'scale(1)' }} />
                        <img src="/images/eliane-hq-chatbot-2.png" alt="Assistente hover" className="w-[150%] h-[150%] max-w-none object-contain drop-shadow-2xl absolute transition-all duration-300" style={{ opacity: isHoveringBtn ? 1 : 0, transform: isHoveringBtn ? 'scale(1)' : 'scale(0.9)' }} />
                    </>
                }
                {hasNewMessage && !isOpen && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-white animate-ping" />}
            </button>

            {/* Janela do chat */}
            <div
                id="leadbot-window"
                className={`fixed bottom-24 right-6 z-[9998] w-[95%] max-w-[400px] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                style={{ height: '600px', maxHeight: '82vh', background: '#fff', border: '1px solid rgba(0,0,0,0.1)' }}
            >
                {/* Header */}
                <div className="flex items-center gap-3 p-4 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #0a143a 0%, #1a0a1e 60%, #3a0000 100%)' }}>
                    <div className="relative w-11 h-11 flex-shrink-0">
                        <img src="/images/eliane-hq.png" alt="Eliane Lamarque" className="w-full h-full rounded-full object-cover border-2 border-white/30" />
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">Eliane Lamarque</p>
                        <p className="text-xs text-white/60 flex items-center gap-1">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400" />
                            Consultora Imobiliária · RE/MAX 🇵🇹
                        </p>
                    </div>
                    <div className="flex items-center gap-1">
                        <a href={CONFIG.WHATSAPP_URL} target="_blank" rel="noopener noreferrer" title="WhatsApp"
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-green-500/80 text-white flex items-center justify-center transition-colors">
                            <WhatsAppSVG />
                        </a>
                        <button onClick={handleClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors" aria-label="Fechar">
                            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Badge */}
                <div className="flex justify-center py-1.5 bg-gray-50 border-b border-gray-100">
                    <span className="text-[10px] text-gray-400">✨ Powered by Llama 3.3 (Groq AI)</span>
                </div>

                {/* Conteúdo Dinâmico: Form de Captura ou Chat */}
                {!userData ? (
                    <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center bg-gray-50 text-center">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-200 text-gray-500 mb-4 shadow-sm border border-gray-100">
                            <BotIcon />
                            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-400 border-2 border-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Bem-vindo(a)!</h3>
                        <p className="text-sm text-gray-500 mb-6 px-4">Por favor, preencha os seus dados para podermos oferecer um atendimento mais personalizado.</p>

                        <form onSubmit={submitForm} className="w-full max-w-sm flex flex-col gap-3 px-4">
                            <input
                                type="text"
                                placeholder="Seu Nome Completo"
                                value={formName}
                                onChange={e => setFormName(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#cc0000] focus:ring-2 focus:ring-[#cc0000]/20 transition-all text-sm"
                            />
                            <input
                                type="email"
                                placeholder="Seu E-mail principal"
                                value={formEmail}
                                onChange={e => setFormEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#cc0000] focus:ring-2 focus:ring-[#cc0000]/20 transition-all text-sm"
                            />
                            <input
                                type="tel"
                                placeholder="Seu Telemóvel (WhatsApp)"
                                value={formPhone}
                                onChange={e => setFormPhone(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#cc0000] focus:ring-2 focus:ring-[#cc0000]/20 transition-all text-sm"
                            />

                            <button
                                type="submit"
                                className="w-full py-3 mt-2 rounded-xl text-white font-bold transition-all shadow-md hover:shadow-lg hover:scale-[1.02]"
                                style={{ background: 'linear-gradient(135deg, #cc0000, #8b0000)' }}
                            >
                                Iniciar Conversa
                            </button>
                        </form>
                    </div>
                ) : (
                    <>
                        {/* Mensagens */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex flex-col gap-1.5 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                        {msg.role === 'model' && !msg.isAction && (
                                            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                                                style={{ background: 'linear-gradient(135deg,#cc0000,#8b0000)', color: 'white' }}>
                                                <BotIcon />
                                            </div>
                                        )}
                                        {msg.role === 'user' && (
                                            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-gray-200 text-gray-500">
                                                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                                </svg>
                                            </div>
                                        )}
                                        {msg.isAction ? (() => {
                                            const chatSummary = "*RESUMO DA CONVERSA:*\n" + messages.filter(m => !m.isAction).map(m => {
                                                if (m.role === 'user') return `👤 ${userData.name}: ${m.text}`;
                                                return `🤖 Bot: ${m.text}`;
                                            }).join('\n');

                                            const wppCustomUrl = `https://wa.me/351913663154?text=${encodeURIComponent(
                                                `*LEAD VIA ASSISTENTE VIRTUAL*\n\n` +
                                                `*Nome:* ${userData.name}\n` +
                                                `*Email:* ${userData.email}\n` +
                                                `*Telefone:* ${userData.phone}\n\n` +
                                                chatSummary
                                            )}`;

                                            return (
                                                /* Botões de ação de contato */
                                                <div className="flex flex-col gap-2 w-[calc(100%-2.5rem)] mt-1">
                                                    <div className="flex gap-2">
                                                        <a href={wppCustomUrl} target="_blank" rel="noopener noreferrer"
                                                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-xs font-bold transition-all hover:scale-[1.02]"
                                                            style={{ background: 'linear-gradient(135deg,#25d366,#128c7e)', boxShadow: '0 3px 12px rgba(37,211,102,0.35)' }}>
                                                            <WhatsAppSVG /> WhatsApp
                                                        </a>
                                                        <a href={CONFIG.TELEFONE_URL}
                                                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-xs font-bold transition-all hover:scale-[1.02]"
                                                            style={{ background: 'linear-gradient(135deg,#cc0000,#8b0000)', boxShadow: '0 3px 12px rgba(204,0,0,0.35)' }}>
                                                            <PhoneSVG /> Ligar
                                                        </a>
                                                    </div>
                                                    <a href={CONFIG.SITE_URL} target="_blank" rel="noopener noreferrer"
                                                        className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-[1.02]"
                                                        style={{ background: 'rgba(10,20,58,0.07)', color: '#0a143a', border: '1px solid rgba(10,20,58,0.15)' }}>
                                                        <GlobeSVG /> Ver portfólio
                                                    </a>
                                                </div>
                                            );
                                        })() : (
                                            <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm whitespace-pre-line ${msg.role === 'user'
                                                ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-white rounded-tr-none'
                                                : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'}`}>
                                                <RenderText text={msg.text} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Quick Replies - botões de resposta rápida */}
                                    {msg.quickReplies && msg.role === 'model' && idx === messages.length - 1 && (
                                        <div className="flex flex-wrap gap-1.5 ml-9 mt-0.5">
                                            {msg.quickReplies.map(qr => (
                                                <button key={qr} onClick={() => sendMessage(qr)} disabled={isLoading || isClosed}
                                                    className="text-xs px-3 py-1.5 rounded-full border transition-all hover:scale-[1.04] active:scale-95 disabled:opacity-40"
                                                    style={{ borderColor: 'rgba(204,0,0,0.35)', color: '#cc0000', background: 'rgba(204,0,0,0.05)' }}>
                                                    {qr}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Digitando... */}
                            {isLoading && (
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                                        style={{ background: 'linear-gradient(135deg,#cc0000,#8b0000)', color: 'white' }}>
                                        <BotIcon />
                                    </div>
                                    <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-gray-100 flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Sugestões iniciais */}
                        {messages.length <= 1 && !isLoading && (
                            <div className="px-4 py-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                                {['🏠 Comprar', '💰 Vender', '🔑 Arrendar', '📈 Investir'].map(q => (
                                    <button key={q} onClick={() => sendMessage(q)} disabled={isClosed}
                                        className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all hover:scale-[1.03]"
                                        style={{ borderColor: 'rgba(204,0,0,0.3)', color: '#cc0000', background: 'rgba(204,0,0,0.04)' }}>
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-3 border-t border-gray-100 bg-white flex items-center gap-2">
                            <input
                                ref={inputRef}
                                id="leadbot-input"
                                type="text"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                                placeholder={isClosed ? "Conversa encerrada." : "Escreva a sua mensagem..."}
                                disabled={!hasApiKey || isLoading || isClosed}
                                className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none transition-all disabled:opacity-50"
                                style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.1)' }}
                            />
                            {recognitionRef.current && (
                                <button onClick={toggleListening} title="Falar" disabled={isLoading || isClosed}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                                    <MicIcon active={isListening} />
                                </button>
                            )}
                            <button onClick={() => sendMessage()} disabled={!inputValue.trim() || isLoading || !hasApiKey || isClosed}
                                title="Enviar"
                                className="w-10 h-10 rounded-full text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                                style={{ background: 'linear-gradient(135deg,#cc0000,#8b0000)' }}>
                                <SendIcon />
                            </button>
                        </div>
                    </>
                )}

                {/* Rodapé */}
                <div className="py-1.5 bg-white text-center border-t border-gray-100">
                    <p className="text-[9px] text-gray-300">🔒 As suas informações são confidenciais e seguras</p>
                </div>
            </div>
        </>
    );
};
