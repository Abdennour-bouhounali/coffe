import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function RouteScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [hash, pathname]);

  return null;
}
