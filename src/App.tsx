import { useState } from "react";
import { supabase } from "./lib/supabase";
import { CardContainer, CardBody, CardItem } from "./components/ui/3d-card";
import { GlowBorder } from "./components/ui/glow-border";
import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from "./components/ui/announcement";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ============================================================
   ELIANE LAMARQUE — Landing Page Premium · Layout Centrado
   ============================================================ */

/* ── Ícones SVG ─────────────────────────────────────────── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.43-4.94 8.43-9.94z" />
    </svg>
  );
}
function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ── Componentes ─────────────────────────────────────────── */
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl px-3 py-3"
      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
      <span className="text-xl font-black text-white">{value}</span>
      <span className="mt-0.5 text-center text-[10px] font-semibold uppercase tracking-wider text-white/50">{label}</span>
    </div>
  );
}

function Testimonial({ name, text }: { name: string; text: string }) {
  return (
    <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
      <div className="flex gap-0.5 mb-2">
        {[...Array(5)].map((_, i) => <StarIcon key={i} className="h-3 w-3 text-yellow-400" />)}
      </div>
      <p className="text-[12px] leading-relaxed text-white/65 italic">"{text}"</p>
      <p className="mt-2 text-[11px] font-bold text-white/40">— {name}</p>
    </div>
  );
}

function InputField({ id, type = "text", name, value, onChange, placeholder, icon }: {
  id: string; type?: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string; icon: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: focused ? "#cc0000" : "rgba(255,255,255,0.3)" }}>
        {icon}
      </span>
      <input
        id={id} type={type} name={name} value={value} onChange={onChange} required
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full rounded-xl pl-10 pr-4 py-3 text-[13px] font-medium text-white placeholder-white/30 outline-none transition-all"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: `1px solid ${focused ? "rgba(204,0,0,0.7)" : "rgba(255,255,255,0.1)"}`,
          boxShadow: focused ? "0 0 0 3px rgba(204,0,0,0.12)" : "none",
        }}
      />
    </div>
  );
}

/* ── Toast ───────────────────────────────────────────────── */
function Toast({ visible }: { visible: boolean }) {
  return (
    <div className="fixed left-1/2 z-50 transition-all duration-500"
      style={{ top: visible ? "20px" : "-80px", transform: "translateX(-50%)", opacity: visible ? 1 : 0 }}>
      <div className="flex items-center gap-3 rounded-2xl px-5 py-3 shadow-2xl"
        style={{ background: "linear-gradient(135deg,#003087,#0047c0)", border: "1px solid rgba(255,255,255,0.2)" }}>
        <CheckIcon className="h-5 w-5 text-green-400" />
        <span className="text-sm font-bold text-white">Recebemos o seu contacto! Falaremos em breve. 🎉</span>
      </div>
    </div>
  );
}

