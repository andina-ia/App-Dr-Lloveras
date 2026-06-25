"use client";
import { Section, brand } from "@/lib/content";
import { Icons, EyeLogo, SectionIcon } from "./Icons";

type Layout = "stacked" | "list" | "mosaic";

export function Home({
  sections,
  layout,
  onOpen,
  onBack,
}: {
  sections: Section[];
  layout: Layout;
  onOpen: (s: Section) => void;
  onBack: () => void;
}) {
  return (
    <div className="screen home fade-enter">
      {/* HEADER */}
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

      {/* CARDS */}
      <div className="opt-grid stacked">
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
