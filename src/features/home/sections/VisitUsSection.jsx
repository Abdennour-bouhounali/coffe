import { useState, useEffect } from "react";
import { Clock3, MapPin, TrainFront } from "lucide-react";
import { siteConfig } from "../../../data/site";
import { formatAddress } from "../../../lib/format";
import { Section } from "../../../components/ui/Section";
import { SectionHeading } from "../../../components/ui/SectionHeading";
import { EditorialMedia } from "../../../components/media/EditorialMedia";
import { Button } from "../../../components/ui/Button";
import { Reveal } from "../../../components/motion/Reveal";
import { cn } from "../../../lib/cn";

export function VisitUsSection() {
  const [hoursText, setHoursText] = useState("9h00 — 18h30");
  const [isOpenToday, setIsOpenToday] = useState(false);

  useEffect(() => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeInMinutes = hours * 60 + minutes;

    if (day >= 1 && day <= 5) {
      setHoursText("8h30 — 18h00");
      setIsOpenToday(timeInMinutes >= 8 * 60 + 30 && timeInMinutes <= 18 * 60);
    } else {
      setHoursText("9h00 — 18h30");
      setIsOpenToday(timeInMinutes >= 9 * 60 && timeInMinutes <= 18 * 60 + 30);
    }
  }, []);

  return (
    <Section className="bg-cream text-ink" id="visite">
      <div className="grid overflow-hidden rounded-[2.5rem] bg-ink text-cream lg:grid-cols-2 border border-cream/5 shadow-lg">
        <EditorialMedia
          alt="Façade de Maison Saha à Paris"
          className="aspect-[4/3] min-h-full lg:aspect-auto"
          label="Paris 10e"
          tone="coffee"
          src="/images/interieur-01.png"
        />

        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
          <div>
            <SectionHeading
              eyebrow="Nous trouver"
              text="Retrouvez-nous pour un café rapide, un long brunch ensoleillé ou simplement un peu de douceur dans la journée."
              title="Votre prochaine pause commence ici."
              titleClassName="lg:text-6xl"
            />

            <Reveal className="mt-10 divide-y divide-cream/15 border-y border-cream/15">
              <div className="flex gap-4 py-5">
                <MapPin aria-hidden="true" className="mt-0.5 size-5 text-saffron" />
                <div>
                  <p className="text-sm font-semibold">La maison</p>
                  <p className="mt-1 text-sm text-cream/60">
                    {formatAddress(siteConfig.address)}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 py-5">
                <Clock3 aria-hidden="true" className="mt-0.5 size-5 text-saffron" />
                <div>
                  <p className="text-sm font-semibold flex items-center gap-2">
                    <span>Aujourd’hui</span>
                    <span className={cn(
                      "relative flex size-2 shrink-0 rounded-full",
                      isOpenToday ? "bg-emerald-400" : "bg-orange-400"
                    )}>
                      {isOpenToday && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      )}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-bold opacity-60">
                      {isOpenToday ? "Ouvert" : "Fermé"}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-cream/60">
                    Brunch et café · {hoursText}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 py-5">
                <TrainFront aria-hidden="true" className="mt-0.5 size-5 text-saffron" />
                <div>
                  <p className="text-sm font-semibold">À quelques pas</p>
                  <p className="mt-1 text-sm text-cream/60">
                    Métro {siteConfig.address.metro}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={siteConfig.mapsUrl} icon target="_blank" variant="light">
              Ouvrir l’itinéraire
            </Button>
            <Button
              className="border-cream/30 text-cream hover:bg-cream hover:text-ink"
              to="/nous-trouver"
              variant="secondary"
            >
              Préparer ma visite
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
