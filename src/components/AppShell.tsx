"use client";
import { useState } from "react";
import { Section, sections as allSections } from "@/lib/content";
import { Cover } from "./Cover";
import { Home } from "./Home";
import { Detail } from "./Detail";

type Screen = "cover" | "home" | "detail";
type Scale = 1 | 1.12 | 1.26;

export function AppShell({ sections }: { sections: Section[] }) {
  const [screen, setScreen] = useState<Screen>("cover");
  const [current, setCurrent] = useState<Section>(sections[0]);
  const [scale, setScale] = useState<Scale>(1);

  const scales: Scale[] = [1, 1.12, 1.26];
  const scaleLabels = ["A", "A+", "A++"];

  function openSection(s: Section) {
    setCurrent(s);
    setScreen("detail");
  }

  return (
    <div style={{ "--scale": scale } as React.CSSProperties}>
      {screen === "cover" && <Cover onEnter={() => setScreen("home")} />}
      {screen === "home" && (
        <Home
          sections={sections}
          layout="stacked"
          onOpen={openSection}
          onBack={() => setScreen("cover")}
        />
      )}
      {screen === "detail" && (
        <Detail
          section={current}
          sections={sections}
          onBack={() => setScreen("home")}
          onSelect={openSection}
        />
      )}

      {/* Accessibility bar */}
      <div className="a11y-bar">
        {scales.map((s, i) => (
          <button
            key={s}
            className={"a11y-btn" + (scale === s ? " active" : "")}
            onClick={() => setScale(s)}
            aria-label={`Tamaño de texto ${scaleLabels[i]}`}
          >
            {scaleLabels[i]}
          </button>
        ))}
      </div>
    </div>
  );
}
