"use client";
import { Section } from "@/lib/content";
import { Icons, EyeLogo, SectionIcon } from "./Icons";

export function SectionList({
  sections,
  onOpen,
  onBack,
}: {
  sections: Section[];
  onOpen: (s: Section) => void;
  onBack: () => void;
}) {
  return (
    <div className="screen home fade-enter">
      <header className="home-head">
        <button className="home-back" onClick={onBack} aria-label="Volver">
          <Icons.back width={22} height={22} /><span>Inicio</span>
        </button>
        <div className="brand-row">
          <div className="brand-logo"><EyeLogo size={42} /></div>
          <div className="brand-meta">
            <div className="brand-name">Acompañamiento</div>
            <div className="brand-spec">Cirugía de cataratas</div>
          </div>
        </div>
        <h1 className="home-greet" style={{ fontSize: "calc(26px*var(--scale))" }}>
          Tus pasos y guías
        </h1>
        <p className="home-intro">Seleccioná la sección que necesitás.</p>
      </header>

      <div className="opt-grid stacked" style={{ padding: "22px 18px 0" }}>
        {sections.map((s, i) => (
          <button key={s.id} className="opt-card stacked" onClick={() => onOpen(s)}>
            <div className="card-top">
              <div className="card-num">{i + 1}</div>
              <div className="card-ico"><SectionIcon id={s.id} /></div>
            </div>
            <div className="card-body">
              <div className="card-title">{s.title}</div>
              <div className="card-sub">{s.sub}</div>
            </div>
            <div className="card-arrow"><Icons.chevron width={20} height={20} /></div>
          </button>
        ))}
      </div>

      <div className="home-foot">
        <span className="home-foot-dot" />
        Tu salud visual, acompañada en cada paso.
      </div>
    </div>
  );
}
