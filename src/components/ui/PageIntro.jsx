import { Container } from "./Container";
import { Reveal } from "../motion/Reveal";

export function PageIntro({ eyebrow, title, text, children }) {
  return (
    <section className="bg-cream pb-16 pt-36 sm:pb-24 sm:pt-44">
      <Container>
        <Reveal className="max-w-5xl">
          <p className="eyebrow mb-6">{eyebrow}</p>
          <h1 className="text-balance font-display text-6xl leading-[0.9] tracking-[-0.045em] sm:text-7xl lg:text-[7.5rem]">
            {title}
          </h1>
          {text && (
            <p className="mt-8 max-w-2xl text-lg leading-8 text-ink/70 sm:text-xl">
              {text}
            </p>
          )}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
