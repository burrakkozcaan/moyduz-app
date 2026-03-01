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

/** Tüm ImageObject'lere standart telif/lisans meta verilerini ekler */
function buildImageObject(params: {
  url: string;
  width?: number;
  height?: number;
  caption?: string;
  creator?: object;
  copyrightHolder?: object;
}) {
  return {
    "@type": "ImageObject",
    url: params.url,
    ...(params.width ? { width: params.width } : {}),
    ...(params.height ? { height: params.height } : {}),
    ...(params.caption ? { caption: params.caption } : {}),
    ...(params.creator ? { creator: params.creator } : {}),
    ...(params.copyrightHolder ? { copyrightHolder: params.copyrightHolder } : {}),
    copyrightNotice: `© ${new Date().getFullYear()} Moyduz. All rights reserved.`,
    creditText: "Moyduz",
    acquireLicensePage: `${SITE_URL}/terms-of-service`,
    license: `${SITE_URL}/terms-of-service`,
  };
}

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

// AggregateRating: Gerçek kullanıcı yorumlarına dayalı değer eklendiğinde buraya eklenecek.
// Google politikası gereği uydurma değer kullanılmamalıdır.

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
    logo: buildImageObject({
      url: LOGO_URL,
      width: 512,
      height: 512,
      caption: `${BRAND} Logo`,
      creator: { "@type": "Organization", name: LEGAL_NAME },
      copyrightHolder: { "@type": "Organization", name: LEGAL_NAME },
    }),
    image: buildImageObject({
      url: LOGO_URL,
      width: 512,
      height: 512,
      caption: `${BRAND} Logo`,
      creator: { "@type": "Organization", name: LEGAL_NAME },
      copyrightHolder: { "@type": "Organization", name: LEGAL_NAME },
    }),
    description:
      "Moyduz, Türkiye merkezli e-ticaret altyapısı ve yazılım geliştirme ajansıdır. Komisyonsuz mağazalar, B2B fiyatlandırma ve özel yazılım çözümleri.",
    email: "info@moyduz.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "İstanbul",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
    foundingDate: "2020",
    numberOfEmployees: { "@type": "QuantitativeValue", value: "10-50" },
    areaServed: {
      "@type": "Place",
      name: "Dünya Geneli",
      description: "150'den fazla ülkede işletmelere hizmet veriyoruz",
    },
    sameAs: [
      "https://www.linkedin.com/company/moyduz",
      "https://x.com/moyduz",
      "https://www.facebook.com/moyduz",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Müşteri Hizmetleri",
      email: "info@moyduz.com",
      areaServed: "Dünya Geneli",
      availableLanguage: ["Türkçe", "İngilizce"],
    },
    knowsAbout: [
      "Web Tasarımı",
      "Yazılım Geliştirme",
      "E-Ticaret Geliştirme",
      "Arama Motoru Optimizasyonu",
      "Yapay Zeka",
      "Dijital Pazarlama",
      "SaaS Geliştirme",
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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?category={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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
    inLanguage: "tr-TR",
    isPartOf: { "@type": "WebSite", name: BRAND, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: LEGAL_NAME,
      url: SITE_URL,
      logo: buildImageObject({ url: LOGO_URL, width: 512, height: 512, caption: `${BRAND} Logo`, creator: { "@type": "Organization", name: LEGAL_NAME }, copyrightHolder: { "@type": "Organization", name: LEGAL_NAME } }),
    },
  };

  if (params.datePublished) base.datePublished = params.datePublished;
  if (params.dateModified) base.dateModified = params.dateModified;

  if (image) {
    base.image = buildImageObject({
      url: image.url,
      width: image.width ?? 1200,
      height: image.height ?? 630,
      caption: image.alt || title,
      creator: { "@type": "Organization", name: LEGAL_NAME },
      copyrightHolder: { "@type": "Organization", name: LEGAL_NAME },
    });
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
    inLanguage: "tr-TR",
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
    data.image = buildImageObject({
      url: image.url,
      width: image.width ?? 1200,
      height: image.height ?? 630,
      caption: title,
      creator: { "@type": "Organization", name: LEGAL_NAME },
      copyrightHolder: { "@type": "Organization", name: LEGAL_NAME },
    });
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
        addressLocality: "İstanbul",
        addressRegion: "İstanbul",
        addressCountry: "TR",
      },
      email: "info@moyduz.com",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      serviceType: category,
    },
  };

  if (image) {
    data.image = buildImageObject({
      url: image.url,
      width: image.width ?? 1200,
      height: image.height ?? 630,
      caption: image.alt || name,
      creator: { "@type": "Organization", name: LEGAL_NAME },
      copyrightHolder: { "@type": "Organization", name: LEGAL_NAME },
    });
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
      "Ölçeklenebilir e-ticaret platformları, özel SaaS ürünleri ve yapay zeka otomasyon çözümleri sunan tam kapsamlı yazılım geliştirme platformu ve web tasarım ajansı.",
    applicationCategory: "WebApplication",
    operatingSystem: ["Web Tarayıcı", "iOS", "Android"],
    inLanguage: "tr-TR",
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
      "Türkiye merkezli e-ticaret altyapısı ve yazılım geliştirme ajansı. Komisyonsuz mağazalar, B2B fiyatlandırma ve özel yazılım çözümleri.",
    image: LOGO_URL,
    email: "info@moyduz.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "İstanbul",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.0082,
      longitude: 28.9784,
    },
    areaServed: {
      "@type": "Place",
      name: "Dünya Geneli",
      description: "150'den fazla ülkede işletmelere hizmet veriyoruz",
    },
    sameAs: [
      "https://www.linkedin.com/company/moyduz",
      "https://x.com/moyduz",
      "https://www.facebook.com/moyduz",
    ],
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
 * WEB APPLICATION (TOOLS)
 * ------------------------*/
export function buildWebApplicationToolSchema(params: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
}) {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebApplication",
    name: params.name,
    description: params.description,
    url: params.url,
    applicationCategory: params.applicationCategory ?? "FinanceApplication",
    operatingSystem: "Web Browser",
    inLanguage: "tr-TR",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "TRY",
    },
    author: {
      "@type": "Organization",
      name: LEGAL_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: LEGAL_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: LOGO_URL, width: 512, height: 512 },
    },
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
    jobTitle = "E-Ticaret & Yazılım Ajansı",
    url = `${SITE_URL}/about`,
    sameAs = ["https://www.linkedin.com/company/moyduz"],
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
