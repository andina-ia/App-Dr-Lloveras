"use client";
import { useEffect, useState, useRef } from "react";
import { upload } from "@vercel/blob/client";
import { sections } from "@/lib/content";
import { ContentMap, SectionContent } from "@/lib/storage";

const SECTION_LABELS: Record<string, string> = {
  pasos: "Pasos a seguir",
  lente: "Cómo elegir tu lente",
  pre: "Indicaciones pre quirúrgicas",
  post: "Indicaciones post quirúrgicas",
};

function SectionUploader({
  sectionId,
  content,
  password,
  onUpdated,
}: {
  sectionId: string;
  content: SectionContent;
  password: string;
  onUpdated: (id: string, data: SectionContent) => void;
}) {
  const videoRef = useRef<HTMLInputElement>(null);
  const pdfRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  async function handleUploadFile(type: "video" | "pdf") {
    const ref = type === "video" ? videoRef : pdfRef;
    const file = ref.current?.files?.[0];
    if (!file) return;

    setLoading(l => ({ ...l, [type]: true }));
    setStatus(s => ({ ...s, [type]: "Subiendo…" }));

    try {
      const blob = await upload(
        `lloveras/${sectionId}-${type}-${Date.now()}-${file.name}`,
        file,
        { access: "public", handleUploadUrl: "/api/upload" }
      );

      const newContent: SectionContent = {
        ...content,
        [type === "video" ? "videoUrl" : "pdfUrl"]: blob.url,
        updatedAt: new Date().toISOString(),
      };

      // Save to content map
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({ [sectionId]: newContent }),
      });

      if (res.ok) {
        onUpdated(sectionId, newContent);
        setStatus(s => ({ ...s, [type]: "✓ Subido correctamente" }));
      } else {
        setStatus(s => ({ ...s, [type]: "Error al guardar" }));
      }
    } catch (e) {
      setStatus(s => ({ ...s, [type]: "Error al subir" }));
    } finally {
      setLoading(l => ({ ...l, [type]: false }));
    }
  }

  return (
    <div className="admin-section">
      <div className="admin-section-title">{SECTION_LABELS[sectionId]}</div>

      <div className="upload-row">
        <label className="upload-label">Video (.mp4)</label>
        <input ref={videoRef} type="file" accept="video/mp4,video/quicktime" className="upload-input" />
        {content.videoUrl && (
          <div className="upload-current">
            Actual: <a href={content.videoUrl} target="_blank" rel="noreferrer">ver video</a>
            {content.updatedAt && ` · ${new Date(content.updatedAt).toLocaleDateString("es-AR")}`}
          </div>
        )}
        <button className="upload-btn" disabled={loading.video} onClick={() => handleUploadFile("video")}>
          {loading.video ? "Subiendo…" : "Subir video"}
        </button>
        {status.video && <div className={"upload-msg" + (status.video.startsWith("✓") ? " ok" : " err")}>{status.video}</div>}
      </div>

      <div className="upload-row">
        <label className="upload-label">PDF</label>
        <input ref={pdfRef} type="file" accept="application/pdf" className="upload-input" />
        {content.pdfUrl && (
          <div className="upload-current">
            Actual: <a href={content.pdfUrl} target="_blank" rel="noreferrer">ver PDF</a>
            {content.updatedAt && ` · ${new Date(content.updatedAt).toLocaleDateString("es-AR")}`}
          </div>
        )}
        <button className="upload-btn" disabled={loading.pdf} onClick={() => handleUploadFile("pdf")}>
          {loading.pdf ? "Subiendo…" : "Subir PDF"}
        </button>
        {status.pdf && <div className={"upload-msg" + (status.pdf.startsWith("✓") ? " ok" : " err")}>{status.pdf}</div>}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    const res = await fetch("/api/content", {
      headers: { "x-admin-password": password },
    });
    if (res.ok) {
      const data = await res.json();
      setContent(data);
      setAuthed(true);
    } else {
      setAuthError("Contraseña incorrecta");
    }
    setLoading(false);
  }

  function handleUpdated(id: string, data: SectionContent) {
    setContent(c => ({ ...c, [id]: data }));
  }

  if (!authed) {
    return (
      <div className="admin-wrap">
        <h1 className="admin-h1">Panel administrativo</h1>
        <p className="admin-sub">App Dr. Marcelo Lloveras — Ingresá la contraseña para acceder.</p>
        <div className="admin-section">
          <div className="upload-row">
            <label className="upload-label">Contraseña</label>
            <input
              type="password"
              className="upload-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              style={{ borderStyle: "solid" }}
            />
            {authError && <div className="upload-msg err">{authError}</div>}
            <button className="upload-btn" disabled={loading} onClick={handleLogin}>
              {loading ? "Verificando…" : "Ingresar"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-wrap">
      <h1 className="admin-h1">Panel administrativo</h1>
      <p className="admin-sub">Subí los videos y PDFs de cada sección. Los cambios se reflejan en la app en segundos.</p>
      {sections.map(s => (
        <SectionUploader
          key={s.id}
          sectionId={s.id}
          content={content[s.id] || {}}
          password={password}
          onUpdated={handleUpdated}
        />
      ))}
    </div>
  );
}
