import { Component } from "react";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Erreur d’affichage", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-dvh place-items-center bg-cream py-24 text-ink">
          <Container className="max-w-2xl text-center">
            <p className="eyebrow mb-6">Une petite pause</p>
            <h1 className="font-display text-6xl tracking-[-0.04em]">
              Cette page a besoin d’un nouveau café.
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-ink/65">
              Une erreur inattendue s’est produite. Rechargez la page pour
              reprendre votre visite.
            </p>
            <Button className="mt-9" onClick={() => window.location.reload()}>
              Recharger la page
            </Button>
          </Container>
        </main>
      );
    }

    return this.props.children;
  }
}
