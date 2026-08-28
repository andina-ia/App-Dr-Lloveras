"use client";
import { useRef, useEffect, useState } from "react";
import { Section, contact } from "@/lib/content";
import { Icons, AvatarMark, SectionIcon } from "./Icons";

// ── Lens Selector (sección lente) ──────────────────
const RESULT_TEXTS: Record<string, string> = {
  "lejos-no-poco": "Para vos, el lente Monofocal es una excelente opción: verás de lejos sin anteojos y el costo es menor.",
  "lejos-no-mucho": "El EDOF te da lejos e intermedia (TV, pantallas) sin anteojos. Buena relación entre independencia y adaptación.",
  "lejos-si-poco": "El Monofocal Tórico corrige tu astigmatismo y te da visión nítida de lejos. Seguirás usando anteojos para cerca.",
  "lejos-si-mucho": "El EDOF Tórico o Trifocal Tórico corrige el astigmatismo y te da mayor independencia. Lo definimos en consulta.",
  "cerca-no-poco": "El Monofocal ajustado para cerca es una opción. También podemos evaluar trifocal según tu caso.",
  "cerca-no-mucho": "El Trifocal es tu opción: lejos, intermedia y cerca sin anteojos. Requiere un período de adaptación.",
  "cerca-si-poco": "El Tórico corrige el astigmatismo. Si leer es tu prioridad, evaluamos la distancia de foco en consulta.",
  "cerca-si-mucho": "El Trifocal Tórico sería ideal: corrige astigmatismo y te da las tres distancias. Lo evaluamos juntos.",
  "mixto-no-poco": "El EDOF te cubre lejos e intermedia. Para las actividades del hogar y TV vas a estar muy cómodo/a.",
  "mixto-no-mucho": "El EDOF o Trifocal son ideales para distancias mixtas. El trifocal suma la lectura cercana.",
  "mixto-si-poco": "El EDOF Tórico te corrige el astigmatismo y te cubre bien las distancias mixtas.",
  "mixto-si-mucho": "El Trifocal Tórico es la mejor opción para tu perfil. Máxima independencia con corrección de astigmatismo.",
  "todo-no-poco": "El EDOF te da buena cobertura en casi todo. Si te animás a adaptarte, el Trifocal suma la lectura de cerca.",
  "todo-no-mucho": "El Trifocal es tu lente: cubre las tres distancias y minimiza el uso de anteojos.",
  "todo-si-poco": "Con astigmatismo, el EDOF Tórico te da gran cobertura. El Trifocal Tórico suma la lectura cercana.",
  "todo-si-mucho": "El Trifocal Tórico cubre todas las distancias y corrige el astigmatismo. La mejor opción para máxima independencia.",
};

const BEST_MAP: Record<string, string> = {
  "lejos-no-poco": "mono", "lejos-no-mucho": "edof", "lejos-si-poco": "mono-torico", "lejos-si-mucho": "trifocal",
  "cerca-no-poco": "trifocal", "cerca-no-mucho": "trifocal", "cerca-si-poco": "mono-torico", "cerca-si-mucho": "trifocal",
  "mixto-no-poco": "edof", "mixto-no-mucho": "trifocal", "mixto-si-poco": "edof", "mixto-si-mucho": "trifocal",
  "todo-no-poco": "edof", "todo-no-mucho": "trifocal", "todo-si-poco": "edof", "todo-si-mucho": "trifocal",
};

const SHOW_MAP: Record<string, string[]> = {
  "lejos-no-poco": ["mono"], "lejos-no-mucho": ["mono", "edof"], "lejos-si-poco": ["mono-torico"], "lejos-si-mucho": ["mono-torico", "trifocal"],
  "cerca-no-poco": ["mono", "trifocal"], "cerca-no-mucho": ["edof", "trifocal"], "cerca-si-poco": ["mono-torico"], "cerca-si-mucho": ["trifocal"],
  "mixto-no-poco": ["edof", "trifocal"], "mixto-no-mucho": ["edof", "trifocal"], "mixto-si-poco": ["edof"], "mixto-si-mucho": ["trifocal"],
  "todo-no-poco": ["edof", "trifocal"], "todo-no-mucho": ["trifocal"], "todo-si-poco": ["edof", "trifocal"], "todo-si-mucho": ["trifocal"],
};

