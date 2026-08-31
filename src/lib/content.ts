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
  greeting: "Bienvenido/a",
  intro: "Está en buenas manos. Aquí encontrará los videos y las indicaciones que necesita para cada etapa de su cirugía.",
};

export const contact: Contact = {
  label: "Escribir al consultorio",
  sub: "WhatsApp · Lun a Vie, 9 a 18 h",
  note: "Ante cualquier molestia o duda, comuníquese con nosotros. Le respondemos a la brevedad.",
  phone: "2645068102",
};

export const sections: Section[] = [
  {
    id: "pasos",
    icon: "steps",
    videoUrl: "https://4paycditbkbuyusv.private.blob.vercel-storage.com/lloveras/pasos-video-1782391893432-Avatar_3.mp4",
    pdfUrl: "https://4paycditbkbuyusv.private.blob.vercel-storage.com/lloveras/pasos-pdf-1782330217656-Pasos%20a%20seguir.pdf",
    title: "Pasos a seguir",
    sub: "El camino de su cirugía, paso a paso",
    detailTitle: "Pasos de su cirugía de cataratas",
    videoIntro: "El Dr. Lloveras te explica, en pocos minutos, cómo será todo el proceso de principio a fin.",
    pdfName: "Pasos-cirugia-de-cataratas.pdf",
    pdfMeta: "PDF · 3 páginas",
    summaryTitle: "Las 4 etapas",
    summaryKind: "steps",
    summary: [
      { h: "Consulta y estudios previos", t: "Evaluamos su vista y pedimos los estudios necesarios para planificar la cirugía." },
      { h: "Preparación los días previos", t: "Recibís las indicaciones pre quirúrgicas: gotas, ayuno y qué llevar el día de la operación." },
      { h: "Día de la cirugía", t: "Es ambulatoria y dura entre 5 y 15 minutos. Volvés a casa el mismo día." },
      { h: "Recuperación y controles", t: "Sigue las indicaciones post quirúrgicas y concurre a los controles programados." },
    ],
    faq: [
      { q: "¿Cómo es el proceso antes de la cirugía?", a: "Primero presenta su carpeta en Mesa de Entrada, donde le asignan turno para los estudios del ojo. Luego retira las gotas con la receta, realiza el electrocardiograma y el análisis de sangre, y después vuelve al consultorio para elegir el lente." },
      { q: "¿Cómo se asigna el turno de cirugía?", a: "Con todos los estudios listos, acercate al primer piso entre las 8 y las 14 horas para coordinar el día y horario de la operación." },
      { q: "¿Se opera un ojo por vez?", a: "Sí. Se opera un ojo por vez, de forma ambulatoria y con anestesia local en gotas y sedación." },
      { q: "¿Tengo que quedarme internado/a?", a: "No. Es una cirugía ambulatoria: el mismo día vuelve a su casa." },
    ],
  },
  {
    id: "lente",
    icon: "lens",
    title: "Cómo elegir su lente",
    sub: "Qué lente intraocular le conviene",
    detailTitle: "Elegir su lente para la cirugía",
    videoIntro: "Durante la cirugía reemplazamos el cristalino opaco por un lente intraocular. El Dr. Lloveras le explica los tipos de lente y cómo elegir el que mejor se adapta a su vida.",
    pdfName: "Como-elegir-tu-lente.pdf",
    pdfMeta: "PDF · 2 páginas",
    summaryTitle: "Tipos de lente",
    summaryKind: "check",
    summary: [
      { h: "Lente monofocal", t: "Da una visión nítida a una sola distancia (en general de lejos). Es posible que necesites anteojos para leer de cerca." },
      { h: "Lente multifocal", t: "Ofrece visión de lejos y de cerca, con menos dependencia de los anteojos. Requiere un período de adaptación." },
      { h: "Lente tórico", t: "Corrige el astigmatismo además de la catarata. Puede ser monofocal o multifocal." },
      { h: "Su estilo de vida es clave", t: "La mejor elección depende de su trabajo, sus hobbies y cuánto desea depender de los anteojos. Lo definimos juntos en la consulta." },
    ],
    faq: [
      { q: "¿Cuál es el mejor lente?", a: "No hay uno mejor para todos: el ideal es el que se adapta a su vista y a su vida. En la consulta evaluamos su caso y le recomendamos." },
      { q: "¿La obra social cubre todos los lentes?", a: "La cobertura varía según el tipo de lente y su cobertura. Le informamos las opciones y los costos antes de decidir." },
      { q: "¿Puedo cambiar el lente después?", a: "El lente intraocular es permanente. Por eso es importante elegir bien antes de la cirugía; lo/la acompañamos en esa decisión." },
    ],
  },
  {
    id: "preq",
    icon: "clipboard",
    title: "Indicaciones antes de la cirugía",
    sub: "Qué hacer antes de operarte",
    detailTitle: "Indicaciones antes de la cirugía",
    videoIntro: "Mire este video para preparar todo con tranquilidad los días previos a la operación.",
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
      { q: "¿Puedo tomar mis remedios habituales?", a: "Sí, tome la medicación que habitualmente usa con normalidad, salvo que su médico le indique lo contrario." },
      { q: "¿Tengo que estar en ayunas?", a: "Sí, preséntese en ayunas salvo indicación contraria de su médico." },
      { q: "¿Puedo venir acompañado/a?", a: "Sí, puede venir acompañado por una sola persona." },
      { q: "¿Qué tengo que traer el día de la cirugía?", a: "Sus análisis de laboratorio recientes y el electrocardiograma con evaluación de riesgo quirúrgico. Si le realizaron estudios en la clínica (IOL Master, OCT o recuento endotelial), tráigalos también." },
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
    videoIntro: "El Dr. Lloveras le explica los cuidados y pasos a seguir a partir de su primer control post operatorio.",
    pdfName: "Indicaciones-primer-control.pdf",
    pdfMeta: "PDF · 2 páginas",
    summaryTitle: "Recordá",
    summaryKind: "check",
    summary: [
      { h: "Colóquese las gotas indicadas", t: "Comience con las gotas en los días y horarios indicados." },
      { h: "Asista a los controles programados", t: "Los controles son clave para asegurarnos de que todo evoluciona bien." },
      { h: "Cuide el ojo operado", t: "Evite frotarlo y use el protector para dormir los primeros días." },
      { h: "Evite conducir los primeros días", t: "Hasta que su visión se estabilice, no maneje. Coordine con alguien de confianza." },
      { h: "No deje su medicación habitual", t: "Recuerde continuar con los medicamentos que toma habitualmente, salvo indicación en contrario." },
      { h: "Avise ante cualquier molestia", t: "Si tiene dolor fuerte, enrojecimiento o pérdida de visión, comuníquese con nosotros de inmediato." },
    ],
    faq: [
      { q: "¿Cuándo voy a ver bien?", a: "La visión mejora en los primeros días y se estabiliza en las semanas siguientes." },
      { q: "¿Puedo mirar el celular o la tele?", a: "Sí, con moderación y descansos. No daña el ojo operado." },
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
    videoIntro: "Estos cuidados le ayudarán a recuperarse rápido y bien. Aquí veremos qué hacer en casa.",
    pdfName: "Indicaciones-postquirurgicas.pdf",
    pdfMeta: "PDF · 2 páginas",
    summaryTitle: "Cuidados en casa",
    summaryKind: "check",
    summary: [
      { h: "Use las gotas indicadas", t: "Cumpla con los horarios de cada gota para una buena cicatrización." },
      { h: "No se frote el ojo", t: "Evite tocarlo o frotarlo. Use el protector ocular para dormir los primeros días." },
      { h: "Cuide los esfuerzos", t: "Evite levantar peso, agacharse de golpe y el contacto con agua o polvo." },
      { h: "Asista a los controles", t: "Los controles nos permiten asegurarnos de que todo evoluciona bien." },
    ],
    faq: [
      { q: "¿Cuándo voy a ver bien?", a: "La visión mejora en los primeros días y se estabiliza en las semanas siguientes. Cada caso es diferente." },
      { q: "¿Tengo que colocarme las gotas de noche?", a: "No es necesario que se despierte durante la noche. Seguí los horarios indicados durante el día." },
      { q: "¿Puedo mirar el celular o la tele?", a: "Sí, con moderación y descansos. No daña el ojo operado." },
      { q: "¿Y si siento molestias?", a: "Una molestia leve es normal. Si tiene dolor fuerte, mucho enrojecimiento o pérdida de visión, comuníquese al 4211-827 o por WhatsApp al 264-506-8102." },
    ],
  },
];
