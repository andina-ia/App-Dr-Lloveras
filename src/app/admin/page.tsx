"use client";
import { useEffect, useState, useRef } from "react";
import { sections } from "@/lib/content";
import { ContentMap, SectionContent } from "@/lib/storage";

const SECTION_LABELS: Record<string, string> = {
  pasos: "Pasos a seguir",
  lente: "Cómo elegir tu lente",
  preq: "Indicaciones antes de la cirugía",
  pre: "Indicaciones a partir del primer control",
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
    setStatus(s => ({ ...s, [type]: "Subiendo archivo…" }));

    try {
      const blobPath = `lloveras/${sectionId}-${type}-${Date.now()}-${file.name}`;

      setStatus(s => ({ ...s, [type]: "Subiendo…" }));

      const formData = new FormData();
      formData.append("file", file);
      formData.append("path", blobPath);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "x-admin-password": password },
        body: formData,
      });

      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        throw new Error(err.error || "Error al subir");
      }

      const { url } = await uploadRes.json();

      const newContent: SectionContent = {
        ...content,
        [type === "video" ? "videoUrl" : "pdfUrl"]: url,
        updatedAt: new Date().toISOString(),
      };

      setStatus(s => ({ ...s, [type]: "Guardando…" }));

      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({ [sectionId]: newContent }),
      });

      if (res.ok) {
        onUpdated(sectionId, newContent);
        setStatus(s => ({ ...s, [type]: "✓ Guardado correctamente" }));
        // Reset input
        if (ref.current) ref.current.value = "";
      } else {
        setStatus(s => ({ ...s, [type]: "✗ Error al guardar" }));
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setStatus(s => ({ ...s, [type]: `✗ ${msg}` }));
    } finally {
      setLoading(l => ({ ...l, [type]: false }));
    }
  }

  async function handleDelete(type: "video" | "pdf") {
    const key = type === "video" ? "videoUrl" : "pdfUrl";
    const newContent: SectionContent = { ...content };
    delete newContent[key];
    newContent.updatedAt = new Date().toISOString();

    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ [sectionId]: newContent }),
    });

    if (res.ok) {
      onUpdated(sectionId, newContent);
      setStatus(s => ({ ...s, [type]: "✓ Eliminado" }));
    }
  }

  return (
    <div style={styles.section}>
      <div style={styles.sectionTitle}>
        <span style={styles.sectionNum}>{Object.keys(SECTION_LABELS).indexOf(sectionId) + 1}</span>
        {SECTION_LABELS[sectionId]}
      </div>

      {/* VIDEO */}
      <div style={styles.field}>
        <label style={styles.label}>🎬 Video (.mp4)</label>
        {content.videoUrl && (
          <div style={styles.currentFile}>
            <span>✓ Video cargado</span>
            <div style={{ display: "flex", gap: 8 }}>
              <a href={content.videoUrl} target="_blank" rel="noreferrer" style={styles.linkBtn}>Ver</a>
              <button style={styles.deleteBtn} onClick={() => handleDelete("video")}>Eliminar</button>
            </div>
          </div>
        )}
        <div style={styles.uploadRow}>
          <input ref={videoRef} type="file" accept="video/mp4,video/quicktime,video/mov,.mov,.mp4" style={styles.fileInput} />
          <button
            style={{ ...styles.uploadBtn, ...(loading.video ? styles.uploadBtnDisabled : {}) }}
            disabled={loading.video}
            onClick={() => handleUploadFile("video")}
          >
            {loading.video ? "Subiendo…" : content.videoUrl ? "Reemplazar video" : "Subir video"}
          </button>
        </div>
        {status.video && (
          <div style={{ ...styles.msg, ...(status.video.startsWith("✓") ? styles.msgOk : status.video.startsWith("✗") ? styles.msgErr : styles.msgInfo) }}>
            {status.video}
          </div>
        )}
      </div>

      {/* PDF */}
      <div style={styles.field}>
        <label style={styles.label}>📄 PDF de indicaciones</label>
        {content.pdfUrl && (
          <div style={styles.currentFile}>
            <span>✓ PDF cargado</span>
            <div style={{ display: "flex", gap: 8 }}>
              <a href={content.pdfUrl} target="_blank" rel="noreferrer" style={styles.linkBtn}>Ver</a>
              <button style={styles.deleteBtn} onClick={() => handleDelete("pdf")}>Eliminar</button>
            </div>
          </div>
        )}
        <div style={styles.uploadRow}>
          <input ref={pdfRef} type="file" accept="application/pdf" style={styles.fileInput} />
          <button
            style={{ ...styles.uploadBtn, ...(loading.pdf ? styles.uploadBtnDisabled : {}) }}
            disabled={loading.pdf}
            onClick={() => handleUploadFile("pdf")}
          >
            {loading.pdf ? "Subiendo…" : content.pdfUrl ? "Reemplazar PDF" : "Subir PDF"}
          </button>
        </div>
        {status.pdf && (
          <div style={{ ...styles.msg, ...(status.pdf.startsWith("✓") ? styles.msgOk : status.pdf.startsWith("✗") ? styles.msgErr : styles.msgInfo) }}>
            {status.pdf}
          </div>
        )}
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
  const [saveStatus, setSaveStatus] = useState("");

  async function handleLogin() {
    setLoading(true);
    setAuthError("");
    try {
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
    } catch {
      setAuthError("Error de conexión");
    }
    setLoading(false);
  }

  function handleUpdated(id: string, data: SectionContent) {
    setContent(c => ({ ...c, [id]: data }));
  }

  async function handleSaveAll() {
    setSaveStatus("Guardando todos los cambios…");
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setSaveStatus("✓ Todos los cambios guardados. La app se actualiza en ~60 segundos.");
      } else {
        setSaveStatus("✗ Error al guardar");
      }
    } catch {
      setSaveStatus("✗ Error de conexión");
    }
    setTimeout(() => setSaveStatus(""), 5000);
  }

  if (!authed) {
    return (
      <div style={styles.wrap}>
        <div style={styles.loginBox}>
          <div style={styles.logo}>👁</div>
          <h1 style={styles.h1}>Panel administrativo</h1>
          <p style={styles.sub}>App Dr. Marcelo Lloveras</p>
          <input
            type="password"
            placeholder="Contraseña"
            style={styles.pwdInput}
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
          {authError && <div style={styles.msgErr}>{authError}</div>}
          <button style={styles.loginBtn} disabled={loading} onClick={handleLogin}>
            {loading ? "Verificando…" : "Ingresar"}
          </button>
        </div>
      </div>
    );
  }

  const totalVideos = sections.filter(s => content[s.id]?.videoUrl).length;
  const totalPdfs = sections.filter(s => content[s.id]?.pdfUrl).length;

  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.h1}>Panel administrativo</h1>
          <p style={styles.sub}>App Dr. Marcelo Lloveras · Subí o reemplazá los archivos de cada sección</p>
        </div>
        <div style={styles.stats}>
          <span style={styles.stat}>🎬 {totalVideos}/4 videos</span>
          <span style={styles.stat}>📄 {totalPdfs}/4 PDFs</span>
        </div>
      </div>

      {sections.map(s => (
        <SectionUploader
          key={s.id}
          sectionId={s.id}
          content={content[s.id] || {}}
          password={password}
          onUpdated={handleUpdated}
        />
      ))}

      {/* GUARDAR TODO */}
      <div style={styles.saveBar}>
        <div>
          <div style={styles.saveBarTitle}>¿Listo?</div>
          <div style={styles.saveBarSub}>Guardá todos los cambios para que se reflejen en la app.</div>
          {saveStatus && (
            <div style={{ ...styles.msg, ...(saveStatus.startsWith("✓") ? styles.msgOk : saveStatus.startsWith("✗") ? styles.msgErr : styles.msgInfo), marginTop: 8 }}>
              {saveStatus}
            </div>
          )}
        </div>
        <button style={styles.saveBtn} onClick={handleSaveAll}>
          Guardar y publicar
        </button>
      </div>

      <div style={styles.footer}>
        La app actualiza los contenidos automáticamente en ~60 segundos después de guardar.
      </div>
    </div>
  );
}

