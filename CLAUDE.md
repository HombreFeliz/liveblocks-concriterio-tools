# Liveblocks — Instrucciones para Claude Code

## Qué es esto
Demo interactiva de Liveblocks para liveblocks.concriterio.tools.
Lee docs/prd.md antes de empezar.

## Stack
- Next.js 15 (App Router)
- @liveblocks/client ^3.11.0
- @liveblocks/react ^3.15.1
- @liveblocks/react-ui ^2.20.0
- @liveblocks/react-tiptap ^3.11.0 (para el editor colaborativo)
- @liveblocks/node ^3.11.0 (solo en API route)
- Tiptap (@tiptap/react, @tiptap/pm, @tiptap/starter-kit)
- Tailwind CSS v4
- TypeScript (strict)

## Lo que debes construir

### 1. API Route de autenticación
`app/api/liveblocks-auth/route.ts`
- Usa `@liveblocks/node` para crear un `Liveblocks` client con el secret key
- Asigna a cada sesión un usuario simulado (nombre + userId aleatorio, persistido en cookie de sesión)
- Responde al `authorize` de `@liveblocks/react`

### 2. Setup global
`lib/liveblocks.ts`
- `createClient` con `authEndpoint: "/api/liveblocks-auth"`
- Exporta tipos globales de Liveblocks (presencia: `{ cursor: { x, y } | null, name: string, color: string }`)

### 3. Página principal
`app/page.tsx`
- Envuelve todo en `LiveblocksProvider` + `RoomProvider` (room id: `"demo-concriterio"`)
- Layout: header con título + panel de presencia, editor centrado, banners al final

### 4. Editor colaborativo
`components/CollaborativeEditor.tsx`
- Tiptap con extensión de colaboración de `@liveblocks/react-tiptap`
- Cursores de otros usuarios visibles dentro del documento
- Extensión de comentarios de Liveblocks para hilos contextuales
- Importar `@liveblocks/react-ui/styles.css` y `@liveblocks/react-ui/styles/dark/attributes.css`
- Aplicar variable `--lb-accent: #FF4F30` en `.lb-root`

### 5. Panel de presencia
`components/PresencePanel.tsx`
- Hook `useOthers()` para lista de usuarios conectados
- Hook `useSelf()` para el usuario actual
- Avatares circulares con inicial + color del usuario

### 6. Cursores
- Dentro del editor los cursores de Tiptap ya se gestionan con la extensión de colaboración
- No hace falta cursor tracking manual sobre el canvas de la página

## Componentes fijos (obligatorios)
- `BannerConsultoria`: "¿Necesitas ayuda integrando esto en tu proyecto?" → https://cal.com/polmarza/toma-de-contacto (90€/sesión)
- `BannerNewsletter`: "Cada semana, herramientas como esta en tu bandeja de entrada." → https://concriterio.blog
- `BannerRepositorio`: "Esta demo está construida con Next.js + Liveblocks. El código es público." → https://github.com/polmarza/liveblocks-concriterio-tools
- `StackSection`: tecnologías con justificación breve al final de la página

## Sistema de diseño
Lee docs/design-system.md.
- Background: #0F0F0F
- Surface: #1A1A1A
- Accent: #FF4F30 (naranja Liveblocks)
- Text: #F0F0F0
- Fuentes: Inter (display/body), JetBrains Mono (código)
- Dark mode forzado. Sin toggle.

## Variables de entorno
Definidas en .env.example. Nunca hardcodear valores.
- `LIVEBLOCKS_SECRET_KEY` → solo en API route, nunca en componentes cliente
- `NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY` → puede estar en cliente (es la clave pública)

## Convenciones
- TypeScript siempre, sin `any`
- `"use client"` en todos los componentes que usen hooks de Liveblocks
- Componentes pequeños con responsabilidad única
- Sin librerías extra no listadas en el stack
- El código debe ser legible: esta demo es también material educativo

## NO hacer
- No añadir autenticación real de usuarios (Next Auth, Clerk, etc.)
- No usar `@liveblocks/react-ui` en versión < 2.20.0
- No exponer `LIVEBLOCKS_SECRET_KEY` en ningún componente cliente
- No añadir features fuera del PRD (sin notificaciones, sin inbox, sin export)
- No usar estilos inline salvo para CSS variables de Liveblocks
