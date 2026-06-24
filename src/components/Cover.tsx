"use client";
import { Icons, EyeLogo, SectionIcon } from "./Icons";
import { brand, sections } from "@/lib/content";

export function Cover({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="cover screen fade-enter">
      {/* Mobile bg orbs */}
      <div className="cover-bg">
        <div className="cover-orb a" />
        <div className="cover-orb b" />
      </div>

      {/* ── LEFT PANEL (navy) — desktop only layout ── */}
      <div className="cover-left-panel">
        <div className="cover-top">
          <div className="cover-logo"><EyeLogo size={72} /></div>
          <span className="cover-clinic">Oftalmología</span>
        </div>
        <div className="cover-mid">
          <div className="cover-eyebrow">Guía para tu cirugía de cataratas</div>
          <h1 className="cover-name">{brand.name}</h1>
          <p className="cover-spec">{brand.specialty}</p>
          <p className="cover-welcome">
            Bienvenido/a. Acá vas a encontrar, en cada paso, los videos y las indicaciones
            que necesitás para tu cirugía. Tranquilo/a: te acompañamos.
          </p>
        </div>
        <div className="cover-bottom">
          <button className="cover-enter" onClick={onEnter}>
            Ingresar <Icons.chevron width={24} height={24} />
          </button>
          <div className="cover-foot">Tocá para comenzar</div>
          <a href="/admin" style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", textDecoration: "none", marginTop: 8, display: "block" }}>
            Admin
          </a>
        </div>
      </div>

      {/* ── RIGHT PANEL (paper) — desktop only ── */}
      <div className="cover-right-panel">
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 13, letterSpacing: ".12em", textTransform: "uppercase" as const, color: "var(--muted)", marginBottom: 16 }}>
            ¿Qué encontrás acá?
          </div>
          <div className="cover-features">
            {sections.map(s => (
              <div key={s.id} className="cover-feature" onClick={onEnter}>
                <span className="cover-feature-ico"><SectionIcon id={s.id} /></span>
                <span className="cover-feature-txt">
                  <span className="cover-feature-title">{s.title}</span>
                  <span className="cover-feature-sub">{s.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)" }}>
          Tu salud visual, acompañada en cada paso.
        </div>
      </div>
    </div>
  );
}