// ── Inline styles ──────────────────────────────────────────────────────
const navy = "#13294B";
const paper = "#F4F2EC";
const card = "#ffffff";
const muted = "#5B6472";
const green = "#1F8A5B";
const red = "#C0392B";
const line = "#E7E3D8";

const styles: Record<string, React.CSSProperties> = {
  wrap: { minHeight: "100vh", background: paper, padding: "0 0 60px", fontFamily: "'Nunito Sans', system-ui, sans-serif" },
  loginBox: { maxWidth: 400, margin: "0 auto", padding: "80px 24px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 },
  logo: { fontSize: 52, lineHeight: 1 },
  header: { maxWidth: 640, margin: "0 auto", padding: "48px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" },
  h1: { fontFamily: "'Nunito', system-ui", fontWeight: 900, fontSize: 26, color: navy, margin: "0 0 4px" },
  sub: { color: muted, fontSize: 14, margin: 0 },
  stats: { display: "flex", gap: 10, flexWrap: "wrap" },
  stat: { background: card, border: `1px solid ${line}`, borderRadius: 10, padding: "6px 12px", fontSize: 13, color: navy, fontWeight: 700, fontFamily: "'Nunito'" },
  section: { maxWidth: 640, margin: "20px auto 0", background: card, borderRadius: 20, padding: "22px 22px 18px", boxShadow: "0 1px 2px rgba(19,41,75,.05), 0 6px 20px rgba(19,41,75,.07)" },
  sectionTitle: { fontFamily: "'Nunito', system-ui", fontWeight: 800, fontSize: 17, color: navy, marginBottom: 18, display: "flex", alignItems: "center", gap: 10 },
  sectionNum: { width: 28, height: 28, borderRadius: 8, background: "#EAF0F9", color: navy, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, fontFamily: "'Nunito'" } as React.CSSProperties,
  field: { marginBottom: 18 },
  label: { display: "block", fontWeight: 700, fontSize: 14, color: navy, marginBottom: 8 },
  currentFile: { display: "flex", alignItems: "center", justifyContent: "space-between", background: "#F1F8F4", border: "1px solid #B8DFC8", borderRadius: 10, padding: "8px 12px", fontSize: 13, color: green, fontWeight: 700, marginBottom: 8 },
  linkBtn: { color: navy, fontSize: 13, fontWeight: 700, textDecoration: "none", background: "#EAF0F9", padding: "4px 10px", borderRadius: 7 },
  deleteBtn: { color: red, fontSize: 13, fontWeight: 700, background: "#FDECEA", border: "none", cursor: "pointer", padding: "4px 10px", borderRadius: 7 },
  uploadRow: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" as const },
  fileInput: { flex: 1, minWidth: 0, padding: "9px 12px", border: `1.5px dashed ${navy}`, borderRadius: 10, background: paper, fontSize: 13, fontFamily: "inherit", cursor: "pointer" },
  uploadBtn: { flexShrink: 0, appearance: "none" as const, border: "none", cursor: "pointer", background: navy, color: "#fff", fontFamily: "'Nunito', system-ui", fontWeight: 800, fontSize: 14, padding: "10px 18px", borderRadius: 10 },
  uploadBtnDisabled: { opacity: 0.5, cursor: "not-allowed" },
  msg: { fontSize: 13, marginTop: 6, padding: "6px 10px", borderRadius: 8 },
  msgOk: { background: "#F1F8F4", color: green },
  msgErr: { background: "#FDECEA", color: red },
  msgInfo: { background: "#EAF0F9", color: navy },
  saveBar: { maxWidth: 640, margin: "28px auto 0", background: navy, borderRadius: 20, padding: "22px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" as const },
  saveBarTitle: { fontFamily: "'Nunito', system-ui", fontWeight: 800, fontSize: 17, color: "#fff", marginBottom: 3 },
  saveBarSub: { fontSize: 13, color: "rgba(255,255,255,.75)" },
  saveBtn: { flexShrink: 0, appearance: "none" as const, border: "none", cursor: "pointer", background: "#fff", color: navy, fontFamily: "'Nunito', system-ui", fontWeight: 800, fontSize: 15, padding: "14px 24px", borderRadius: 13, whiteSpace: "nowrap" as const },
  pwdInput: { width: "100%", padding: "12px 14px", border: `1.5px solid ${line}`, borderRadius: 12, fontSize: 16, fontFamily: "inherit", outline: "none", boxSizing: "border-box" as const },
  loginBtn: { width: "100%", appearance: "none" as const, border: "none", cursor: "pointer", background: navy, color: "#fff", fontFamily: "'Nunito', system-ui", fontWeight: 800, fontSize: 16, padding: "14px 24px", borderRadius: 13 },
  footer: { maxWidth: 640, margin: "16px auto 0", textAlign: "center" as const, fontSize: 12, color: muted },
};
