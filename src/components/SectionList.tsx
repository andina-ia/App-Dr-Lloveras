"use client";
import { useState, useEffect } from "react";
import { Section } from "@/lib/content";
import { Icons, EyeLogo, SectionIcon } from "./Icons";

const STORAGE_KEY = "lloveras-completed-steps";

export function SectionList({
  sections,
  onOpen,
  onBack,
}: {
  sections: Section[];
  onOpen: (s: Section) => void;
  onBack: () => void;
}) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setCompleted(new Set(JSON.parse(saved)));
    } catch {}
  }, []);

  function handleOpen(s: Section) {
    const next = new Set(completed);
    next.add(s.id);
    setCompleted(next);
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); } catch {}
    onOpen(s);
  }

  const completedCount = sections.filter(s => completed.has(s.id)).length;

  return (
    <div className="screen home fade-enter">
      <header className="home-head">
        <button className="home-back" onClick={onBack}>
          <Icons.back width={22} height={22} /><span>Inicio</span>
        </button>
        <div className="brand-row">
          <div className="brand-logo"><EyeLogo size={42} /></div>
          <div className="brand-meta">
            <div className="brand-name">Acompañamiento</div>
            <div className="brand-spec">Cirugía de cataratas</div>
          </div>
        </div>
        <h1 className="home-greet" style={{ fontSize: "calc(24px*var(--scale))" }}>Tu recorrido</h1>
        <p className="home-intro">
          {completedCount === 0
            ? "Seleccione cada paso para ver el video y las indicaciones."
            : completedCount === sections.length
            ? "¡Completó todos los pasos! 🎉"
            : `${completedCount} de ${sections.length} pasos visitados`}
        </p>
      </header>

      {/* PROGRESS BAR */}
      <div style={{ padding: "16px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: "calc(12px*var(--scale))", color: "var(--muted)", fontWeight: 600 }}>Progreso</span>
          <span style={{ fontSize: "calc(12px*var(--scale))", color: "var(--navy)", fontWeight: 700 }}>{completedCount}/{sections.length}</span>
        </div>
        <div style={{ height: 6, background: "var(--line)", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(completedCount / sections.length) * 100}%`, background: "var(--navy)", borderRadius: 99, transition: "width .4s ease" }} />
        </div>
      </div>

      {/* JOURNEY */}
      <div style={{ padding: "20px 20px 40px" }}>
        {sections.map((s, i) => {
          const done = completed.has(s.id);
          const isLast = i === sections.length - 1;
          return (
            <div key={s.id} style={{ display: "flex", gap: 0 }}>
              {/* TIMELINE COLUMN */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 48, flexShrink: 0 }}>
                {/* Circle */}
                <button
                  onClick={() => handleOpen(s)}
                  style={{
                    width: 44, height: 44,
                    borderRadius: "50%",
                    border: "none",
                    background: done ? "var(--navy)" : "var(--card)",
                    boxShadow: done ? "0 4px 12px rgba(19,41,75,.3)" : "0 0 0 2px var(--line)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", flexShrink: 0, transition: "all .2s ease",
                    color: done ? "#fff" : "var(--navy-300)",
                  }}
                  aria-label={s.title}
                >
                  {done
                    ? <Icons.check width={20} height={20} />
                    : <span style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 16 }}>{i + 1}</span>}
                </button>
                {/* Line */}
                {!isLast && (
                  <div style={{
                    width: 2, flex: 1, minHeight: 24,
                    background: done ? "var(--navy)" : "var(--line)",
                    transition: "background .4s ease",
                    margin: "4px 0",
                  }} />
                )}
              </div>

              {/* CARD */}
              <div style={{ flex: 1, paddingLeft: 14, paddingBottom: isLast ? 0 : 16 }}>
                <button
                  onClick={() => handleOpen(s)}
                  style={{
                    width: "100%", textAlign: "left",
                    background: done ? "var(--navy)" : "var(--card)",
                    border: "none",
                    borderRadius: 18,
                    padding: "16px 18px",
                    boxShadow: done ? "0 4px 16px rgba(19,41,75,.2)" : "var(--shadow-sm)",
                    cursor: "pointer", fontFamily: "inherit",
                    transition: "all .2s ease",
                    display: "flex", alignItems: "center", gap: 14,
                    marginBottom: isLast ? 0 : 0,
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 13, flexShrink: 0,
                    background: done ? "rgba(255,255,255,.15)" : "var(--accent-soft)",
                    color: done ? "#fff" : "var(--navy)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: 11,
                  }}>
                    <SectionIcon id={s.id} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: "'Nunito'", fontWeight: 800,
                      fontSize: "calc(16px*var(--scale))", lineHeight: 1.2,
                      color: done ? "#fff" : "var(--navy)", marginBottom: 3,
                    }}>{s.title}</div>
                    <div style={{
                      fontSize: "calc(13px*var(--scale))",
                      color: done ? "rgba(255,255,255,.75)" : "var(--muted)",
                      lineHeight: 1.3,
                    }}>{s.sub}</div>
                  </div>
                  <div style={{ color: done ? "rgba(255,255,255,.6)" : "var(--navy-300)", flexShrink: 0 }}>
                    <Icons.chevron width={20} height={20} />
                  </div>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
