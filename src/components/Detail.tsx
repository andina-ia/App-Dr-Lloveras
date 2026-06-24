"use client";
import { useRef, useEffect, useState } from "react";
import { Section, contact } from "@/lib/content";
import { Icons, AvatarMark } from "./Icons";

// ── Lens Simulator (sección "lente") ──────────────────────────────────
const LENS_TYPES = [
  { key: "catarata", label: "Con catarata", img: "/scenes/scene-catarata.png",
    badge: "Así ves hoy",
    note: "Hoy: toda la escena se ve opaca y borrosa, como mirar a través de un vidrio empañado. Los colores se ven apagados." },
  { key: "monofocal", label: "Monofocal", img: "/scenes/scene-monofocal.png", zone: "Cerca: borroso",
    range: [{ l: "Lejos", on: true }, { l: "Intermedia", on: false }, { l: "Cerca", on: false }],
    note: "Nítido SOLO de lejos (la ventana, el paisaje). De cerca —el libro, el cel— se ve borroso: vas a necesitar anteojos para leer." },
  { key: "extendida", label: "Visión extendida", img: "/scenes/scene-extendida.png", zone: "Solo lo muy cercano",
    range: [{ l: "Lejos", on: true }, { l: "Intermedia", on: true }, { l: "Cerca", on: false }],
    note: "Nítido de lejos y a media distancia (el reloj, la compu, cocinar). Solo la letra muy chica y cercana puede quedar algo borrosa." },
  { key: "trifocal", label: "Trifocal", img: "/scenes/scene.png",
    range: [{ l: "Lejos", on: true }, { l: "Intermedia", on: true }, { l: "Cerca", on: true }],
    note: "Todo nítido: de lejos, a media distancia y de cerca. Mínima dependencia de los anteojos." },
] as const;

function LensSimulator({ section }: { section: Section }) {
  const [sel, setSel] = useState<string>("catarata");
  const t = LENS_TYPES.find(l => l.key === sel)!;
  return (
    <div className="lens-sim">
      <p className="video-caption" style={{ marginTop: 0, marginBottom: 14 }}>{section.videoIntro}</p>
      <div className="lens-stage">
        {LENS_TYPES.map(l => (
          <div key={l.key} className="lens-layer"
            style={{ backgroundImage: `url(${l.img})`, opacity: l.key === sel ? 1 : 0 }} />
        ))}
        <span className="lens-badge">{"badge" in t ? t.badge : "Así verías"}</span>
        {"zone" in t && t.zone && <span className="lens-zone">{t.zone}</span>}
      </div>
      <div className="lens-tabs">
        {LENS_TYPES.map(l => (
          <button key={l.key} className={"lens-tab" + (sel === l.key ? " on" : "")} onClick={() => setSel(l.key)}>
            {l.label}
          </button>
        ))}
      </div>
      {"range" in t && t.range && (
        <div className="lens-range">
          {t.range.map((r, i) => (
            <span key={i} className={"lens-dist" + (r.on ? " on" : "")}>
              <span className="lens-dot">{r.on ? <Icons.check width={14} height={14} /> : null}</span>
              {r.l}
            </span>
          ))}
        </div>
      )}
      <p className="lens-note">{t.note}</p>
    </div>
  );
}

// ── Video player ──────────────────────────────────────────────────────
function VideoPlayer({ section }: { section: Section }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => { setPlaying(false); }, [section.id]);

  if (section.videoUrl) {
    const toggle = () => {
      const v = videoRef.current; if (!v) return;
      if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
    };
    const expand = (e: React.MouseEvent) => {
      e.stopPropagation();
      const v = videoRef.current; if (!v) return;
      const box = v.parentElement as HTMLElement & {
        requestFullscreen?: () => void;
        webkitRequestFullscreen?: () => void;
        webkitEnterFullscreen?: () => void;
      };
      if (box.requestFullscreen) box.requestFullscreen();
      else if (box.webkitRequestFullscreen) box.webkitRequestFullscreen();
      if (v.paused) { v.play(); setPlaying(true); }
    };
    return (
      <div className="video-wrap">
        <div className="video real" onClick={toggle}>
          <video ref={videoRef} className="video-el" playsInline preload="metadata"
            onEnded={() => setPlaying(false)} onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)}>
            {section.videoUrl && <source src={section.videoUrl} type={section.videoUrl.includes('.mov') ? 'video/quicktime' : 'video/mp4'} />}
          </video>
          <button className="video-expand" aria-label="Ver en pantalla completa" onClick={expand}>
            <Icons.expand width={20} height={20} />
          </button>
          {!playing && (
            <div className="video-center">
              <button className="play-btn" aria-label="Reproducir">
                <Icons.play width={32} height={32} style={{ marginLeft: 4 }} />
              </button>
            </div>
          )}
          {!playing && (
            <div className="video-foot">
              <span className="video-foot-name">Dr. Marcelo Lloveras</span>
              <span className="video-foot-hint">Tocá para ampliar</span>
            </div>
          )}
        </div>
        <p className="video-caption">{section.videoIntro}</p>
      </div>
    );
  }

  // Placeholder
  return (
    <div className="video-wrap">
      <div className={"video" + (playing ? " is-playing" : "")} onClick={() => setPlaying(p => !p)}>
        <div className="video-glow" />
        <div className="video-center">
          {!playing && <AvatarMark size={86} />}
          <button className="play-btn" aria-label={playing ? "Pausar" : "Reproducir"}>
            {playing ? (
              <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
                <rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>
              </svg>
            ) : (
              <Icons.play width={32} height={32} style={{ marginLeft: 4 }} />
            )}
          </button>
        </div>
        {playing && <div className="video-playing-tag">Video próximamente</div>}
        <div className="video-foot">
          <span className="video-foot-name">Dr. Marcelo Lloveras</span>
        </div>
      </div>
      <p className="video-caption">{section.videoIntro}</p>
    </div>
  );
}

