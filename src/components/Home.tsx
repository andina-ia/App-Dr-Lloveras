"use client";
import { brand } from "@/lib/content";
import { Icons, EyeLogo } from "./Icons";

export function Home({
  onOpen,
  onBack,
}: {
  onOpen: () => void;
  onBack: () => void;
}) {
  return (
    <div className="screen home fade-enter">
      <header className="home-head">
        <button className="home-back" onClick={onBack} aria-label="Volver a la portada">
          <Icons.back width={22} height={22} /><span>Portada</span>
        </button>
        <div className="brand-row">
          <div className="brand-logo"><EyeLogo size={42} /></div>
          <div className="brand-meta">
            <div className="brand-name">{brand.name}</div>
            <div className="brand-spec">{brand.specialty}</div>
          </div>
        </div>
        <h1 className="home-greet">{brand.greeting}</h1>
        <p className="home-intro">{brand.intro}</p>
      </header>

      <div style={{ padding: "24px 20px" }}>
        <button className="surgery-card" onClick={onOpen}>
          <div className="surgery-card-ico">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4l3 3"/>
            </svg>
          </div>
          <div className="surgery-card-txt">
            <div className="surgery-card-title">Acompañamiento cirugía de cataratas</div>
            <div className="surgery-card-sub">Videos, indicaciones y guías para cada etapa de su cirugía</div>
          </div>
          <div className="surgery-card-arrow">
            <Icons.chevron width={24} height={24} />
          </div>
        </button>
      </div>

      <div className="home-foot">
        <span className="home-foot-dot" />
        Tu salud visual, acompañada en cada paso.
      </div>
    </div>
  );
}
