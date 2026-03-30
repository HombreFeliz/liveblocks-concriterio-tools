# Design System — Liveblocks Demo

Esta demo adapta la estética visual de Liveblocks.io: fondo oscuro casi negro,
tipografía sans-serif limpia, accent naranja/coral vibrante. Los componentes
de `@liveblocks/react-ui` se personalizan con las CSS variables `--lb-*` para
alinearlos con esta paleta.

## Colores

```
Background:       #0F0F0F   ← Fondo principal (negro Liveblocks)
Surface:          #1A1A1A   ← Tarjetas, paneles, editor
Surface elevated: #242424   ← Tooltips, dropdowns, modales
Border:           #2E2E2E   ← Separadores, bordes de input
Text primary:     #F0F0F0   ← Texto principal
Text muted:       #888888   ← Labels, texto secundario
Accent:           #FF4F30   ← CTA, cursores, highlights (naranja Liveblocks)
Accent hover:     #FF6B4F   ← Estado hover del accent
Success:          #4ade80
Error:            #f87171
Warning:          #fbbf24
```

## Variables CSS de Liveblocks (`--lb-*`)

Aplicar en `.lb-root` para que los componentes de `@liveblocks/react-ui`
hereden el diseño:

```css
.lb-root {
  --lb-accent: #FF4F30;
  --lb-radius: 6px;
  --lb-spacing: 0.875em;
  --lb-background: #1A1A1A;
}
```

Con dark mode activado (`@liveblocks/react-ui/styles/dark/attributes.css`),
los tokens internos de Liveblocks ya usan fondos oscuros. Solo es necesario
sobrescribir `--lb-accent` para el color de marca.

## Tipografía

```
Display/Headings: Inter (700)         ← Alineado con la web de Liveblocks
Body:             Inter (400/500)
Mono:             JetBrains Mono      ← Etiquetas técnicas, room ID
```

Cargar desde Google Fonts en `layout.tsx`:
```
Inter: weights 400, 500, 700
JetBrains Mono: weight 400
```

## Componentes de UI custom

### Cursores de usuario
- Color único por usuario (generar con hash del userId → paleta de 8 colores)
- Paleta de cursores: `#FF4F30`, `#4F9EFF`, `#4FD18B`, `#FFD147`, `#B46FFF`, `#FF6FBF`, `#FF9F47`, `#47D4FF`
- Label con nombre de usuario, fondo semitransparente del color del cursor

### Avatares de presencia
- Círculo 32px, fondo = color del cursor del usuario
- Inicial del nombre en blanco, peso 600
- Borde 2px `#0F0F0F` para separar avatares apilados

### Editor
- Fondo: `#1A1A1A`
- Border-radius: 8px
- Padding: 24px 32px
- Fuente: Inter 16px, line-height 1.7
- Placeholder: texto muted `#888888`

## Estilo general

- Dark mode forzado (sin toggle claro/oscuro)
- Sin sombras pesadas; separación por color de superficie
- Border-radius consistente: 6px inputs/botones, 8px tarjetas, 12px modales
- Transiciones: 150ms ease para estados hover/focus
- Sin gradientes decorativos; el accent naranja es el único color vibrante

## Banners

Estilo unificado para los tres banners fijos:
- Fondo: `#1A1A1A`
- Border: 1px `#2E2E2E`
- Border-radius: 8px
- Padding: 16px 20px
- Layout horizontal (icono + texto + CTA en la misma línea)
- CTA button: fondo `#FF4F30`, texto blanco, border-radius 6px