// ── PDF Card ──────────────────────────────────────────────────────────
function PdfCard({ section }: { section: Section }) {
  const [done, setDone] = useState(false);

  if (section.pdfUrl) {
    return (
      <a className={"pdf-card" + (done ? " done" : "")} href={section.pdfUrl}
        target="_blank" rel="noreferrer" onClick={() => setDone(true)} style={{ textDecoration: "none" }}>
        <span className="pdf-ico"><Icons.pdf width={26} height={26} /></span>
        <span className="pdf-text">
          <span className="pdf-name">{section.pdfName}</span>
          <span className="pdf-meta">{done ? "Descargado · listo para leer" : section.pdfMeta}</span>
        </span>
        <span className="pdf-action">{done ? <Icons.check width={24} height={24} /> : <Icons.download width={24} height={24} />}</span>
      </a>
    );
  }
  return (
    <button className="pdf-card" disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>
      <span className="pdf-ico"><Icons.pdf width={26} height={26} /></span>
      <span className="pdf-text">
        <span className="pdf-name">{section.pdfName}</span>
        <span className="pdf-meta">Próximamente</span>
      </span>
      <span className="pdf-action"><Icons.download width={24} height={24} /></span>
    </button>
  );
}

// ── FAQ Accordion ─────────────────────────────────────────────────────
function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(-1);
  return (
    <div className="faq">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div className={"faq-item" + (isOpen ? " open" : "")} key={i}>
            <button className="faq-q" onClick={() => setOpen(isOpen ? -1 : i)}>
              <span>{it.q}</span>
              <span className="faq-icon"><Icons.plus width={22} height={22} /></span>
            </button>
            <div className="faq-a-wrap"><div className="faq-a">{it.a}</div></div>
          </div>
        );
      })}
    </div>
  );
}

// ── Summary ───────────────────────────────────────────────────────────
function Summary({ section }: { section: Section }) {
  const numbered = section.summaryKind === "steps";
  return (
    <div className="summary">
      {section.summary.map((s, i) => (
        <div className="sum-row" key={i}>
          <span className={"sum-mark" + (numbered ? " num" : "")}>
            {numbered ? i + 1 : <Icons.check width={18} height={18} />}
          </span>
          <span className="sum-text">
            <span className="sum-h">{s.h}</span>
            <span className="sum-t">{s.t}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Contact ───────────────────────────────────────────────────────────
function ContactCard() {
  const wa = (process.env.NEXT_PUBLIC_WHATSAPP || contact.phone).replace(/\D/g, "");
  return (
    <div className="contact">
      <p className="contact-note">{contact.note}</p>
      <a className="wa-btn" href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer">
        <Icons.whatsapp width={26} height={26} />
        <span className="wa-text">
          <span className="wa-label">{contact.label}</span>
          <span className="wa-sub">{contact.sub}</span>
        </span>
      </a>
    </div>
  );
}

// ── Detail Screen ─────────────────────────────────────────────────────
export function Detail({ section, onBack }: { section: Section; onBack: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (ref.current) ref.current.scrollTop = 0; }, [section.id]);

  return (
    <div className="screen detail fade-enter" ref={ref}>
      <header className="detail-top">
        <button className="back-btn" onClick={onBack}><Icons.back width={24} height={24} /><span>Inicio</span></button>
      </header>
      <div className="detail-body">
        <h1 className="detail-title">{section.detailTitle}</h1>
        {section.id === "lente" ? <LensSimulator section={section} /> : <VideoPlayer section={section} />}
        <h2 className="block-h">{section.summaryTitle}</h2>
        <Summary section={section} />
        <h2 className="block-h">Llevátelo por escrito</h2>
        <PdfCard section={section} />
        <h2 className="block-h">Preguntas frecuentes</h2>
        <Faq items={section.faq} />
        <h2 className="block-h">¿Tenés dudas?</h2>
        <ContactCard />
        <div className="detail-end">Dr. Marcelo Lloveras · Oftalmología</div>
      </div>
    </div>
  );
}
