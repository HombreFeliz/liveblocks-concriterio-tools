export function BannerConsultoria() {
  return (
    <section className="bg-surface border border-border rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h3 className="text-text-primary font-semibold text-lg">
          ¿Necesitas ayuda integrando esto en tu proyecto?
        </h3>
        <p className="text-text-muted text-sm mt-1">
          Sesión de consultoría 1:1 para implementar colaboración en tiempo real.
        </p>
      </div>
      <a
        href="https://cal.com/polmarza/toma-de-contacto"
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 bg-accent hover:bg-accent-hover text-white font-medium text-sm px-5 py-2.5 rounded-md transition-colors duration-150"
      >
        Reservar sesión — 90€
      </a>
    </section>
  );
}