const SIM_NOTES: Record<string, string> = {
  hoy: "Así se ve actualmente con catarata. La opacidad varía según el grado de avance.",
  mono: "Lejos nítido — para manejar o el televisor sin anteojos. Para leer y pantallas, los anteojos siguen siendo necesarios.",
  edof: "Lejos e intermedia nítidos — manejar, cocinar, computadora. Para leer letra chica puede hacer falta un poco de ayuda.",
  tri: "Las tres distancias nítidas. Máxima independencia. Al principio puede haber algunos halos nocturnos hasta la adaptación.",
};

type LensKey = "mono" | "mono-torico" | "edof" | "trifocal";
type SceneKey = "hoy" | "mono" | "edof" | "tri";

interface LensCard { id: LensKey; name: string; badge: string; badgeStyle: string; icoStyle: string; icoColor: string; distances: [string, string, string]; note: string; pros: string[]; cons: string[]; }

const LENSES: LensCard[] = [
  { id: "mono", name: "Monofocal", badge: "Estándar", badgeStyle: "background:#F0EDE6;color:#5B6472", icoStyle: "background:#E6F1FB", icoColor: "#185FA5",
    distances: ["on", "off", "off"], note: "Visión nítida a una distancia (generalmente de lejos). Para leer, pantallas y distancias intermedias vas a necesitar anteojos.",
    pros: ["Calidad óptica superior, menos aberraciones", "Mejor adaptación a la luz, menos deslumbramiento"], cons: ["Necesitás anteojos para cerca e intermedia"] },
  { id: "mono-torico", name: "Monofocal Tórico", badge: "Astigmatismo", badgeStyle: "background:#E6F1FB;color:#185FA5", icoStyle: "background:#E6F1FB", icoColor: "#185FA5",
    distances: ["on", "off", "off"], note: "Igual que el monofocal pero corrige el astigmatismo. Visión de lejos mucho más nítida si tenés visión borrosa por astigmatismo.",
    pros: ["Corrige astigmatismo además de la catarata", "Calidad óptica superior"], cons: ["Igual necesitás anteojos para cerca"] },
  { id: "edof", name: "EDOF — Rango extendido", badge: "Premium", badgeStyle: "background:#EAF3DE;color:#1F8A5B", icoStyle: "background:#EAF3DE", icoColor: "#3B6D11",
    distances: ["on", "on", "half"], note: "Visión continua de lejos hasta distancia intermedia (pantallas, cocinar). Para leer letra muy chica puede hacer falta anteojos. Menos halos nocturnos que el trifocal.",
    pros: ["Sin anteojos para manejar y pantallas", "Menos halos en ambientes oscuros"], cons: ["Puede necesitar anteojos para letra muy chica"] },
  { id: "trifocal", name: "Trifocal", badge: "Premium", badgeStyle: "background:#EAF3DE;color:#1F8A5B", icoStyle: "background:#FAEEDA", icoColor: "#854F0B",
    distances: ["on", "on", "on"], note: "Las tres distancias nítidas: lejos, intermedia y cerca (40 cm). Máxima independencia de anteojos. Requiere período de adaptación.",
    pros: ["Visión completa en las tres distancias", "Mínima dependencia de anteojos"], cons: ["Puede haber halos o destellos nocturnos al principio"] },
];

function DistPill({ state, label }: { state: string; label: string }) {
  const cls = state === "on" ? "lens-dist on" : state === "half" ? "lens-dist half" : "lens-dist";
  return (
    <span className={cls}>
      <span className="lens-dot">{state === "on" && <Icons.check width={14} height={14} />}</span>
      {label}
    </span>
  );
}

