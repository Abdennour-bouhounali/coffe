import { Seo } from "../components/common/Seo";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";

export default function NotFoundPage() {
  return (
    <>
      <Seo
        description="Cette page n’existe pas ou a été déplacée."
        title="Page introuvable"
      />
      <section className="grid min-h-[80svh] place-items-center bg-saffron pb-20 pt-36 text-center text-ink">
        <Container>
          <p className="eyebrow mb-6">Erreur 404</p>
          <h1 className="mx-auto max-w-4xl font-display text-6xl leading-[0.9] tracking-[-0.045em] sm:text-8xl">
            Ce café-là n’est plus sur la carte.
          </h1>
          <p className="mx-auto mt-7 max-w-lg text-ink/65">
            La page demandée a peut-être changé d’adresse. Le menu, lui, est
            toujours bien là.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/menu">Voir le menu</Button>
            <Button to="/" variant="secondary">
              Retour à l’accueil
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
