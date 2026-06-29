export function RouteLoader() {
  return (
    <div
      aria-label="Chargement de la page"
      className="grid min-h-[70svh] place-items-center bg-cream"
      role="status"
    >
      <span className="size-8 animate-spin rounded-full border-2 border-ink/15 border-t-terracotta" />
    </div>
  );
}
