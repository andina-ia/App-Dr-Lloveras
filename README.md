# App Dr. Marcelo Lloveras — Oftalmología

App móvil-first para pacientes de cirugía de cataratas. Permite al Dr. Lloveras subir videos y PDFs explicativos por sección, sin tocar código.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Vercel Blob** — almacenamiento de videos y PDFs con URLs públicas
- **Vercel** — deploy automático desde GitHub

## Estructura de pantallas

1. **Portada** — presentación con botón de ingreso
2. **Inicio** — 4 secciones: Pasos, Lente, Pre quirúrgica, Post quirúrgica
3. **Detalle** — video + resumen + PDF descargable + FAQ + WhatsApp

## Secciones

| ID | Título |
|----|--------|
| `pasos` | Pasos a seguir |
| `lente` | Cómo elegir tu lente |
| `pre` | Indicaciones pre quirúrgicas |
| `post` | Indicaciones post quirúrgicas |

## Variables de entorno

```env
BLOB_READ_WRITE_TOKEN=        # Auto en Vercel al activar Blob Storage
ADMIN_PASSWORD=lloveras2024   # Contraseña del panel /admin
NEXT_PUBLIC_WHATSAPP=5491100000000  # Número real sin + ni espacios
```

## Panel admin

Accedé a `/admin` con la contraseña configurada. Desde ahí podés subir o reemplazar el video y PDF de cada sección. Los archivos se guardan en Vercel Blob y la app los muestra en minutos (revalidación: 60s).

## Deploy en Vercel

1. Conectar el repo en [vercel.com](https://vercel.com)
2. Activar **Blob Storage** en el proyecto (Storage → Blob)
3. Agregar las variables de entorno
4. Push → deploy automático

## Desarrollo local

```bash
npm install
npm run dev
```

Para subir archivos localmente necesitás el `BLOB_READ_WRITE_TOKEN` en `.env.local`.

## Accesibilidad

Selector de tamaño de texto (A / A+ / A++) visible en todas las pantallas, pensado para el público adulto mayor.
