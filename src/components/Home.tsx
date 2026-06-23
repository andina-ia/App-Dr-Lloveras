"use client";
import { Section } from "@/lib/content";
import { brand } from "@/lib/content";
import { Icons, SectionIcon } from "./Icons";

type Layout = "stacked" | "list" | "mosaic";

function CardStacked({ s, n, onOpen }: { s: Section; n: number; onOpen: (s: Section) => void }) {
  return (
    <button className="opt-card stacked" onClick={() => onOpen(s)}>
      <span className="opt-num">{n}</span>
      <span className="opt-ico"><SectionIcon id={s.id} /></span>
      <span className="opt-txt">
        <span className="opt-title">{s.title}</span>
        <span className="opt-sub">{s.sub}</span>
      </span>
      <span className="opt-arrow"><Icons.chevron width={24} height={24} /></span>
    </button>
  );
}

function CardList({ s, n, onOpen }: { s: Section; n: number; onOpen: (s: Section) => void }) {
  return (
    <button className="opt-card list" onClick={() => onOpen(s)}>
      <span className="opt-ico sm"><SectionIcon id={s.id} /></span>
      <span className="opt-txt">
        <span className="opt-title">{s.title}</span>
        <span className="opt-sub">{s.sub}</span>
      </span>
      <span className="opt-arrow"><Icons.chevron width={22} height={22} /></span>
    </button>
  );
}

function CardMosaic({ s, n, onOpen }: { s: Section; n: number; onOpen: (s: Section) => void }) {
  return (
    <button className="opt-card mosaic" onClick={() => onOpen(s)}>
      <span className="opt-num">{n}</span>
      <span className="opt-ico"><SectionIcon id={s.id} /></span>
      <span className="opt-title">{s.title}</span>
      <span className="opt-sub">{s.sub}</span>
    </button>
  );
}

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
  const Card = layout === "list" ? CardList : layout === "mosaic" ? CardMosaic : CardStacked;
  return (
    <div className="screen home fade-enter">
      <header className="home-head">
        <button className="home-back" onClick={onBack} aria-label="Volver a la portada">
          <Icons.back width={22} height={22} /><span>Portada</span>
        </button>
        <div className="brand-row">
          <div className="brand-logo">ML</div>
          <div className="brand-meta">
            <div className="brand-name">{brand.name}</div>
            <div className="brand-spec">{brand.specialty}</div>
          </div>
        </div>
        <h1 className="home-greet">{brand.greeting}</h1>
        <p className="home-intro">{brand.intro}</p>
      </header>
      <div className={`opt-grid ${layout}`}>
        {sections.map((s, i) => (
          <Card key={s.id} s={s} n={i + 1} onOpen={onOpen} />
        ))}
      </div>
      <div className="home-foot">
        <span className="home-foot-dot" />
        Tu salud visual, acompañada en cada paso.
      </div>
    </div>
  );
}
