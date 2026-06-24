"use client";
import { Icons, EyeLogo } from "./Icons";
import { brand } from "@/lib/content";

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

      {/* ── RIGHT PANEL — desktop only, removed as redundant ── */}

    </div>
  );
}
