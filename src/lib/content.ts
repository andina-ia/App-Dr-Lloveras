export type SectionId = "pasos" | "lente" | "pre" | "post";
export type IconId = "steps" | "lens" | "clipboard" | "eye";
export type SummaryKind = "steps" | "check";

export type SummaryItem = { h: string; t: string };
export type FaqItem = { q: string; a: string };

export type Section = {
  id: SectionId;
  icon: IconId;
  title: string;
  sub: string;
  detailTitle: string;
  videoIntro: string;
  pdfName: string;
  pdfMeta: string;
  summaryTitle: string;
  summaryKind: SummaryKind;
  summary: SummaryItem[];
  faq: FaqItem[];
  videoUrl?: string;
  pdfUrl?: string;
};

export type Brand = { name: string; specialty: string; greeting: string; intro: string };
export type Contact = { label: string; sub: string; note: string; phone: string };

export const brand: Brand = {
  name: "Dr. Marcelo Lloveras",
  specialty: "Oftalmólogo",
  greeting: "Hola, bienvenido/a",
  intro: "Estás en buenas manos. Mirá los videos y descargá las indicaciones cuando las necesites.",
};

export const contact: Contact = {
  label: "Escribir al consultorio",
  sub: "WhatsApp · Lun a Vie, 9 a 18 h",
  note: "Ante cualquier molestia o duda, escribinos. Te respondemos a la brevedad.",
  phone: process.env.NEXT_PUBLIC_WHATSAPP || "5491100000000",
};

