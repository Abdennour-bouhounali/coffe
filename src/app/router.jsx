import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RouteLoader } from "../components/common/RouteLoader";
import { SiteLayout } from "../layouts/SiteLayout";

const HomePage = lazy(() => import("../pages/HomePage"));
const ConceptPage = lazy(() => import("../pages/ConceptPage"));
const MenuPage = lazy(() => import("../pages/MenuPage"));
const ProductDetailPage = lazy(() => import("../pages/ProductDetailPage"));
const GalleryPage = lazy(() => import("../pages/GalleryPage"));
const FindUsPage = lazy(() => import("../pages/FindUsPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

function load(Component) {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Component />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { index: true, element: load(HomePage) },
      { path: "concept", element: load(ConceptPage) },
      { path: "menu", element: load(MenuPage) },
      { path: "menu/:productId", element: load(ProductDetailPage) },
      { path: "galerie", element: load(GalleryPage) },
      { path: "nous-trouver", element: load(FindUsPage) },
      { path: "contact", element: load(ContactPage) },
      { path: "*", element: load(NotFoundPage) },
    ],
  },
]);
