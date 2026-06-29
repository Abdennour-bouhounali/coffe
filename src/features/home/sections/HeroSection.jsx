import { ArrowDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { homeContent } from "../../../data/home";
import { siteConfig } from "../../../data/site";
import { Container } from "../../../components/ui/Container";
import { Button } from "../../../components/ui/Button";
import { EditorialMedia } from "../../../components/media/EditorialMedia";
import { TextReveal } from "../../../components/motion/TextReveal";
import { useParallax } from "../../../hooks/useParallax";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const mediaY = useParallax(sectionRef, 54);

  return (
    <section
      className="relative min-h-svh overflow-hidden bg-terracotta pt-20 text-cream"
      ref={sectionRef}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[0.03em] bottom-[-0.2em] select-none font-display text-[32vw] leading-none tracking-[-0.08em] text-ink/[0.045] lg:text-[24vw]"
      >
        SAHA
      </div>

      <Container className="relative grid min-h-[calc(100svh-5rem)] items-center gap-9 py-9 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:py-14">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 pt-3 lg:pt-0"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-cream/70">
            {homeContent.hero.eyebrow}
          </p>
          <TextReveal
            className="max-w-5xl text-balance font-display text-[clamp(3.65rem,14vw,8.8rem)] leading-[0.82] tracking-[-0.055em] lg:text-[clamp(5rem,8.2vw,8.8rem)]"
            lines={[
              { content: "Paris le matin." },
              {
                className: "pl-[7vw] italic text-saffron lg:pl-[4vw]",
                content: "Marrakech dans l’âme.",
              },
            ]}
          />
          <p className="mt-8 max-w-lg text-base leading-7 text-cream/75 sm:text-lg">
            {homeContent.hero.text}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button to="/menu" variant="light" icon>
              Découvrir le menu
            </Button>
            <Button
              className="border-cream/35 text-cream hover:bg-cream hover:text-ink"
              to="/nous-trouver"
              variant="secondary"
            >
              Nous trouver
            </Button>
          </div>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.13em] text-cream/55">
            {siteConfig.address.district} · Métro {siteConfig.address.metro}
          </p>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="relative h-[min(39svh,25rem)] min-h-64 sm:h-[min(44svh,32rem)] lg:h-[min(68vh,50rem)]"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.04 }}
          style={{ y: mediaY }}
          transition={{ delay: 0.18, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <EditorialMedia
            alt="Brunch solaire Maison Saha"
            className="size-full rounded-[2rem_2rem_45%_45%] sm:rounded-[45%_45%_2rem_2rem]"
            label="Le matin, version Saha"
            priority
            src="/images/hero-maison-saha.png"
            tone="saffron"
          />
          <motion.div
            animate={shouldReduceMotion ? undefined : { rotate: [-8, -4, -8] }}
            className="absolute -left-2 -top-5 grid size-22 place-items-center rounded-full bg-pistachio text-center text-[0.56rem] font-black uppercase leading-3.5 tracking-[0.12em] text-ink shadow-lg sm:-bottom-5 sm:-left-6 sm:top-auto sm:size-28 sm:text-[0.62rem] sm:leading-4"
            transition={{
              duration: 7,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            Servi
            <br />
            toute la
            <br />
            journée
          </motion.div>
          <p className="absolute right-5 top-5 rounded-full border border-ink/15 bg-cream/85 px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.13em] text-ink backdrop-blur-md">
            Fait maison
          </p>
        </motion.div>
      </Container>

      <a
        aria-label="Découvrir le brunch"
        className="absolute bottom-8 right-8 hidden size-12 place-items-center rounded-full border border-cream/30 transition-colors hover:bg-cream hover:text-ink lg:grid"
        href="#brunch"
      >
        <ArrowDown aria-hidden="true" className="size-4" />
      </a>
    </section>
  );
}
