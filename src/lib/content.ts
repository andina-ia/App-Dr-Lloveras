export type SectionId = "pasos" | "lente" | "preq" | "pre" | "post";
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
  phone: "2645068102",
};

export const sections: Section[] = [
  {
    id: "pasos",
    icon: "steps",
    videoUrl: "https://4paycditbkbuyusv.private.blob.vercel-storage.com/lloveras/pasos-video-1782391893432-Avatar_3.mp4",
    pdfUrl: "https://4paycditbkbuyusv.private.blob.vercel-storage.com/lloveras/pasos-pdf-1782330217656-Pasos%20a%20seguir.pdf",
    title: "Pasos a seguir",
    sub: "El camino de tu cirugía, paso a paso",
    detailTitle: "Pasos de tu cirugía de cataratas",
    videoIntro: "El Dr. Lloveras te explica, en pocos minutos, cómo será todo el proceso de principio a fin.",
    pdfName: "Pasos-cirugia-de-cataratas.pdf",
    pdfMeta: "PDF · 3 páginas",
    summaryTitle: "Las 4 etapas",
    summaryKind: "steps",
    summary: [
      { h: "Consulta y estudios previos", t: "Evaluamos tu vista y pedimos los estudios necesarios para planificar la cirugía." },
      { h: "Preparación los días previos", t: "Recibís las indicaciones pre quirúrgicas: gotas, ayuno y qué llevar el día de la operación." },
      { h: "Día de la cirugía", t: "Es ambulatoria y dura entre 5 y 15 minutos. Volvés a casa el mismo día." },
      { h: "Recuperación y controles", t: "Seguís las indicaciones post quirúrgicas y venís a los controles programados." },
    ],
    faq: [
      { q: "¿Cómo es el proceso antes de la cirugía?", a: "Primero presentás tu carpeta en Mesa de Entrada, donde te asignan turno para los estudios del ojo. Luego retirás las gotas con la receta, hacés el electrocardiograma y el análisis de sangre, y después volvés al consultorio para elegir el lente." },
      { q: "¿Cómo se asigna el turno de cirugía?", a: "Con todos los estudios listos, acercate al primer piso entre las 8 y las 14 horas para coordinar el día y horario de la operación." },
      { q: "¿Se opera un ojo por vez?", a: "Sí. Se opera un ojo por vez, de forma ambulatoria y con anestesia local en gotas y sedación." },
      { q: "¿Tengo que quedarme internado/a?", a: "No. Es una cirugía ambulatoria: el mismo día volvés a tu casa." },
    ],
  },
  {
    id: "lente",
    icon: "lens",
    title: "Cómo elegir tu lente",
    sub: "Qué lente intraocular te conviene",
    detailTitle: "Elegir tu lente para la cirugía",
    videoIntro: "Durante la cirugía reemplazamos el cristalino opaco por un lente intraocular. El Dr. Lloveras te explica los tipos de lente y cómo elegir el que mejor se adapta a tu vida.",
    pdfName: "Como-elegir-tu-lente.pdf",
    pdfMeta: "PDF · 2 páginas",
    summaryTitle: "Tipos de lente",
    summaryKind: "check",
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
    id: "preq",
    icon: "clipboard",
    title: "Indicaciones antes de la cirugía",
    sub: "Qué hacer antes de operarte",
    detailTitle: "Indicaciones antes de la cirugía",
    videoIntro: "Mirá este video para preparar todo con tranquilidad los días previos a la operación.",
    pdfName: "Indicaciones-prequirurgicas.pdf",
    pdfMeta: "PDF · 2 páginas",
    summaryTitle: "Recordá",
    summaryKind: "check",
    videoUrl: "https://4paycditbkbuyusv.private.blob.vercel-storage.com/pre_cirugia_compressed.mp4",
    pdfUrl: "https://4paycditbkbuyusv.private.blob.vercel-storage.com/lloveras/Indicaciones_Antes_Cirugia.pdf",
    summary: [
      { h: "El día de la cirugía", t: "Llegue puntual. Puede venir acompañado por una sola persona. Traiga sus análisis y electrocardiograma con evaluación de riesgo quirúrgico." },
      { h: "Cuidados de higiene", t: "La noche anterior lávese la cara con jabón de Pervinox o jabón blanco. Acuda sin maquillaje, sin esmalte en las uñas y sin alhajas. Preséntese en ayunas." },
      { h: "Gotas antes de la cirugía", t: "Dos días antes: Quidex, una gota cuatro veces al día en el ojo a operar. Si le indicaron Fotorretin o Tropioftal: una gota cada 15 minutos durante la hora previa." },
      { h: "Gotas después de la cirugía", t: "Continúe con el Quidex cada hora hasta el primer control. No es necesario que se despierte de noche para colocarse las gotas." },
    ],
    faq: [
      { q: "¿Puedo tomar mis remedios habituales?", a: "Sí, tomá la medicación que habitualmente usás con normalidad, salvo que tu médico te indique lo contrario." },
      { q: "¿Tengo que estar en ayunas?", a: "Sí, presentate en ayunas salvo indicación contraria de tu médico." },
      { q: "¿Puedo venir acompañado/a?", a: "Sí, podés venir acompañado por una sola persona." },
      { q: "¿Qué tengo que traer el día de la cirugía?", a: "Tus análisis de laboratorio recientes y el electrocardiograma con evaluación de riesgo quirúrgico. Si te hicieron estudios en la clínica (IOL Master, OCT o recuento endotelial), traélos también." },
    ],
  },
  {
    id: "pre",
    icon: "clipboard",
    videoUrl: "https://4paycditbkbuyusv.private.blob.vercel-storage.com/lloveras/pre-video-1782391558073-Avatar_4.mp4",
    pdfUrl: "https://4paycditbkbuyusv.private.blob.vercel-storage.com/lloveras/pre-pdf-1782330235159-Indicaciones%20pre%20quir%C3%BArgicas.pdf",
    title: "Indicaciones a partir del primer control",
    sub: "Qué hacer después del primer control",
    detailTitle: "Indicaciones a partir del primer control",
    videoIntro: "El Dr. Lloveras te explica los cuidados y pasos a seguir a partir de tu primer control post operatorio.",
    pdfName: "Indicaciones-primer-control.pdf",
    pdfMeta: "PDF · 2 páginas",
    summaryTitle: "Recordá",
    summaryKind: "check",
    summary: [
      { h: "Colocá las gotas indicadas", t: "Comenzá con las gotas en los días y horarios que te indicamos." },
      { h: "Vení a los controles programados", t: "Los controles son clave para asegurarnos de que todo evoluciona bien." },
      { h: "Cuidá el ojo operado", t: "Evitá frotarlo y usá el protector para dormir los primeros días." },
      { h: "Evitá conducir los primeros días", t: "Hasta que tu visión se estabilice, no manejes. Coordiná con alguien de confianza." },
      { h: "No dejés tu medicación habitual", t: "Recordá continuar con los medicamentos que tomás habitualmente, salvo indicación en contrario." },
      { h: "Avisá cualquier molestia", t: "Si tenés dolor fuerte, enrojecimiento o pérdida de visión, escribinos enseguida." },
    ],
    faq: [
      { q: "¿Cuándo voy a ver bien?", a: "La visión mejora en los primeros días y se va estabilizando en las semanas siguientes." },
      { q: "¿Puedo mirar el celular o la tele?", a: "Sí, con moderación y descansos. No daña tu ojo operado." },
    ],
  },
  {
    id: "post",
    icon: "eye",
    videoUrl: "https://4paycditbkbuyusv.private.blob.vercel-storage.com/lloveras/post-video-1782391479049-Avatar_1.mp4",
    pdfUrl: "https://4paycditbkbuyusv.private.blob.vercel-storage.com/lloveras/post-pdf-1782330281071-Indicaciones%20post%20quir%C3%BArgicas.pdf",
    title: "Indicaciones post quirúrgicas",
    sub: "Cuidados después de la cirugía",
    detailTitle: "Después de tu cirugía",
    videoIntro: "Estos cuidados te ayudan a recuperarte rápido y bien. Vemos juntos qué hacer en casa.",
    pdfName: "Indicaciones-postquirurgicas.pdf",
    pdfMeta: "PDF · 2 páginas",
    summaryTitle: "Cuidados en casa",
    summaryKind: "check",
    summary: [
      { h: "Usá las gotas indicadas", t: "Cumplí con los horarios de cada gota para una buena cicatrización." },
      { h: "No te frotes el ojo", t: "Evitá tocarlo o frotarlo. Usá el protector ocular para dormir los primeros días." },
      { h: "Cuidá los esfuerzos", t: "Evitá levantar peso, agacharte de golpe y el contacto con agua o polvo." },
      { h: "Vení a los controles", t: "Los controles nos permiten asegurarnos de que todo evoluciona bien." },
    ],
    faq: [
      { q: "¿Cuándo voy a ver bien?", a: "La visión mejora en los primeros días y se estabiliza en las semanas siguientes. Cada caso es diferente." },
      { q: "¿Tengo que colocarme las gotas de noche?", a: "No es necesario que te despertés durante la noche. Seguí los horarios indicados durante el día." },
      { q: "¿Puedo mirar el celular o la tele?", a: "Sí, con moderación y descansos. No daña el ojo operado." },
      { q: "¿Y si siento molestias?", a: "Una molestia leve es normal. Si tenés dolor fuerte, mucho enrojecimiento o pérdida de visión, comunicarte al 4211-827 o por WhatsApp al 264-506-8102." },
    ],
  },
];
