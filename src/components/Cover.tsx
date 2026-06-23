"use client";
import { Icons } from "./Icons";

export function Cover({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="cover screen fade-enter">
      <div className="cover-bg">
        <div className="cover-orb a" />
        <div className="cover-orb b" />
      </div>
      <div className="cover-top">
        <div className="cover-logo">ML</div>
        <span className="cover-clinic">Oftalmología</span>
      </div>
      <div className="cover-mid">
        <div className="cover-eyebrow">Información para tu cirugía</div>
        <h1 className="cover-name">Dr. Marcelo<br />Lloveras</h1>
        <p className="cover-spec">Cirugía de cataratas</p>
        <p className="cover-welcome">Todo lo que necesitás saber antes y después de tu operación, en un solo lugar.</p>
      </div>
      <div className="cover-bottom">
        <button className="cover-enter" onClick={onEnter}>
          Ingresar <Icons.chevron width={22} height={22} />
        </button>
        <span className="cover-foot">Tu salud visual, acompañada en cada paso.</span>
      </div>
    </div>
  );
}
