import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { buildCanonicalUrl, buildTitle } from "../../lib/seo";
import { siteConfig } from "../../data/site";

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

export function Seo({ title, description = siteConfig.description, schema }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const canonicalUrl = buildCanonicalUrl(pathname);
    document.title = buildTitle(title);
    document.documentElement.lang = "fr";

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: description,
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: buildTitle(title),
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const schemaId = "page-schema";
    const previousSchema = document.getElementById(schemaId);
    previousSchema?.remove();

    if (schema) {
      const script = document.createElement("script");
      script.id = schemaId;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => document.getElementById(schemaId)?.remove();
  }, [description, pathname, schema, title]);

  return null;
}
