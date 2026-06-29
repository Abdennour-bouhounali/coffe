import { AnimatePresence, motion } from "motion/react";
import { Outlet, useLocation } from "react-router-dom";
import { pageTransition } from "../lib/animations";
import { RouteScrollManager } from "../components/common/RouteScrollManager";
import { SkipLink } from "../components/common/SkipLink";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { MobileActionBar } from "../components/layout/MobileActionBar";

export function SiteLayout() {
  const location = useLocation();

  return (
    <>
      <SkipLink />
      <RouteScrollManager />
      <Header />
      <AnimatePresence>
        <motion.main
          key={location.pathname}
          id="contenu"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeOut" } }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <MobileActionBar />
    </>
  );
}
