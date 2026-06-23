"use client";
import { useRef, useEffect, useState } from "react";
import { Section, contact } from "@/lib/content";
import { Icons, AvatarMark } from "./Icons";

function VideoPlayer({ section }: { section: Section }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => { setPlaying(false); }, [section.id]);

  if (section.videoUrl) {
    return (
      <div className="video-wrap">
        <video
          ref={videoRef}
          src={section.videoUrl}
          controls
          playsInline
          style={{ width: "100%", borderRadius: "var(--r)", boxShadow: "var(--shadow)", display: "block" }}
        />
        <p className="video-caption">{section.videoIntro}</p>
      </div>
    );
  }

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
          {!playing && (
            <div className="video-placeholder">
              <p>Video próximamente</p>
            </div>
          )}
        </div>
        {playing && <div className="video-playing-tag">Próximamente…</div>}
        <div className="video-foot">
          <span className="video-foot-name">Dr. Marcelo Lloveras</span>
        </div>
      </div>
      <p className="video-caption">{section.videoIntro}</p>
    </div>
  );
}

function PdfCard({ section }: { section: Section }) {
  const [done, setDone] = useState(false);

  if (section.pdfUrl) {
    return (
      <a
        className={"pdf-card" + (done ? " done" : "")}
        href={section.pdfUrl}
        target="_blank"
        rel="noreferrer"
        onClick={() => setDone(true)}
        style={{ textDecoration: "none" }}
      >
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

function ContactCard() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP || contact.phone.replace(/\D/g, "");
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
        <VideoPlayer section={section} />
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
