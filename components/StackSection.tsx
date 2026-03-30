const STACK = [
  {
    name: "Next.js 15",
    description: "App Router con server components para la API de autenticación.",
  },
  {
    name: "Liveblocks",
    description: "Infraestructura de colaboración en tiempo real: presencia, almacenamiento y comentarios.",
  },
  {
    name: "Tiptap",
    description: "Editor rich-text extensible, integrado con la extensión de colaboración de Liveblocks.",
  },
  {
    name: "Tailwind CSS v4",
    description: "Utilidades CSS con configuración basada en temas. Sin CSS personalizado innecesario.",
  },
  {
    name: "TypeScript",
    description: "Tipado estricto en todo el proyecto para mayor fiabilidad y documentación implícita.",
  },
];

export function StackSection() {
  return (
    <section className="bg-surface border border-border rounded-lg p-6">
      <h3 className="text-text-primary font-semibold text-lg mb-4">
        Stack técnico
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STACK.map((tech) => (
          <div
            key={tech.name}
            className="bg-surface-elevated rounded-md p-4 border border-border"
          >
            <h4 className="text-text-primary font-medium text-sm font-mono">
              {tech.name}
            </h4>
            <p className="text-text-muted text-sm mt-1">
              {tech.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
