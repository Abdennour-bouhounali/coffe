import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Instagram, Mail, Phone, MapPin, Clock, Compass, Send, Check, AlertCircle, TrainFront, MessageSquare } from "lucide-react";
import { Seo } from "../components/common/Seo";
import { PageIntro } from "../components/ui/PageIntro";
import { Section } from "../components/ui/Section";
import { Container } from "../components/ui/Container";
import { ContactForm } from "../features/contact/components/ContactForm";
import { siteConfig } from "../data/site";
import { cn } from "../lib/cn";

export default function ContactPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState("");

  // Determine current opening status of the café
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeInMinutes = hours * 60 + minutes;

      // Format time display
      const pad = (n) => (n < 10 ? "0" + n : n);
      setCurrentTimeStr(`${pad(hours)}h${pad(minutes)}`);

      if (day >= 1 && day <= 5) {
        // Monday - Friday: 8h30 - 18h00
        const start = 8 * 60 + 30;
        const end = 18 * 60;
        setIsOpen(timeInMinutes >= start && timeInMinutes <= end);
      } else {
        // Saturday - Sunday: 9h00 - 18h30
        const start = 9 * 60;
        const end = 18 * 60 + 30;
        setIsOpen(timeInMinutes >= start && timeInMinutes <= end);
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Seo
        description="Une question sur notre menu brunch, nos lattes signatures ou envie de collaborer ? Contactez l'équipe Maison Saha."
        title="Contact & Horaires"
      />

      <PageIntro
        eyebrow="Conciergerie & Salon"
        text="Que ce soit pour réserver pour un grand groupe, poser une question sur nos allergènes ou simplement nous envoyer un mot doux, notre équipe vous répond avec grand plaisir."
        title="Restons en contact."
      />

      <Section className="bg-sand text-ink pt-8 pb-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            
            {/* Left Column: Beautiful Contact & Hours Card (Span 5) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Luxury Business Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-[#78281a] to-[#4d170f] p-8 text-cream shadow-xl border border-white/10"
              >
                {/* Visual copper ring backdrop */}
                <div className="absolute -right-16 -top-16 size-48 rounded-full border border-white/5" />
                <div className="absolute -right-24 -top-24 size-64 rounded-full border border-white/10 rotate-45" />

                <div className="relative z-10 space-y-8">
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-saffron opacity-85">
                        Coffee Shop & Brunch
                      </span>
                      <h3 className="font-display text-3xl tracking-tight mt-1">Maison Saha</h3>
                    </div>
                    <div className="flex size-11 items-center justify-center rounded-full bg-white/10 text-saffron text-sm font-bold font-display backdrop-blur-md">
                      MS
                    </div>
                  </div>

                  {/* Dynamic Open Status Pill */}
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md border border-white/5">
                    <span className={cn(
                      "relative flex size-2 shrink-0 rounded-full",
                      isOpen ? "bg-emerald-400" : "bg-orange-400"
                    )}>
                      {isOpen && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      )}
                    </span>
                    <span>
                      {isOpen ? "Ouvert actuellement" : "Fermé actuellement"} • {currentTimeStr}
                    </span>
                  </div>

                  {/* Direct Contact Details */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="group flex items-center gap-3.5 text-sm hover:text-saffron transition-colors"
                    >
                      <span className="flex size-9 items-center justify-center rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                        <Mail className="size-4.5" />
                      </span>
                      <div>
                        <span className="block text-[0.6rem] uppercase tracking-wider opacity-60">Adresse e-mail</span>
                        <span className="font-semibold">{siteConfig.email}</span>
                      </div>
                    </a>

                    <a
                      href={`tel:${siteConfig.phoneHref}`}
                      className="group flex items-center gap-3.5 text-sm hover:text-saffron transition-colors"
                    >
                      <span className="flex size-9 items-center justify-center rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                        <Phone className="size-4.5" />
                      </span>
                      <div>
                        <span className="block text-[0.6rem] uppercase tracking-wider opacity-60">Téléphone de la maison</span>
                        <span className="font-semibold">{siteConfig.phoneDisplay}</span>
                      </div>
                    </a>

                    <a
                      href={siteConfig.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3.5 text-sm hover:text-saffron transition-colors"
                    >
                      <span className="flex size-9 items-center justify-center rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                        <Instagram className="size-4.5" />
                      </span>
                      <div>
                        <span className="block text-[0.6rem] uppercase tracking-wider opacity-60">Instagram officiel</span>
                        <span className="font-semibold">{siteConfig.instagramHandle}</span>
                      </div>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Horaires d'Ouverture Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-[2.5rem] border border-ink/8 bg-white/60 p-8 shadow-xs"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="size-5 text-terracotta" />
                  <h4 className="font-display text-2xl text-ink">Horaires d'Ouverture</h4>
                </div>

                <div className="space-y-4">
                  {siteConfig.hours.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm py-2 border-b border-ink/5 last:border-0">
                      <span className="font-semibold text-ink/75">{item.days}</span>
                      <span className="font-mono text-terracotta font-bold">{item.hours}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-terracotta/5 p-4 text-xs text-ink/65 flex gap-2.5">
                  <AlertCircle className="size-4.5 text-terracotta shrink-0 mt-0.5" />
                  <p>
                    <strong>Cuisine all-day :</strong> Notre cuisine ferme ses fourneaux 30 minutes avant la fermeture de la maison. Les lattes et boissons restent disponibles jusqu'à l'heure de fermeture.
                  </p>
                </div>
              </motion.div>

            </div>

            {/* Right Column: Premium Form (Span 7) */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-[2.5rem] bg-cream p-8 sm:p-12 shadow-sm border border-ink/5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="size-5 text-terracotta" />
                  <h3 className="font-display text-3xl sm:text-4xl text-ink">
                    Écrivez à la Maison
                  </h3>
                </div>
                <p className="mb-8 text-sm leading-relaxed text-ink/60 max-w-lg">
                  Une question sur les allergènes, une demande pour un grand groupe ou envie de collaborer avec nous ? Remplissez ce formulaire et notre équipe vous répondra sous 48h.
                </p>
                <ContactForm />
              </motion.div>
            </div>

          </div>
        </Container>
      </Section>

      {/* Google Maps Section */}
      <section className="bg-cream py-16 sm:py-24 border-t border-ink/5">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta">Nous situer</span>
            <h3 className="font-display text-3xl sm:text-4xl text-ink mt-1">Au cœur de Paris</h3>
            <p className="text-sm leading-relaxed text-ink/60 mt-4">
              Maison Saha se trouve au <strong>{siteConfig.address.street}, {siteConfig.address.postcode} {siteConfig.address.city}</strong> ({siteConfig.address.district}).
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] border border-ink/8 shadow-md">
            {/* Embedded interactive Google Map with subtle custom style */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2882200880194!2d2.350849315674844!3d48.871804979288864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e13e5b38eb1%3A0xc34571de99dbb6bf!2s24%20Rue%20du%20Faubourg%20Saint-Denis%2C%2075010%20Paris!5e0!3m2!1sfr!2sfr!4v1656500000000!5m2!1sfr!2sfr"
              width="100%"
              height="450"
              style={{ border: 0, filter: "contrast(1.04) grayscale(0.1)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Plan d'accès Maison Saha"
            />

            {/* Floating Quick Route Card */}
            <div className="absolute bottom-6 left-6 right-6 sm:left-8 sm:right-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl max-w-sm border border-ink/5 space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                  <TrainFront className="size-5" />
                </span>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-ink/40">Accès Métro</h5>
                  <p className="text-sm font-semibold text-ink">{siteConfig.address.metro}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-pistachio/15 text-ink">
                  <Compass className="size-5" />
                </span>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-ink/40">À pied</h5>
                  <p className="text-sm font-semibold text-ink">À 2 minutes de la station de métro</p>
                </div>
              </div>

              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-full bg-ink py-3 text-xs font-bold uppercase tracking-wider text-cream hover:bg-ink/90 transition-colors shadow-xs"
              >
                <span>Ouvrir dans Google Maps</span>
                <Compass className="size-4" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Large CTA Section */}
      <section className="relative overflow-hidden bg-ink text-cream py-20 sm:py-28">
        <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-white/5 to-transparent pointer-events-none" />
        
        {/* Decorative Copper Circles */}
        <div className="absolute -left-32 -bottom-32 size-[400px] rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute -right-32 -top-32 size-[400px] rounded-full border border-white/5 pointer-events-none" />

        <Container className="relative z-10 text-center max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-saffron">Votre table vous attend</span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight mt-3">
            Venez partager un moment de vie.
          </h2>
          <p className="text-sm leading-relaxed text-cream/70 mt-6 max-w-lg mx-auto font-light">
            Pas de réservation requise pour les tables individuelles. Venez comme vous êtes, nous nous occupons du reste. Pour les groupes de plus de 8 personnes, contactez-nous via le formulaire ci-dessus.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/menu"
              className="flex items-center justify-center gap-2 rounded-full bg-saffron px-8 py-4.5 text-xs font-bold uppercase tracking-wider text-ink hover:bg-saffron/90 active:scale-[0.98] transition-all shadow-md"
            >
              Découvrir la carte
            </a>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4.5 text-xs font-bold uppercase tracking-wider text-cream hover:bg-white/10 active:scale-[0.98] transition-all"
            >
              Itinéraire immédiat
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
