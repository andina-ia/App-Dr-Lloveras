import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

export const Icons = {
  steps: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 20h4v-4H3zM10 20h4v-9h-4zM17 20h4V7h-4z"/>
    </svg>
  ),
  clipboard: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9 3h6a1 1 0 0 1 1 1v1h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2V4a1 1 0 0 1 1-1Z"/>
      <path d="M9 5h6"/><path d="M8.5 12.5l1.5 1.5 3-3"/><path d="M13 18h3"/>
    </svg>
  ),
  eye: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  chevron: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9 6l6 6-6 6"/>
    </svg>
  ),
  back: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M15 6l-6 6 6 6"/>
    </svg>
  ),
  play: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M8 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 8 5.5Z"/></svg>
  ),
  pdf: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h4"/>
    </svg>
  ),
  download: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 4v11"/><path d="M8 11l4 4 4-4"/><path d="M5 19h14"/>
    </svg>
  ),
  whatsapp: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.8.7.8-2.7-.2-.3a8.2 8.2 0 1 1 6.7 3.7Zm4.5-6.1c-.2-.1-1.4-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.5a1.8 1.8 0 0 0 .3-.4.5.5 0 0 0 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c.6.3 1.1.4 1.5.5a3.6 3.6 0 0 0 1.6.1 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"/>
    </svg>
  ),
  check: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12.5l4.5 4.5L19 7"/>
    </svg>
  ),
  lens: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 4c4 0 8 3.6 8 8s-4 8-8 8c-2.4 0-4-2-4-8s1.6-8 4-8Z"/>
      <path d="M12 4c-1.4 1.8-2 4.6-2 8s.6 6.2 2 8"/>
      <path d="M15.5 8.2a4 4 0 0 1 0 7.6"/>
    </svg>
  ),
  plus: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...p}>
      <path d="M12 6v12M6 12h12"/>
    </svg>
  ),
  expand: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M8 3H4a1 1 0 0 0-1 1v4M16 3h4a1 1 0 0 1 1 1v4M8 21H4a1 1 0 0 1-1-1v-4M16 21h4a1 1 0 0 0 1-1v-4"/>
    </svg>
  ),
};

export function AvatarMark({ size = 92 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 92 92" fill="none">
      <circle cx="46" cy="46" r="46" fill="rgba(255,255,255,0.14)"/>
      <circle cx="46" cy="46" r="35" fill="rgba(255,255,255,0.10)"/>
      <circle cx="46" cy="38" r="13" fill="rgba(255,255,255,0.92)"/>
      <path d="M24 70a22 18 0 0 1 44 0Z" fill="rgba(255,255,255,0.92)"/>
    </svg>
  );
}

export function EyeLogo({ size = 76 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" aria-label="Logo">
      <defs>
        <linearGradient id="eyeIris" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5FE0DA"/>
          <stop offset="1" stopColor="#1FA8C4"/>
        </linearGradient>
      </defs>
      <circle cx="48" cy="48" r="46" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.30)" strokeWidth="1.5"/>
      <path d="M14 48 C30 26, 66 26, 82 48 C66 70, 30 70, 14 48 Z" fill="rgba(255,255,255,0.97)"/>
      <circle cx="48" cy="48" r="17" fill="url(#eyeIris)"/>
      <circle cx="48" cy="48" r="17" fill="none" stroke="#0E5AA7" strokeWidth="2" opacity="0.5"/>
      <circle cx="48" cy="48" r="7.5" fill="#0B2547"/>
      <circle cx="42.5" cy="42.5" r="3.2" fill="#fff"/>
      <path d="M14 48 C30 26, 66 26, 82 48 C66 70, 30 70, 14 48 Z" fill="none" stroke="#15406E" strokeWidth="2.4" strokeLinejoin="round" opacity="0.18"/>
    </svg>
  );
}

export function SectionIcon({ id }: { id: string }) {
  const map: Record<string, (p: IconProps) => React.JSX.Element> = {
    pasos: Icons.steps,
    lente: Icons.lens,
    pre: Icons.clipboard,
    post: Icons.eye,
  };
  const I = map[id] || Icons.eye;
  return <I width="100%" height="100%" />;
}
