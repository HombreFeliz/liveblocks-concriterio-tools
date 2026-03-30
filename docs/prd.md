# PRD — Liveblocks Demo (concriterio.tools)

## Qué es Liveblocks

Liveblocks es una plataforma de infraestructura de colaboración en tiempo real.
Proporciona primitivos (presencia, almacenamiento sincronizado, comentarios,
notificaciones) que los developers integran en sus apps para añadir funcionalidad
multiplayer sin construir la infraestructura desde cero.

Su modelo de integración se basa en "rooms" (salas virtuales): múltiples usuarios
se conectan a la misma room y comparten estado en tiempo real. El SDK de React
expone hooks tipados que abstraen la sincronización, los conflictos y la
reconexión.

## Para qué tipo de proyecto sirve

Cualquier app donde múltiples usuarios necesiten trabajar sobre el mismo contenido
simultáneamente: editores de documentos, herramientas de diseño, dashboards
colaborativos, whiteboards, herramientas de revisión de código o documentación
interna.

## Scope exacto de esta demo

### Lo que hace
- Editor de texto colaborativo en tiempo real con cursores de usuario visibles
- Sistema de comentarios sobre texto seleccionado (threads contextuales)
- Panel de presencia que muestra quién está conectado en este momento

### Lo que NO hace
- No implementa autenticación real de usuarios (se asigna un usuario simulado por sesión)
- No persiste el contenido del documento entre recargas completas de página
- No implementa notificaciones por email ni inbox

## Flujos de usuario

### Flujo 1 — Escritura colaborativa
El usuario llega a la demo y ve un editor de texto con instrucciones mínimas.
Al escribir, sus cambios se sincronizan en tiempo real con cualquier otra pestaña
o usuario conectado a la misma room. Su cursor aparece en el documento con su
nombre y color asignado. Los cursores de otros usuarios aparecen mientras escriben.

### Flujo 2 — Comentarios contextuales
El usuario selecciona texto en el editor. Aparece un menú flotante con la opción
de añadir un comentario. Al hacerlo, se crea un hilo de comentarios visible para
todos los usuarios conectados. Otros usuarios pueden responder en el mismo hilo.
Los threads se anclan visualmente al fragmento de texto seleccionado.

### Flujo 3 — Panel de presencia
En la esquina superior derecha, un panel muestra los avatares de todos los
usuarios actualmente conectados a la sala, con su nombre. El panel se actualiza
en tiempo real: cuando un usuario cierra la pestaña, desaparece del panel en
menos de 2 segundos.

## Componentes fijos

Todas las páginas incluyen:
1. **Banner consultoría:** "¿Necesitas ayuda integrando esto en tu proyecto?" → https://cal.com/polmarza/toma-de-contacto (90€/sesión)
2. **Banner newsletter:** "Cada semana, herramientas como esta en tu bandeja de entrada." → https://concriterio.blog
3. **Banner repositorio:** "Esta demo está construida con Next.js + Liveblocks. El código es público." → https://github.com/polmarza/liveblocks-concriterio-tools
4. **Sección stack:** tecnologías usadas con justificación breve
