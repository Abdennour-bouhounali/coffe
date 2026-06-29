import { Menu, X, ArrowRight, Instagram, Compass } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NavLink, useLocation } from "react-router-dom";
import { mainNavigation, siteConfig } from "../../data/site";
import { cn } from "../../lib/cn";
import { useScrollLock } from "../../hooks/useScrollLock";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Logo } from "../common/Logo";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  useScrollLock(isOpen);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle header scroll show/hide & backdrop transitions
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add scroll visual class
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide or show navbar based on scroll direction
      if (currentScrollY > 80) {
        if (currentScrollY > lastScrollY) {
          setVisible(false); // scrolling down
        } else {
          setVisible(true); // scrolling up
        }
      } else {
        setVisible(true); // top of page
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Framer motion variants for mobile menu items stagger
  const containerVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 15 },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out border-b",
        scrolled 
          ? "border-ink/8 bg-cream/95 shadow-xs backdrop-blur-xl py-3" 
          : "border-transparent bg-transparent py-5",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <Container className="flex items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1.5">
            {mainNavigation.map((item) => (
              <li key={item.to} className="relative">
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      "relative rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors duration-300",
                      item.featured
                        ? "bg-terracotta text-cream hover:bg-terracotta/95"
                        : isActive
                          ? "text-terracotta"
                          : "text-ink/70 hover:text-ink"
                    )
                  }
                  end={item.to === "/"}
                  to={item.to}
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      {/* Premium animated dot underline */}
                      {isActive && !item.featured && (
                        <motion.span
                          layoutId="active-nav-dot"
                          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-1 rounded-full bg-terracotta"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side Actions */}
        <div className="hidden items-center gap-6 lg:flex">
          <a
            className="text-xs font-bold uppercase tracking-[0.16em] text-ink/65 transition-colors hover:text-ink flex items-center gap-1.5"
            href={siteConfig.instagramUrl}
            rel="noreferrer"
            target="_blank"
          >
            <Instagram className="size-3.5" />
            {siteConfig.instagramHandle}
          </a>
          <Button href={siteConfig.mapsUrl} icon target="_blank" className="text-xs uppercase tracking-wider py-2.5 min-h-10">
            Itinéraire
          </Button>
        </div>

        {/* Hamburger Menu trigger */}
        <button
          aria-expanded={isOpen}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className={cn(
            "grid size-11 place-items-center rounded-full border transition-all duration-300 lg:hidden",
            isOpen 
              ? "border-cream/20 bg-cream text-ink" 
              : "border-ink/15 hover:bg-ink hover:text-cream text-ink"
          )}
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          {isOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </Container>

      {/* Luxury Full-screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-40 h-dvh w-screen bg-linear-to-b from-[#78281a] to-[#42150e] text-cream lg:hidden flex flex-col pt-24"
          >
            {/* Background design elements */}
            <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-white/5 to-transparent pointer-events-none" />
            <div className="absolute -left-16 bottom-0 size-64 rounded-full border border-white/5 pointer-events-none" />

            <Container className="flex flex-1 flex-col justify-between py-8 relative z-10 overflow-y-auto">
              <motion.nav 
                aria-label="Navigation mobile"
                variants={containerVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <ul className="space-y-2">
                  {mainNavigation.map((item, index) => (
                    <motion.li 
                      variants={itemVariants} 
                      key={item.to} 
                      className="border-b border-white/10"
                    >
                      <NavLink
                        className={({ isActive }) => cn(
                          "flex items-center justify-between py-4.5 font-display text-4xl tracking-tight transition-colors",
                          isActive ? "text-saffron" : "text-cream hover:text-saffron"
                        )}
                        end={item.to === "/"}
                        to={item.to}
                      >
                        <span>{item.label}</span>
                        <span className="font-sans text-xs opacity-50 font-bold uppercase tracking-widest">
                          {index < 9 ? `0${index + 1}` : index + 1}
                        </span>
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>

              {/* Bottom Quick Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-8 space-y-6 pt-6 border-t border-white/10"
              >
                <div className="flex gap-4">
                  <a
                    href={siteConfig.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-saffron py-4 text-xs font-bold uppercase tracking-wider text-ink shadow-md active:scale-98 transition-transform"
                  >
                    <Compass className="size-4" />
                    Itinéraire
                  </a>
                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-cream"
                  >
                    <Instagram className="size-5" />
                  </a>
                </div>

                <div className="text-center space-y-1">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-saffron">Maison Saha Paris</p>
                  <p className="text-xs text-cream/60">
                    {siteConfig.address.street}, {siteConfig.address.postcode} {siteConfig.address.city}
                  </p>
                  <p className="text-[0.68rem] text-cream/45">
                    Métro : {siteConfig.address.metro}
                  </p>
                </div>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
