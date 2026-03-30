# Liveblocks — Con Criterio Tools

Demo interactiva de Liveblocks como parte de concriterio.tools.

## Qué hace esta demo

1. **Editor colaborativo en tiempo real:** dos o más usuarios editan el mismo documento y ven los cursores del otro con nombre y color distintos.
2. **Sistema de comentarios:** cualquier usuario puede seleccionar texto y añadir un hilo de comentarios contextual. Los demás lo ven en tiempo real.
3. **Panel de presencia:** muestra en todo momento quién está conectado a la sala, con avatar generado y nombre de usuario simulado.

## Stack

- **Next.js 15 (App Router):** API routes para autenticación Liveblocks. SSR mínimo; la demo es cliente.
- **@liveblocks/react 3.15.1 + @liveblocks/react-ui 2.20.0:** hooks y componentes de colaboración.
- **@liveblocks/node 3.11.0:** endpoint de autenticación en servidor.
- **Tiptap (con @liveblocks/react-tiptap):** editor de texto rico con colaboración.
- **Tailwind CSS v4:** utilidades de layout y tipografía.
- **TypeScript:** tipado estricto en todo el proyecto.

## Variables de entorno

Ver `.env.example`

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000` en dos pestañas para simular dos usuarios.

## Deploy

Configurado para Vercel. Importar repo, añadir variables de entorno del `.env.example`, deploy automático.

## Parte de

[concriterio.tools](https://concriterio.tools) — herramientas para builders
por [Pol Marza](https://concriterio.blog)