export const sections: Section[] = [
  {
    id: "pasos", icon: "steps",
    title: "Pasos a seguir", sub: "El camino de tu cirugía, paso a paso",
    detailTitle: "Pasos de tu cirugía de cataratas",
    videoIntro: "El Dr. Lloveras te explica, en pocos minutos, cómo será todo el proceso de principio a fin.",
    pdfName: "Pasos-cirugia-de-cataratas.pdf", pdfMeta: "PDF · 3 páginas",
    summaryTitle: "Las 4 etapas", summaryKind: "steps",
    summary: [
      { h: "Consulta y estudios previos", t: "Evaluamos tu vista y pedimos los estudios necesarios para planificar la cirugía." },
      { h: "Preparación los días previos", t: "Recibís las indicaciones pre quirúrgicas: gotas, ayuno y qué llevar el día de la operación." },
      { h: "Día de la cirugía", t: "Es ambulatoria y dura pocos minutos. Volvés a casa el mismo día acompañado/a." },
      { h: "Recuperación y controles", t: "Seguís las indicaciones post quirúrgicas y venís a los controles programados." },
    ],
    faq: [
      { q: "¿Cuánto dura la cirugía?", a: "La cirugía en sí suele durar entre 15 y 30 minutos. El día completo en el centro es de unas pocas horas." },
      { q: "¿Tengo que quedarme internado/a?", a: "No. Es una cirugía ambulatoria: el mismo día volvés a tu casa, siempre acompañado/a." },
      { q: "¿Voy a sentir dolor?", a: "No. Se realiza con anestesia local en gotas. Podés sentir presión leve, pero no dolor." },
    ],
  },
  {
    id: "lente", icon: "lens",
    title: "Cómo elegir tu lente", sub: "Qué lente intraocular te conviene",
    detailTitle: "Elegir tu lente para la cirugía",
    videoIntro: "Durante la cirugía reemplazamos el cristalino opaco por un lente intraocular. El Dr. Lloveras te explica los tipos de lente y cómo elegir el que mejor se adapta a tu vida.",
    pdfName: "Como-elegir-tu-lente.pdf", pdfMeta: "PDF · 2 páginas",
    summaryTitle: "Tipos de lente", summaryKind: "check",
    summary: [
      { h: "Lente monofocal", t: "Da una visión nítida a una sola distancia (en general de lejos). Es posible que necesites anteojos para leer de cerca." },
      { h: "Lente multifocal", t: "Ofrece visión de lejos y de cerca, con menos dependencia de los anteojos. Requiere un período de adaptación." },
      { h: "Lente tórico", t: "Corrige el astigmatismo además de la catarata. Puede ser monofocal o multifocal." },
      { h: "Tu estilo de vida manda", t: "La mejor elección depende de tu trabajo, tus hobbies y cuánto querés depender de los anteojos. Lo definimos juntos en la consulta." },
    ],
    faq: [
      { q: "¿Cuál es el mejor lente?", a: "No hay uno mejor para todos: el ideal es el que se adapta a tu vista y a tu vida. En la consulta evaluamos tu caso y te recomendamos." },
      { q: "¿La obra social cubre todos los lentes?", a: "La cobertura varía según el tipo de lente y tu cobertura. Te informamos las opciones y los costos antes de decidir." },
      { q: "¿Puedo cambiar el lente después?", a: "El lente intraocular es permanente. Por eso es importante elegir bien antes de la cirugía; te acompañamos en esa decisión." },
    ],
  },
  {
    id: "pre", icon: "clipboard",
    title: "Indicaciones pre quirúrgicas", sub: "Qué hacer antes de la cirugía",
    detailTitle: "Antes de tu cirugía",
    videoIntro: "Mirá este video para preparar todo con tranquilidad los días previos a la operación.",
    pdfName: "Indicaciones-prequirurgicas.pdf", pdfMeta: "PDF · 2 páginas",
    summaryTitle: "Recordá", summaryKind: "check",
    summary: [
      { h: "Colocá las gotas indicadas", t: "Comenzá con las gotas en los días y horarios que te indicamos." },
      { h: "Respetá el ayuno", t: "No comas ni tomes líquidos en las horas previas que figuran en tu indicación." },
      { h: "Vení acompañado/a", t: "No vas a poder manejar. Coordiná con alguien que te lleve y te traiga." },
      { h: "Avisá tu medicación", t: "Contanos qué medicamentos tomás; te diremos cuáles continuar o suspender." },
    ],
    faq: [
      { q: "¿Puedo tomar mis remedios habituales?", a: "En general sí, pero algunos se suspenden. Seguí siempre la indicación que te dimos en la consulta." },
      { q: "¿Puedo desayunar ese día?", a: "Depende del horario de tu cirugía. Respetá el ayuno indicado en tu hoja de indicaciones." },
    ],
  },
  {
    id: "post", icon: "eye",
    title: "Indicaciones post quirúrgicas", sub: "Cuidados después de la cirugía",
    detailTitle: "Después de tu cirugía",
    videoIntro: "Estos cuidados te ayudan a recuperarte rápido y bien. Vemos juntos qué hacer en casa.",
    pdfName: "Indicaciones-postquirurgicas.pdf", pdfMeta: "PDF · 2 páginas",
    summaryTitle: "Cuidados en casa", summaryKind: "check",
    summary: [
      { h: "Usá las gotas indicadas", t: "Cumplí con los horarios de cada gota para una buena cicatrización." },
      { h: "No te frotes el ojo", t: "Evitá tocarlo o frotarlo. Usá el protector ocular para dormir los primeros días." },
      { h: "Cuidá los esfuerzos", t: "Evitá levantar peso, agacharte de golpe y el contacto con agua o polvo." },
      { h: "Vení a los controles", t: "Los controles nos permiten asegurarnos de que todo evoluciona bien." },
    ],
    faq: [
      { q: "¿Cuándo voy a ver bien?", a: "La visión mejora en los primeros días y se va estabilizando en las semanas siguientes." },
      { q: "¿Puedo mirar el celular o la tele?", a: "Sí, con moderación y descansos. No daña tu ojo operado." },
      { q: "¿Y si siento molestias?", a: "Una molestia leve es normal. Si tenés dolor fuerte, mucho enrojecimiento o pérdida de visión, escribinos enseguida." },
    ],
  },
];