function LensSelector({ section }: { section: Section }) {
  const [ans, setAns] = useState<Record<string, string>>({});
  const [simOpen, setSimOpen] = useState(false);
  const [simScene, setSimScene] = useState<SceneKey>("hoy");

  const q1opts = [
    { v: "lejos", icon: "ti-car", label: "Manejar, deportes, actividades al aire libre", sub: "Ver de lejos es clave" },
    { v: "cerca", icon: "ti-book", label: "Leer, celular, computadora", sub: "Uso intensivo de cerca" },
    { v: "mixto", icon: "ti-tools-kitchen-2", label: "Cocinar, TV, actividades del hogar", sub: "Distancias intermedias" },
    { v: "todo", icon: "ti-device-laptop", label: "Todo por igual", sub: "Quiero máxima independencia" },
  ];
  const q2opts = [
    { v: "si", icon: "ti-check", label: "Sí", sub: "Me lo dijo el médico" },
    { v: "no", icon: "ti-x", label: "No / No sé", sub: "Sin astigmatismo conocido" },
  ];
  const q3opts = [
    { v: "poco", icon: "ti-glasses", label: "No me molesta usarlos", sub: "Estoy acostumbrado/a" },
    { v: "mucho", icon: "ti-glasses-off", label: "Quiero depender lo menos posible", sub: "Prioridad: independencia" },
  ];

  const key = ans.q1 && ans.q2 && ans.q3 ? `${ans.q1}-${ans.q2}-${ans.q3}` : null;
  const best = key ? BEST_MAP[key] : null;
  const show = key ? (SHOW_MAP[key] || []) : null;
  const resultText = key ? RESULT_TEXTS[key] : null;

  const pick = (q: string, v: string) => setAns(prev => ({ ...prev, [q]: v }));

  const sceneLabels: Record<SceneKey, string> = { hoy: "Hoy", mono: "Monofocal", edof: "EDOF", tri: "Trifocal" };
  const sceneImages: Record<SceneKey, string> = {
    hoy: "/scenes/scene-catarata.png", mono: "/scenes/scene-monofocal.png",
    edof: "/scenes/scene-extendida.png", tri: "/scenes/scene.png",
  };
  const sceneBadge: Record<SceneKey, string> = {
    hoy: "Así ves hoy — con catarata", mono: "Monofocal — visión de lejos",
    edof: "EDOF — lejos e intermedia", tri: "Trifocal — las tres distancias",
  };

  return (
    <div>
      <p className="video-caption" style={{ marginTop: 0, marginBottom: 16 }}>{section.videoIntro}</p>

      {/* QUIZ */}
      <div style={{ background: "#fff", borderRadius: 18, padding: 16, marginBottom: 14, border: "1px solid #E7E3D8" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" as const, color: "#5B6472", marginBottom: 10 }}>¿Qué actividades hacés más?</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
          {q1opts.map(o => (
            <button key={o.v} onClick={() => pick("q1", o.v)} style={{
              background: ans.q1 === o.v ? "#EAF0F9" : "#F4F2EC",
              border: `1.5px solid ${ans.q1 === o.v ? "#13294B" : "#E7E3D8"}`,
              borderRadius: 12, padding: "12px 10px", textAlign: "left" as const,
              cursor: "pointer", fontFamily: "inherit", display: "flex",
              flexDirection: "column" as const, gap: 4, width: "100%", minHeight: 72,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#161A20", lineHeight: 1.35 }}>{o.label}</div>
              <div style={{ fontSize: 11, color: "#5B6472", lineHeight: 1.3 }}>{o.sub}</div>
            </button>
          ))}
        </div>
        <div style={{ height: 1, background: "#E7E3D8", margin: "12px 0" }} />
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" as const, color: "#5B6472", marginBottom: 10 }}>¿Tenés astigmatismo diagnosticado?</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
          {q2opts.map(o => (
            <button key={o.v} onClick={() => pick("q2", o.v)} style={{
              background: ans.q2 === o.v ? "#EAF0F9" : "#F4F2EC",
              border: `1.5px solid ${ans.q2 === o.v ? "#13294B" : "#E7E3D8"}`,
              borderRadius: 12, padding: "12px 10px", textAlign: "left" as const,
              cursor: "pointer", fontFamily: "inherit", display: "flex",
              flexDirection: "column" as const, gap: 4, width: "100%", minHeight: 72,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#161A20", lineHeight: 1.35 }}>{o.label}</div>
              <div style={{ fontSize: 11, color: "#5B6472", lineHeight: 1.3 }}>{o.sub}</div>
            </button>
          ))}
        </div>
        <div style={{ height: 1, background: "#E7E3D8", margin: "12px 0" }} />
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" as const, color: "#5B6472", marginBottom: 10 }}>¿Qué tan importante es no usar anteojos?</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {q3opts.map(o => (
            <button key={o.v} onClick={() => pick("q3", o.v)} style={{
              background: ans.q3 === o.v ? "#EAF0F9" : "#F4F2EC",
              border: `1.5px solid ${ans.q3 === o.v ? "#13294B" : "#E7E3D8"}`,
              borderRadius: 12, padding: "12px 10px", textAlign: "left" as const,
              cursor: "pointer", fontFamily: "inherit", display: "flex",
              flexDirection: "column" as const, gap: 4, width: "100%", minHeight: 72,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#161A20", lineHeight: 1.35 }}>{o.label}</div>
              <div style={{ fontSize: 11, color: "#5B6472", lineHeight: 1.3 }}>{o.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* RESULTADO */}
      {resultText && (
        <div style={{ background: "#EAF0F9", borderRadius: 14, padding: "12px 14px", marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" as const, color: "#5B7BAA", marginBottom: 4 }}>Basado en tus respuestas</div>
          <div style={{ fontSize: 13, color: "#13294B", fontWeight: 600, lineHeight: 1.4 }}>{resultText}</div>
        </div>
      )}

      {/* TARJETAS */}
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 10, marginBottom: 16 }}>
        {LENSES.map(l => {
          const isShow = show ? show.includes(l.id) : true;
          const isBest = best === l.id;
          return (
            <div key={l.id} style={{
              background: "#fff", borderRadius: 16, padding: 14,
              border: isBest ? "2px solid #13294B" : "1.5px solid #E7E3D8",
              opacity: show ? (isShow ? 1 : 0.3) : 1,
              transform: show ? (isShow ? "scale(1)" : "scale(0.975)") : "scale(1)",
              transition: "all .2s"
            }}>
              {isBest && <div style={{ display: "inline-block", fontSize: 10, fontWeight: 700, background: "#13294B", color: "#fff", padding: "3px 9px", borderRadius: 6, marginBottom: 8 }}>Recomendado para vos</div>}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, ...JSON.parse(`{"background":"${l.icoStyle.replace("background:", "").trim()}"}`) }}>
                  <Icons.lens width={18} height={18} style={{ color: l.icoColor }} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#161A20", flex: 1 }}>{l.name}</span>
                <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 5, ...Object.fromEntries(l.badgeStyle.split(";").filter(Boolean).map(s => { const [k,v]=s.split(":"); return [k.trim().replace(/-([a-z])/g,(_,c)=>c.toUpperCase()),v.trim()]; })) }}>{l.badge}</span>
              </div>
              <div className="lens-range" style={{ marginBottom: 8 }}>
                <DistPill state={l.distances[0]} label="Lejos" />
                <DistPill state={l.distances[1]} label="Intermedia" />
                <DistPill state={l.distances[2]} label="Cerca" />
              </div>
              <p style={{ fontSize: 12, color: "#5B6472", lineHeight: 1.5, marginBottom: 8 }}>{l.note}</p>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 3 }}>
                {l.pros.map((p, i) => <span key={i} style={{ fontSize: 11, color: "#1F8A5B", display: "flex", alignItems: "flex-start", gap: 4, lineHeight: 1.4 }}><Icons.check width={12} height={12} style={{ flexShrink: 0, marginTop: 2 }} />{p}</span>)}
                {l.cons.map((c, i) => <span key={i} style={{ fontSize: 11, color: "#E65100", display: "flex", alignItems: "flex-start", gap: 4, lineHeight: 1.4 }}><Icons.plus width={12} height={12} style={{ flexShrink: 0, marginTop: 2, transform: "rotate(45deg)" }} />{c}</span>)}
              </div>
            </div>
          );
        })}
      </div>

      {/* TABLA COMPARATIVA */}
      <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #E7E3D8", marginBottom: 8 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", background: "#13294B", padding: "8px 10px" }}>
          {["Tipo de lente", "Cerca 35cm", "Intermedia 60cm", "Lejos 4m+"].map((h, i) => (
            <span key={i} style={{ fontSize: 10, fontWeight: 700, color: i === 0 ? "#fff" : "rgba(255,255,255,.8)", textAlign: i === 0 ? "left" : "center" as const }}>{h}</span>
          ))}
        </div>
        {[
          ["Monofocal", "👓", "👓", "✅"],
          ["Tórico", "👓", "👓", "✅"],
          ["EDOF", "👓/✅", "✅", "✅"],
          ["Trifocal", "✅", "✅", "✅"],
        ].map(([name, ...cells], i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", padding: "8px 10px", borderBottom: i < 3 ? "1px solid #F0EDE6" : "none", background: i % 2 === 0 ? "#FAFAF8" : "#fff", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#161A20" }}>{name}</span>
            {cells.map((c, j) => <span key={j} style={{ textAlign: "center" as const, fontSize: 13 }}>{c}</span>)}
          </div>
        ))}
      </div>
      <p style={{ fontSize: 10, color: "#8D8880", marginBottom: 16 }}>✅ Independencia · 👓 Anteojos recomendados · La experiencia visual varía según cada persona.</p>

      {/* SIMULADOR */}
      <button className="sim-trigger" onClick={() => setSimOpen(o => !o)}>
        <span className="sim-trigger-ico"><Icons.eye width={22} height={22} /></span>
        <span className="sim-trigger-txt">
          <span className="sim-trigger-label">Simulá tu visión con cada lente</span>
          <span className="sim-trigger-sub">Tocá para ver cómo cambia la visión</span>
        </span>
        <Icons.chevron width={20} height={20} style={{ color: "#5B7BAA", transform: simOpen ? "rotate(90deg)" : "none", transition: "transform .2s", flexShrink: 0 }} />
      </button>

      {simOpen && (
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E7E3D8", overflow: "hidden", marginTop: 10 }}>
          <div style={{ background: "#13294B", padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>Simulación visual</span>
            <button onClick={() => setSimOpen(false)} style={{ background: "rgba(255,255,255,.15)", border: "none", color: "#fff", borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontSize: 12 }}>Cerrar</button>
          </div>
          <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
            {(["hoy", "mono", "edof", "tri"] as SceneKey[]).map(k => (
              <div key={k} style={{ position: "absolute", inset: 0, backgroundImage: `url(${sceneImages[k]})`, backgroundSize: "cover", backgroundPosition: "center", opacity: k === simScene ? 1 : 0, transition: "opacity .3s", filter: k === "hoy" ? "blur(4px) brightness(.5) saturate(.3)" : "none" }}>
                <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(12,27,51,.78)", color: "#fff", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 99 }}>{sceneBadge[k]}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid #E7E3D8" }}>
            {(["hoy", "mono", "edof", "tri"] as SceneKey[]).map(k => (
              <button key={k} onClick={() => setSimScene(k)} style={{ background: simScene === k ? "#13294B" : "#fff", border: "none", borderRight: k !== "tri" ? "1px solid #E7E3D8" : "none", padding: "10px 4px", fontSize: 11, fontWeight: 700, color: simScene === k ? "#fff" : "#5B6472", cursor: "pointer", fontFamily: "inherit", textAlign: "center" as const }}>
                {sceneLabels[k]}
              </button>
            ))}
          </div>
          <div style={{ padding: "10px 14px", fontSize: 12, color: "#5B6472", lineHeight: 1.5, borderTop: "1px solid #E7E3D8", background: "#FAFAF8" }}>
            {SIM_NOTES[simScene]}
          </div>
        </div>
      )}

      {/* NOTA */}
      <div style={{ background: "#FFF3E0", borderLeft: "3px solid #E65100", borderRadius: "0 12px 12px 0", padding: "12px 14px", margin: "16px 0" }}>
        <p style={{ fontSize: 12, color: "#5B6472", lineHeight: 1.5 }}><strong style={{ color: "#161A20" }}>Para recordar:</strong> Cada tipo de lente tiene beneficios y limitaciones. La elección ideal depende de tu estilo de vida y la recomendación de tu oftalmólogo. <strong style={{ color: "#161A20" }}>Conversarlo en la consulta es el mejor primer paso.</strong></p>
      </div>
    </div>
  );
}

// ── Video Player ────────────────────────────────────
function VideoPlayer({ section }: { section: Section }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => { setPlaying(false); }, [section.id]);

  useEffect(() => {
    const v = videoRef.current; if (!v) return;
    const onEnd = () => { if (!v.paused) v.pause(); setPlaying(false); };
    v.addEventListener("webkitendfullscreen", onEnd);
    v.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement) onEnd(); });
    return () => v.removeEventListener("webkitendfullscreen", onEnd);
  }, [section.id]);

  if (section.videoUrl) {
    const toggle = () => { const v = videoRef.current; if (!v) return; v.paused ? v.play() : v.pause(); };
    const expand = (e: React.MouseEvent) => {
      e.stopPropagation();
      const v = videoRef.current; if (!v) return;
      type IOSVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };
      const iv = v as IOSVideo;
      if (iv.webkitEnterFullscreen) { v.play(); iv.webkitEnterFullscreen(); }
      else if (v.requestFullscreen) { v.play(); v.requestFullscreen(); }
    };
    return (
      <div className="video-wrap">
        <div className="video real" onClick={toggle}>
          <video ref={videoRef} className="video-el" playsInline preload="auto"
            onEnded={() => setPlaying(false)} onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)}>
            <source src={`/api/media?url=${encodeURIComponent(section.videoUrl.split('?')[0])}`} type="video/mp4" />
          </video>
          <button className="video-expand" aria-label="Pantalla completa" onClick={expand}><Icons.expand width={20} height={20} /></button>
          {!playing && <div className="video-center"><button className="play-btn" aria-label="Reproducir"><Icons.play width={32} height={32} style={{ marginLeft: 4 }} /></button></div>}
          {!playing && <div className="video-foot"><span className="video-foot-name">Dr. Marcelo Lloveras</span><span className="video-foot-hint">Tocá para reproducir</span></div>}
        </div>
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
          <button className="play-btn" aria-label="Reproducir">
            {playing ? <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
              : <Icons.play width={32} height={32} style={{ marginLeft: 4 }} />}
          </button>
        </div>
        {playing && <div className="video-playing-tag">Video próximamente</div>}
        <div className="video-foot"><span className="video-foot-name">Dr. Marcelo Lloveras</span></div>
      </div>
      <p className="video-caption">{section.videoIntro}</p>
    </div>
  );
}

// ── PDF Card ────────────────────────────────────────
function PdfCard({ section }: { section: Section }) {
  const [done, setDone] = useState(false);
  if (section.pdfUrl) {
    // Extraer la URL base sin query params de firma para pasarla al proxy
    const baseUrl = section.pdfUrl.split('?')[0];
    const href = `/api/media?url=${encodeURIComponent(baseUrl)}`;
    return (
      <a className={"pdf-card" + (done ? " done" : "")} href={href} target="_blank" rel="noreferrer" onClick={() => setDone(true)} style={{ textDecoration: "none" }}>
        <span className="pdf-ico"><Icons.pdf width={26} height={26} /></span>
        <span className="pdf-text"><span className="pdf-name">{section.pdfName}</span><span className="pdf-meta">{done ? "Descargado · listo para leer" : section.pdfMeta}</span></span>
        <span className="pdf-action">{done ? <Icons.check width={24} height={24} /> : <Icons.download width={24} height={24} />}</span>
      </a>
    );
  }
  return (
    <button className="pdf-card" disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>
      <span className="pdf-ico"><Icons.pdf width={26} height={26} /></span>
      <span className="pdf-text"><span className="pdf-name">{section.pdfName}</span><span className="pdf-meta">Próximamente</span></span>
      <span className="pdf-action"><Icons.download width={24} height={24} /></span>
    </button>
  );
}

// ── FAQ ─────────────────────────────────────────────
function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(-1);
  return (
    <div className="faq">
      {items.map((it, i) => (
        <div className={"faq-item" + (open === i ? " open" : "")} key={i}>
          <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{it.q}</span><span className="faq-icon"><Icons.plus width={22} height={22} /></span>
          </button>
          <div className="faq-a-wrap"><div className="faq-a">{it.a}</div></div>
        </div>
      ))}
    </div>
  );
}

