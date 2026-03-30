export function BannerNewsletter() {
  return (
    <section className="bg-surface border border-border rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h3 className="text-text-primary font-semibold text-lg">
          Cada semana, herramientas como esta en tu bandeja de entrada.
        </h3>
        <p className="text-text-muted text-sm mt-1">
          Newsletter semanal con demos, tutoriales y herramientas para desarrolladores.
        </p>
      </div>
      <a
        href="https://concriterio.blog"
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 bg-accent hover:bg-accent-hover text-white font-medium text-sm px-5 py-2.5 rounded-md transition-colors duration-150"
      >
        Suscribirme
      </a>
    </section>
  );
}
