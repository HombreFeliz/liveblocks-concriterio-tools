export function BannerRepositorio() {
  return (
    <section className="bg-surface border border-border rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h3 className="text-text-primary font-semibold text-lg">
          Esta demo está construida con Next.js + Liveblocks. El código es público.
        </h3>
        <p className="text-text-muted text-sm mt-1">
          Explora el código fuente, haz fork y adapta la demo a tu proyecto.
        </p>
      </div>
      <a
        href="https://github.com/polmarza/liveblocks-concriterio-tools"
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 bg-surface-elevated hover:bg-border text-text-primary font-medium text-sm px-5 py-2.5 rounded-md border border-border transition-colors duration-150"
      >
        Ver en GitHub
      </a>
    </section>
  );
}
