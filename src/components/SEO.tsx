import Head from "next/head";

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  shouldExcludeTitleSuffix?: boolean;
  shouldIndexPage?: boolean;
}

export default function SEO({
  title,
  description,
  image,
  shouldExcludeTitleSuffix = false,
  shouldIndexPage = true,
}: SEOProps) {
  const pageTitle = `${title} ${
    !shouldExcludeTitleSuffix ? "| Devnation" : ""
  }`;
  const pageImage = image ? process.env.API_URL + `/${image}` : null;

  return (
    <Head>
      <title>{pageTitle}</title>

      {description && <meta name="description" content={description} />}
      {image && <meta name="image" content={pageImage} />}

      {!shouldIndexPage && <meta name="robots" content="noindex, nofollow" />}
    </Head>
  );
}
