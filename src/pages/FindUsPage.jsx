import { Bike, Clock3, MapPin, TrainFront, Compass, Plus } from "lucide-react";
import { motion } from "motion/react";
import { Seo } from "../components/common/Seo";
import { PageIntro } from "../components/ui/PageIntro";
import { Section } from "../components/ui/Section";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { siteConfig } from "../data/site";
import { formatAddress } from "../lib/format";
import { localBusinessSchema } from "../lib/seo";

const practicalInfo = [
  {
    icon: MapPin,
    title: "Adresse de la maison",
    text: formatAddress(siteConfig.address),
  },
  {
    icon: TrainFront,
    title: "Accès Métro",
    text: `Station ${siteConfig.address.metro} (Lignes 4, 8, 9)`,
  },
  {
    icon: Bike,
    title: "Venir à vélo",
    text: "Pistes cyclables sécurisées & bornes Vélib' à proximité immédiate",
  },
];

export default function FindUsPage() {
  return (
    <>
      <Seo
        description={`Retrouvez Maison Saha à ${siteConfig.address.district} : adresse, horaires détaillés, accès métro et conseils pour votre prochain brunch.`}
        schema={localBusinessSchema}
        title="Nous trouver"
      />
      
      <PageIntro
        eyebrow="Nous Visiter"
        text="Un latte à emporter avant le bureau, un grand brunch entre amis ou une pâtisserie maison l'après-midi : découvrez toutes les informations pratiques pour nous rejoindre."
        title="Votre table est à quelques pas."
      >
        <Button className="mt-9" href={siteConfig.mapsUrl} icon target="_blank">
          Ouvrir dans Google Maps
        </Button>
      </PageIntro>

      {/* Interactive Map & Practical Info Grid */}
      <Section className="bg-sand text-ink pt-8 pb-16">
        <Container>
          <div className="grid overflow-hidden rounded-[2.5rem] bg-cream shadow-md lg:grid-cols-2 border border-ink/5">
            {/* Interactive styled Map */}
            <div className="relative min-h-[350px] lg:min-h-full overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2882200880194!2d2.350849315674844!3d48.871804979288864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e13e5b38eb1%3A0xc34571de99dbb6bf!2s24%20Rue%20du%20Faubourg%20Saint-Denis%2C%2075010%20Paris!5e0!3m2!1sfr!2sfr!4v1656500000000!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                className="absolute inset-0 size-full border-0 grayscale-[0.1] contrast-[1.03]"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Plan d'accès Maison Saha"
              />
              <div className="absolute top-4 left-4 bg-ink text-cream rounded-full px-4 py-1.5 text-[0.62rem] font-bold uppercase tracking-widest shadow-md">
                {siteConfig.address.district}
              </div>
            </div>

            {/* Practical info cards list */}
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
              <div>
                <p className="eyebrow mb-8 text-terracotta">Informations Pratiques</p>
                <div className="divide-y divide-ink/10">
                  {practicalInfo.map(({ icon: Icon, title, text }, index) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 py-6 first:pt-0 last:pb-0"
                    >
                      <span className="flex size-10 items-center justify-center rounded-full bg-terracotta/10 text-terracotta shrink-0">
                        <Icon aria-hidden="true" className="size-4.5" />
                      </span>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-ink">{title}</h3>
                        <p className="mt-1 text-sm text-ink/75 leading-relaxed">{text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="mt-10 pt-6 border-t border-ink/10 flex flex-wrap gap-4">
                <Button href={siteConfig.mapsUrl} icon target="_blank">
                  Lancer l’itinéraire
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Opening hours & FAQ */}
      <Section className="bg-cream text-ink">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            
            {/* Hours panel */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Clock3 aria-hidden="true" className="size-6 text-terracotta" />
                <h2 className="font-display text-4xl tracking-tight text-ink">Horaires</h2>
              </div>
              <p className="text-sm text-ink/60 mb-8 max-w-md leading-relaxed">
                Notre équipe est à votre service tous les jours de la semaine. Pas de fermeture annuelle, nous vous accueillons tout au long de l'année.
              </p>
              
              <div className="divide-y divide-ink/10 border-y border-ink/10">
                {siteConfig.hours.map((item) => (
                  <div
                    className="flex justify-between gap-4 py-5 text-sm"
                    key={item.days}
                  >
                    <span className="font-semibold text-ink">{item.days}</span>
                    <span className="font-mono text-terracotta font-bold">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ details with premium accordion */}
            <div>
              <p className="eyebrow mb-6 text-terracotta">Questions Fréquentes</p>
              <div className="divide-y divide-ink/10 border-b border-ink/10">
                
                <details className="group py-5 outline-none">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-display text-2xl text-ink outline-none select-none">
                    <span>Faut-il réserver ?</span>
                    <span className="relative flex size-7 shrink-0 items-center justify-center rounded-full border border-ink/15 group-open:rotate-45 transition-transform duration-300">
                      <Plus className="size-4 text-ink" />
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-ink/65 pl-1 max-w-lg">
                    Nous accueillons exclusivement sans réservation pour préserver l'esprit d'un bistrot de quartier parisien. Les matins de week-end sont les plus animés, mais notre équipe gère le flux avec soin pour vous installer rapidement.
                  </p>
                </details>

                <details className="group py-5 outline-none">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-display text-2xl text-ink outline-none select-none">
                    <span>Quand le brunch est-il servi ?</span>
                    <span className="relative flex size-7 shrink-0 items-center justify-center rounded-full border border-ink/15 group-open:rotate-45 transition-transform duration-300">
                      <Plus className="size-4 text-ink" />
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-ink/65 pl-1 max-w-lg">
                    Nos brunchs signatures et nos lattes gourmands sont servis en service continu (all-day brunch), de l'ouverture de la maison jusqu'à 30 minutes avant la fermeture des portes.
                  </p>
                </details>

                <details className="group py-5 outline-none">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-display text-2xl text-ink outline-none select-none">
                    <span>Proposez-vous du sans gluten ?</span>
                    <span className="relative flex size-7 shrink-0 items-center justify-center rounded-full border border-ink/15 group-open:rotate-45 transition-transform duration-300">
                      <Plus className="size-4 text-ink" />
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-ink/65 pl-1 max-w-lg">
                    Tout à fait ! Vous pouvez choisir l'option pain sans gluten pour nos sandwichs chauds ou toasts (+2 €), et nous proposons plusieurs desserts sans gluten au comptoir. N'hésitez pas à mentionner vos allergies à l'équipe.
                  </p>
                </details>

              </div>

              <div className="mt-8 flex gap-4">
                <Button to="/menu" variant="secondary" icon>
                  Consulter la carte
                </Button>
              </div>
            </div>

          </div>
        </Container>
      </Section>
    </>
  );
}
