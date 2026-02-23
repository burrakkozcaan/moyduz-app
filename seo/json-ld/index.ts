// seo/json-ld/index.ts — Moyduz JSON-LD structured data

export type MoyduzGeo = {
  country: string;
  state?: string | null;
  city?: string | null;
};

export type MoyduzImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

export type MoyduzAuthor = {
  name: string;
  url?: string;
  type?: "Person" | "Organization";
};

export type MoyduzBreadcrumbItem = {
  name: string;
  url?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

const SCHEMA_CONTEXT = "https://schema.org";
const SITE_URL = "https://moyduz.com";
const BRAND = "Moyduz";
const LEGAL_NAME = "Moyduz";
const LOGO_URL = `${SITE_URL}/logo.png`;

export const MOYDUZ_RATING = {
  "@type": "AggregateRating" as const,
  ratingValue: "4.9",
  ratingCount: "850",
  bestRating: "5",
  worstRating: "1",
};

/* -------------------------
 * ORGANIZATION
 * ------------------------*/
export function buildOrganizationSchema() {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Organization",
    name: LEGAL_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 512,
      caption: `${BRAND} Logo`,
    },
    image: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 512,
      caption: `${BRAND} Logo`,
      creator: { "@type": "Organization", name: LEGAL_NAME },
      copyrightHolder: { "@type": "Organization", name: LEGAL_NAME },
      license: `${SITE_URL}/terms-of-service`,
    },
    description:
      "Moyduz is a US-based web design, software development and AI-powered digital agency serving businesses worldwide.",
    email: "info@moyduz.com",
    telephone: "+1-505-460-5392",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1209 Mountain Road Place Northeast, Ste N",
      addressLocality: "Albuquerque",
      addressRegion: "New Mexico",
      postalCode: "87110",
      addressCountry: "US",
    },
    foundingDate: "2020",
    numberOfEmployees: { "@type": "QuantitativeValue", value: "10-50" },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
      description: "Serving businesses globally across 150+ countries",
    },
    sameAs: [
      "https://www.linkedin.com/company/moydus",
      "https://x.com/moydus",
      "https://www.facebook.com/moydus",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-505-460-5392",
      contactType: "Customer Service",
      email: "info@moyduz.com",
      areaServed: "Worldwide",
      availableLanguage: ["English"],
    },
    knowsAbout: [
      "Web Design",
      "Software Development",
      "E-commerce Development",
      "Search Engine Optimization",
      "Artificial Intelligence",
      "Digital Marketing",
      "SaaS Development",
    ],
  };
}

/* -------------------------
 * WEBSITE
 * ------------------------*/
export function buildWebsiteSchema() {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebSite",
    name: BRAND,
    url: `${SITE_URL}/`,
  };
}

/* -------------------------
 * WEBPAGE (GENERIC)
 * ------------------------*/
export function buildWebPageSchema(params: {
  url: string;
  title: string;
  description: string;
  breadcrumbItems?: MoyduzBreadcrumbItem[];
  image?: MoyduzImage;
  datePublished?: string;
  dateModified?: string;
  speakable?: boolean;
  mainEntity?: any;
}) {
  const { url, title, description, breadcrumbItems, image, speakable, mainEntity } = params;

  const base: any = {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebPage",
    url,
    name: title,
    headline: title,
    description,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: BRAND, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: LEGAL_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: LOGO_URL, width: 512, height: 512 },
    },
  };

  if (params.datePublished) base.datePublished = params.datePublished;
  if (params.dateModified) base.dateModified = params.dateModified;

  if (image) {
    base.image = {
      "@type": "ImageObject",
      url: image.url,
      width: image.width ?? 1200,
      height: image.height ?? 630,
      caption: image.alt || title,
    };
  }

  if (speakable) {
    base.speakable = {
      "@type": "SpeakableSpecification",
      xPath: ["/html/head/title", "/html/head/meta[@name='description']/@content"],
    };
  }

  if (breadcrumbItems?.length) {
    base.breadcrumb = buildBreadcrumbSchema(breadcrumbItems);
  }

  if (mainEntity) base.mainEntity = mainEntity;

  return base;
}

/* -------------------------
 * BREADCRUMB
 * ------------------------*/