// ── Summary ─────────────────────────────────────────
function Summary({ section }: { section: Section }) {
  const numbered = section.summaryKind === "steps";
  return (
    <div className="summary">
      {section.summary.map((s, i) => (
        <div className="sum-row" key={i}>
          <span className={"sum-mark" + (numbered ? " num" : "")}>{numbered ? i + 1 : <Icons.check width={18} height={18} />}</span>
          <span className="sum-text"><span className="sum-h">{s.h}</span><span className="sum-t">{s.t}</span></span>
        </div>
      ))}
    </div>
  );
}

// ── Contact ─────────────────────────────────────────
function ContactCard() {
  const wa = "5492645068102";
  return (
    <div className="contact">
      <p className="contact-note">{contact.note}</p>
      <a className="wa-btn" href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer">
        <Icons.whatsapp width={26} height={26} />
        <span className="wa-text"><span className="wa-label">{contact.label}</span><span className="wa-sub">{contact.sub}</span></span>
      </a>
    </div>
  );
}

// ── Sidebar ─────────────────────────────────────────
function Sidebar({ sections, current, onSelect }: { sections: Section[]; current: Section; onSelect: (s: Section) => void }) {
  return (
    <aside className="detail-sidebar">
      <div className="detail-sidebar-title">Secciones</div>
      {sections.map(s => (
        <button key={s.id} className={"detail-sidebar-item" + (s.id === current.id ? " active" : "")} onClick={() => onSelect(s)}>
          <span className="sbi-ico"><SectionIcon id={s.id} /></span>{s.title}
        </button>
      ))}
    </aside>
  );
}

// ── Detail Screen ────────────────────────────────────
export function Detail({ section, sections, onBack, onSelect }: { section: Section; sections: Section[]; onBack: () => void; onSelect: (s: Section) => void }) {
  const bodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = 0; window.scrollTo(0, 0); }, [section.id]);

  return (
    <div className="screen detail fade-enter" ref={bodyRef}>
      <header className="detail-top">
        <button className="back-btn" onClick={onBack}><Icons.back width={24} height={24} /><span>Inicio</span></button>
      </header>
      <div className="sidebar-desktop-only"><Sidebar sections={sections} current={section} onSelect={onSelect} /></div>
      <div className="detail-body">
        <h1 className="detail-title">{section.detailTitle}</h1>
        {section.id === "lente" ? <LensSelector section={section} /> : <VideoPlayer section={section} />}
        {section.id !== "lente" && <><h2 className="block-h">{section.summaryTitle}</h2><Summary section={section} /></>}
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
