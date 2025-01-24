import Head from "next/head";

interface SeoProps {
  pageTitle?: string;
  metaDescription?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
}

const SITE_NAME = "feliztoursegypt";
const BASE_URL = "https://feliztoursegypt.com";

const Seo: React.FC<SeoProps> = ({
  pageTitle = "Page",
  metaDescription = "Discover amazing tours and travel experiences in Egypt with Feliz Tours Egypt.",
  keywords = "Egypt, book tours, travel, ancient Egypt, history tours",
  ogImage = `${BASE_URL}/default-og-image.png`,
  ogUrl = BASE_URL,
  ogTitle = "Feliz Tours Egypt",
  ogDescription = "Explore the rich history of Egypt with Feliz Tours Egypt tours.",
}) => (
  <>
    <Head>
      <title>
        {pageTitle} | {SITE_NAME}
      </title>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={metaDescription} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="Feliz Tours Egypt" content={SITE_NAME} />
      <link rel="icon" href={`${BASE_URL}/favicon.ico`} />
      <link rel="canonical" href={ogUrl} />

      <meta property="og:title" content={ogTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:image:alt"
        content={pageTitle ? `${pageTitle} | ${SITE_NAME}` : SITE_NAME}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: BASE_URL,
            name: SITE_NAME,
            description: metaDescription,
            publisher: {
              "@type": "Organization",
              name: SITE_NAME,
            },
            logo: `${BASE_URL}/logo.png`,
          }),
        }}
      />
    </Head>
  </>
);

export default Seo;