export function buildBreadcrumbSchema(items: MoyduzBreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

/* -------------------------
 * BLOG POSTING
 * ------------------------*/
export function buildBlogPostingSchema(params: {
  url: string;
  title: string;
  description: string;
  image?: MoyduzImage;
  author: MoyduzAuthor;
  geo?: MoyduzGeo;
  keywords?: string[];
  datePublished: string;
  dateModified?: string;
  readTimeMinutes?: number;
}) {
  const {
    url, title, description, image, author, geo,
    keywords, datePublished, dateModified, readTimeMinutes,
  } = params;

  const data: any = {
    "@context": SCHEMA_CONTEXT,
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: title,
    description,
    articleSection: "Blog",
    datePublished,
    dateModified: dateModified ?? datePublished,
    isAccessibleForFree: true,
    author: {
      "@type": author.type ?? "Person",
      name: author.name,
      ...(author.url ? { url: author.url } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: LEGAL_NAME,
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
  };

  if (image) {
    data.image = {
      "@type": "ImageObject",
      url: image.url,
      width: image.width ?? 1200,
      height: image.height ?? 630,
    };
  }

  if (geo?.city || geo?.country) {
    data.contentLocation = {
      "@type": "Place",
      name: [geo.city, geo.state, geo.country].filter(Boolean).join(", "),
      address: {
        "@type": "PostalAddress",
        addressLocality: geo.city,
        addressRegion: geo.state,
        addressCountry: geo.country,
      },
    };
  }

  if (keywords?.length) data.keywords = keywords.join(", ");
  if (readTimeMinutes) data.timeRequired = `PT${Math.max(1, readTimeMinutes)}M`;

  return data;
}

/* -------------------------
 * SERVICE SCHEMA
 * ------------------------*/
export function buildServiceSchema(params: {
  url: string;
  name: string;
  description: string;
  category: string;
  image?: MoyduzImage;
  priceFrom?: number;
  priceTo?: number;
  currency?: string;
  areaServed?: string | string[];
}) {
  const { url, name, description, category, image } = params;

  const data: any = {
    "@context": SCHEMA_CONTEXT,
    "@type": "Service",
    name,
    description,
    url,
    serviceType: category,
    provider: {
      "@type": "Organization",
      name: LEGAL_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: LOGO_URL, width: 512, height: 512 },
      address: {
        "@type": "PostalAddress",
        streetAddress: "1209 Mountain Road Place Northeast, Ste N",
        addressLocality: "Albuquerque",
        addressRegion: "New Mexico",
        postalCode: "87110",
        addressCountry: "US",
      },
      telephone: "+1-505-460-5392",
      email: "info@moyduz.com",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      serviceType: category,
    },
    aggregateRating: MOYDUZ_RATING,
  };

  if (image) {
    data.image = {
      "@type": "ImageObject",
      url: image.url,
      width: image.width ?? 1200,
      height: image.height ?? 630,
      caption: image.alt || name,
    };
  }

  if (params.priceFrom && params.priceTo && params.currency) {
    data.offers = {
      "@type": "Offer",
      price: params.priceFrom,
      priceCurrency: params.currency,
      availability: "https://schema.org/InStock",
      url,
      seller: { "@type": "Organization", name: LEGAL_NAME },
    };
  }

  return data;
}

/* -------------------------
 * SOFTWARE APPLICATION
 * ------------------------*/
export function buildSoftwareApplicationSchema() {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "SoftwareApplication",
    name: "Moyduz Platform",
    description:
      "Full-service software development platform and web design agency delivering scalable e-commerce platforms, custom SaaS products, and AI automation solutions.",
    applicationCategory: "WebApplication",
    operatingSystem: ["Web Browser", "iOS", "Android"],
    url: SITE_URL,
    author: {
      "@type": "Organization",
      name: LEGAL_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: LOGO_URL, width: 512, height: 512 },
    },
    publisher: {
      "@type": "Organization",
      name: LEGAL_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: LOGO_URL, width: 512, height: 512 },
    },
    aggregateRating: MOYDUZ_RATING,
  };
}

/* -------------------------
 * LOCAL BUSINESS
 * ------------------------*/
export function buildLocalBusinessSchema() {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "LocalBusiness",
    name: LEGAL_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    description:
      "E-Commerce, Social, Web Design & SaaS Agency serving businesses worldwide across 150+ countries.",
    image: LOGO_URL,
    telephone: "+1-505-460-5392",
    email: "info@moyduz.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1209 Mountain Road Place Northeast, Ste N",
      addressLocality: "Albuquerque",
      addressRegion: "New Mexico",
      postalCode: "87110",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 35.091662,
      longitude: -106.558042,
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
      description: "Serving businesses globally across 150+ countries",
    },
    hasMap: [
      "https://maps.app.goo.gl/vG6rKsrURLD7ZfN99",
    ],
    sameAs: [
      "https://www.linkedin.com/company/moydus",
      "https://x.com/moydus",
      "https://www.facebook.com/moydus",
    ],
    aggregateRating: MOYDUZ_RATING,
  };
}

/* -------------------------
 * FAQ PAGE
 * ------------------------*/
export function buildFAQPageSchema(faqs: FaqItem[]) {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

/* -------------------------
 * PERSON SCHEMA
 * ------------------------*/
export function buildPersonSchema(params?: {
  name?: string;
  jobTitle?: string;
  url?: string;
  sameAs?: string[];
}) {
  const {
    name = "Moyduz Team",
    jobTitle = "Software Development & Web Design Agency",
    url = `${SITE_URL}/about`,
    sameAs = ["https://www.linkedin.com/company/moydus"],
  } = params || {};

  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Person",
    name,
    jobTitle,
    url,
    worksFor: { "@type": "Organization", name: LEGAL_NAME, url: SITE_URL },
    sameAs,
  };
}
