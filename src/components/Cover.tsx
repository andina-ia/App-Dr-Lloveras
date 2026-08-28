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

      {/* ── LEFT PANEL (navy) ── */}
      <div className="cover-left-panel">
        <div className="cover-top">
          <div className="cover-logo"><EyeLogo size={72} /></div>
          <span className="cover-clinic">Oftalmología</span>
        </div>
        <div className="cover-mid">
          <div className="cover-eyebrow">Guía para tu cirugía</div>
          <h1 className="cover-name">{brand.name}</h1>
          <p className="cover-spec">{brand.specialty}</p>
          <p className="cover-welcome">
            Bienvenido/a. Acá vas a encontrar los videos y las indicaciones
            que necesitás para tu cirugía.
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

      {/* ── RIGHT PANEL (desktop only) ── */}
      <div className="cover-right-panel">
        <div className="cover-right-inner">
          <div className="cover-right-label">¿Qué encontrás en la app?</div>
          <div className="cover-section-list">
            {sections.map((s, i) => (
              <div key={s.id} className="cover-section-item" onClick={onEnter}>
                <div className="csi-num">{i + 1}</div>
                <div className="csi-ico"><SectionIcon id={s.id} /></div>
                <div className="csi-txt">
                  <div className="csi-title">{s.title}</div>
                  <div className="csi-sub">{s.sub}</div>
                </div>
                <div className="csi-arrow"><Icons.chevron width={18} height={18} /></div>
              </div>
            ))}
          </div>
          <div className="cover-right-foot">
            Tu salud visual, acompañada en cada paso.
          </div>
        </div>
      </div>
    </div>
  );
}