// ── Floating Social ──────────────────────────────────────── */
function FloatingSocials() {
  const socials = [
    {
      icon: <FacebookIcon className="h-5 w-5" />,
      url: "https://www.facebook.com/share/18oqgRVXVG/",
      msg: "Acompanhe as melhores oportunidades de investimento!"
    },
    {
      icon: <InstagramIcon className="h-5 w-5" />,
      url: "https://www.instagram.com/ecristinalamarque?igsh=MTEwYnFyenBhdGZhaA==",
      msg: "Dicas exclusivas e imóveis de alto luxo diariamente."
    },
    {
      icon: <MailIcon className="h-5 w-5" />,
      url: "mailto:elianelamarque@remax.pt",
      msg: "Peça agora uma análise de mercado personalizada."
    },
    {
      icon: <GlobeIcon className="h-5 w-5" />,
      url: "https://remax.pt/pt/agente/eliane-lamarque/126421029",
      msg: "Veja o meu portfólio completo na RE/MAX."
    },
  ];

  return (
    <div className="absolute left-[-50px] md:left-[-60px] top-40 md:top-80 z-50 flex flex-col gap-4 md:gap-6">
      {socials.map((s, i) => (
        <a
          key={i}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:scale-120"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
          }}
        >
          {/* Ícone principal */}
          <div className="text-white/40 group-hover:text-white transition-colors">
            {s.icon}
          </div>

          {/* Tooltip Inteligente (Mensagem + Foto) */}
          <div className="absolute left-14 top-1/2 -translate-y-1/2 flex items-center gap-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 w-[240px] pointer-events-none">
            <div className="relative flex items-center gap-3 rounded-2xl p-2.5 shadow-2xl backdrop-blur-xl border border-white/15"
              style={{ background: "rgba(10,20,58,0.95)" }}>
              {/* Miniatura Eliane */}
              <img
                src="/images/eliane-hq.png"
                className="h-9 w-9 flex-shrink-0 rounded-full object-cover border border-white/20 bg-[#003087]"
                alt="Eliane"
              />
              {/* Texto com mensagem de vendas */}
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold text-[#e8a020] uppercase tracking-wider mb-0.5">Eliane Lamarque</span>
                <span className="text-[11px] font-medium leading-tight text-white/90">{s.msg}</span>
              </div>
              {/* Triângulo indicador do tooltip */}
              <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-white/15" />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

// ── Marquee Component ────────────────────────────────────── */
function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "reverse [animation-direction:reverse]": reverse,
              "pause-on-hover": pauseOnHover,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

function ReviewCard({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) {
  return (
    <figure
      className={cn(
        "relative w-[300px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/11 transition-colors",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <img className="rounded-full bg-white/10" width="40" height="40" alt={name} src={img} />
        <div className="flex flex-col text-left">
          <figcaption className="text-[14px] font-bold text-white">
            {name}
          </figcaption>
          <p className="text-[11px] font-medium text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-3 text-[13px] leading-relaxed text-white/70 text-left line-clamp-3">
        "{body}"
      </blockquote>
    </figure>
  );
}

/* ============================================================
   MAIN APP
   ============================================================ */
export default function App() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", interest: "comprar" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const whatsappUrl = `https://wa.me/351913663154?text=${encodeURIComponent("Olá! *consultora Eliane* Gostaria de mais informações sobre seus serviços.🤝")}`;
  const callUrl = "tel:+351913663154";
  const instagramUrl = "https://www.instagram.com/ecristinalamarque?igsh=MTEwYnFyenBhdGZhaA%3D%3D";
  const facebookUrl = "https://www.facebook.com/";

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    try {
      const interestMap = {
        comprar: "🏠 Quero comprar um imóvel",
        vender: "💰 Quero vender o meu imóvel",
        arrendar: "🔑 Quero arrendar",
        investir: "📈 Quero investir em imóveis",
      };

      const selectedInterest = interestMap[form.interest as keyof typeof interestMap] || form.interest;

      // 1. Tentar salvar no Supabase (silencioso para não bloquear o WhatsApp se falhar)
      try {
        const { error: supabaseError } = await supabase
          .from('leads')
          .insert([
            {
              nome: form.name,
              telefone: form.phone,
              email: form.email,
              interesse: selectedInterest
            }
          ]);
        if (supabaseError) console.error('Aviso Supabase:', supabaseError);
      } catch (dbErr) {
        console.error('Erro ao conectar ao banco:', dbErr);
      }

      // 2. Preparar e enviar para o WhatsApp (Ação Principal)
      const message = `Olá Eliane! Novo contacto do site:
*Nome:* ${form.name}
*Telemóvel:* ${form.phone}
*E-mail:* ${form.email}
*Interesse:* ${selectedInterest}`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `https://wa.me/351913663154?text=${encodedMessage}`;

      // 3. Feedback visual
      setSent(true);
      setForm({ name: "", phone: "", email: "", interest: "comprar" });

      // 4. Abrir WhatsApp (Prioridade)
      const newWindow = window.open(whatsappLink, '_blank');
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        window.location.href = whatsappLink;
      }

      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.error('Erro crítico no formulário:', err);
      // Fallback final caso tudo dê errado
      const fallbackUrl = `https://wa.me/351913663154`;
      window.location.href = fallbackUrl;
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "#040b1e", fontFamily: "'Inter',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet" />

      <Toast visible={sent} />

      {/* ── Fundo global ────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        {/* logo1 desfocado */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/images/logo1.png')",
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "blur(4px) brightness(0.45) saturate(1.2)",
          transform: "scale(1.05)",
        }} />
        {/* gradiente overlay ajustado para ser mais transparente e revelar mais a imagem */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(4,11,30,0.3) 0%, rgba(8,18,50,0.5) 60%, rgba(4,11,30,0.85) 100%)",
        }} />
        {/* glow vermelho canto sup direito */}
        <div style={{
          position: "absolute", top: "-10%", right: "-5%",
          width: "420px", height: "420px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(204,0,0,0.22) 0%, transparent 70%)",
          filter: "blur(6px)",
        }} />
        {/* glow azul canto inf esq */}
        <div style={{
          position: "absolute", bottom: "5%", left: "-5%",
          width: "360px", height: "360px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,48,135,0.28) 0%, transparent 70%)",
          filter: "blur(6px)",
        }} />
      </div>

      {/* ══════════════════════════════════════════════════
          COLUNA CENTRAL ÚNICA — tudo centralizado
      ══════════════════════════════════════════════════ */}
      <main className="relative z-10 flex flex-col items-center pl-[56px] pr-4 md:px-4 pt-10 pb-16">
        <div className="w-full max-w-[420px]">

          {/* ── SECÇÃO 1: Hero com foto sobreposta ──────── */}
          <section className="relative mt-4 flex flex-col items-center">

            {/* Headline centrada */}
            <h1 className="text-center text-4xl font-black leading-tight text-white" style={{ textShadow: "0 4px 30px rgba(0,0,0,0.6)" }}>
              O imóvel dos seus<br />
              <span style={{ background: "linear-gradient(90deg,#ff6060,#cc0000)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                sonhos
              </span>{" "}começa aqui.
            </h1>
            <p className="mt-3 text-center text-[13px] leading-relaxed text-white/60 max-w-[340px]">
              Consultora certificada RE/MAX ajudando famílias e investidores em Portugal.
            </p>

            {/* ── FOTO DA ELIANE — sobreposta em destaque ── */}
            <div className="relative mt-6 w-full">
              <FloatingSocials />
              {/* Glow atrás da foto */}
              <div className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 h-72 w-72 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(0,48,135,0.5) 0%, transparent 70%)" }}
                aria-hidden="true" />

              {/* ── CARTÃO COM EFEITO 3D FLOAT EM TODO O QUADRANTE ── */}
              <CardContainer className="w-full">
                <CardBody className="relative w-full h-auto">
                  {/* ── GLOW BORDER CONTORNANDO O CARTÃO ── */}
                  <GlowBorder borderRadius={32} borderWidth={1.5} color={["#A07CFE", "#FE8FB5", "#FFBE7B"]} className="mx-auto mt-44 w-full h-full">
                    {/* Cartão de fundo (identidade - modelo Cartão 3) */}
                    <div className="relative rounded-[32px] pt-4 pb-0 px-5 text-center"
                      style={{
                        background: "rgba(10,20,58,0.92)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        backdropFilter: "blur(20px)",
                        boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
                      }}>

                      {/* ── FOTO DA MULHER (Eliane HQ) — COM EFEITO 3D MAIS ALTO ── */}
                      <CardItem translateZ="100" className="relative w-full flex justify-center mb-5" style={{ marginTop: "-260px" }}>
                        <img
                          src="/images/eliane-hq.png"
                          alt="Eliane Lamarque"
                          className="h-[560px] max-w-none object-contain relative z-20 pointer-events-none"
                          style={{ filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.8))" }}
                        />
                        {/* Gradiente de fusão reforçado na base */}
                        <div className="absolute bottom-0 left-0 w-full h-28 z-30 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(10,20,58,0.95) 0%, rgba(10,20,58,0.4) 50%, transparent 100%)" }} />
                      </CardItem>

                      <CardItem translateZ="60" className="flex w-full justify-center">
                        <Announcement movingBorder className="w-[90%] md:min-w-[280px]">
                          <AnnouncementTitle>
                            <h2 className="text-3xl font-black tracking-wide text-white">Eliane Lamarque</h2>
                          </AnnouncementTitle>
                          <AnnouncementTag lustre>
                            Consultora Imobiliária
                          </AnnouncementTag>
                          <a href={callUrl} className="mt-1 block text-[17px] font-extrabold text-white/95 hover:text-white transition-colors">
                            +351 913 663 154
                          </a>
                        </Announcement>
                      </CardItem>

                      {/* Botões com profundidade menor para efeito de camadas */}
                      <CardItem translateZ="40" className="px-5 pb-8 mt-6">
                        <div className="flex gap-2.5">
                          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-[12px] font-bold text-white transition-all hover:scale-[1.03]"
                            style={{ background: "linear-gradient(135deg,#25d366,#128c7e)", boxShadow: "0 4px 18px rgba(37,211,102,0.35)" }}>
                            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                          </a>
                          <a href={callUrl}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-[12px] font-bold text-white transition-all hover:scale-[1.03]"
                            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                            <PhoneIcon className="h-4 w-4" /> Ligar
                          </a>
                        </div>
                      </CardItem>
                    </div>
                  </GlowBorder>
                </CardBody>
              </CardContainer>
            </div>
          </section>

          {/* ── FORMULÁRIO DE LEADS ─────────────────────── */}
          <section className="mt-6">
            <div className="rounded-3xl p-5"
              style={{
                background: "rgba(10,20,58,0.82)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
              }}>
              {/* Cabeçalho do formulário */}
              <div className="mb-4 text-center">
                <h2 className="text-[17px] font-black text-white">Fale comigo agora 👇</h2>
                <p className="mt-0.5 text-[11px] text-white/45">Preencha e entrarei em contacto em minutos.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <InputField id="lead-name" name="name" value={form.name} onChange={handleChange}
                  placeholder="O seu nome completo" icon={<UserIcon className="h-4 w-4" />} />
                <InputField id="lead-phone" type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder="O seu telemóvel" icon={<PhoneIcon className="h-4 w-4" />} />
                <InputField id="lead-email" type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="O seu e-mail" icon={<MailIcon className="h-4 w-4" />} />

                {/* Select */}
                <div className="relative">
                  <select id="lead-interest" name="interest" value={form.interest} onChange={handleChange}
                    className="w-full appearance-none rounded-xl px-4 py-3 text-[13px] font-medium text-white/80 outline-none"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <option value="comprar" style={{ background: "#0d1e42" }}>🏠 Quero comprar um imóvel</option>
                    <option value="vender" style={{ background: "#0d1e42" }}>💰 Quero vender o meu imóvel</option>
                    <option value="arrendar" style={{ background: "#0d1e42" }}>🔑 Quero arrendar</option>
                    <option value="investir" style={{ background: "#0d1e42" }}>📈 Quero investir em imóveis</option>
                  </select>
                  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/35">▾</span>
                </div>

                {/* Botão submit */}
                <button type="submit" disabled={sending}
                  className="mt-1 flex w-full items-center justify-center gap-2.5 rounded-xl py-4 font-black tracking-wider text-white transition-all hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
                  style={{
                    background: "linear-gradient(90deg,#cc0000,#990000)",
                    boxShadow: "0 8px 32px rgba(204,0,0,0.45)",
                    fontSize: "13px", letterSpacing: "0.15em",
                  }}>
                  {sending ? (
                    <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> A ENVIAR...</>
                  ) : (
                    <>QUERO SER CONTACTADO <ArrowRightIcon className="h-4 w-4" /></>
                  )}
                </button>

                <p className="text-center text-[10px] text-white/25">🔒 Dados 100% confidenciais e seguros.</p>
              </form>
            </div>
          </section>

          {/* ── BENEFÍCIOS ──────────────────────────────── */}
          <section className="mt-6">
            <div className="rounded-3xl p-5 space-y-3"
              style={{ background: "rgba(10,20,58,0.7)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}>
              <h3 className="text-center text-[14px] font-black tracking-wide text-white">Porque escolher a Eliane?</h3>
              {[
                "Atendimento exclusivo e personalizado do início ao fim",
                "Acesso a imóveis premium antes de chegarem ao mercado",
                "Apoio completo em financiamento e documentação legal",
                "Negociação especializada para garantir segurança e as condições mais vantajosas",
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                    style={{ background: "linear-gradient(135deg,#cc0000,#ff4444)" }}>
                    <CheckIcon className="h-3 w-3 text-white" />
                  </span>
                  <span className="text-[13px] leading-snug text-white/75">{b}</span>
                </div>
              ))}
            </div>
          </section>


          {/* ── SOCIAL + FOOTER ─────────────────────────── */}
          <footer className="mt-8 flex flex-col items-center gap-3">
            <p className="text-center text-[10px] tracking-widest text-white/20">
              © 2025 Eliane Lamarque · RE/MAX Dinâmica Daire
            </p>
          </footer>

        </div>
      </main>
    </div>
  );
}
