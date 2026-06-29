import { ArrowUpRight, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { footerNavigation, siteConfig } from "../../data/site";
import { formatAddress } from "../../lib/format";
import { Container } from "../ui/Container";
import { Logo } from "../common/Logo";

export function Footer() {
  return (
    <footer className="bg-ink pb-28 pt-16 text-cream sm:pb-12 sm:pt-24">
      <Container>
        <div className="grid gap-14 border-b border-cream/15 pb-14 lg:grid-cols-[1.35fr_1fr_1fr]">
          <div>
            <Logo className="text-4xl" light />
            <p className="mt-6 max-w-md text-lg leading-8 text-cream/60">
              Café de spécialité, brunchs solaires et douceur de vivre à Paris.
            </p>
            <a
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold underline decoration-cream/25 underline-offset-6 transition-colors hover:decoration-cream"
              href={siteConfig.instagramUrl}
              rel="noreferrer"
              target="_blank"
            >
              <Instagram aria-hidden="true" className="size-4" />
              {siteConfig.instagramHandle}
            </a>
          </div>

          {footerNavigation.map((group) => (
            <nav aria-label={group.title} key={group.title}>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-cream/45">
                {group.title}
              </p>
              <ul className="space-y-3">
                {group.links.map((item) => (
                  <li key={`${group.title}-${item.to}`}>
                    <Link
                      className="text-base text-cream/75 transition-colors hover:text-cream"
                      to={item.to}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="grid gap-10 border-b border-cream/15 py-12 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-cream/45">
              La maison
            </p>
            <a
              className="group inline-flex items-start gap-2 text-cream/80 hover:text-cream"
              href={siteConfig.mapsUrl}
              rel="noreferrer"
              target="_blank"
            >
              {formatAddress(siteConfig.address)}
              <ArrowUpRight
                aria-hidden="true"
                className="mt-0.5 size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <p className="mt-2 text-sm text-cream/50">
              Métro {siteConfig.address.metro}
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-cream/45">
              Horaires
            </p>
            {siteConfig.hours.map((item) => (
              <p className="text-sm leading-7 text-cream/75" key={item.days}>
                {item.days} · {item.hours}
              </p>
            ))}
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-cream/45">
              Bonjour
            </p>
            <a
              className="block text-sm leading-7 text-cream/75 hover:text-cream"
              href={`mailto:${siteConfig.email}`}
            >
              {siteConfig.email}
            </a>
            <a
              className="block text-sm leading-7 text-cream/75 hover:text-cream"
              href={`tel:${siteConfig.phoneHref}`}
            >
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Maison Saha</p>
          <p>Fait avec soin, servi avec le sourire.</p>
        </div>
      </Container>
    </footer>
  );
}
