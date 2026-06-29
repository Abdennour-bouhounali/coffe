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
      <AnimatePresence mode="wait">
        <motion.main
          animate="animate"
          exit="exit"
          id="contenu"
          initial="initial"
          key={location.pathname}
          variants={pageTransition}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <MobileActionBar />
    </>
  );
}
