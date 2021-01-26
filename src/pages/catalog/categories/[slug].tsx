import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';
import PrismicDOM from 'prismic-dom';

import { client } from '@/lib/prismic';

import SEO from '@/components/SEO';

import { Container } from '@/styles/pages/top10';

// interface IProduct {
//   id: string;
//   title: string;
// }

interface CategoryProps {
  category: Document;
  products: Document[];
}

export default function Category({ category, products }: CategoryProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      <SEO title="Categories" />

      <section>
        <h1>{PrismicDOM.RichText.asText(category.data.title)}</h1>

        <ul>
          {products.map((product) => {
            return (
              <li key={product.id}>
                <Link href={`/catalog/products/${product.uid}`}>
                  {PrismicDOM.RichText.asText(product.data.title)}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await client().query([
    Prismic.Predicates.at('document.type', 'category'),
  ]);

  // const apiUrl = process.env.API_URL + `/categories`;
  // const response = await fetch(apiUrl);
  // const categories = await response.json();

  const paths = categories.results.map((category: Document) => {
    return {
      params: { slug: category.uid },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CategoryProps> = async (
  context
) => {
  const { slug } = context.params;

  const category = await client().getByUID('category', String(slug), {});

  const products = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
    Prismic.Predicates.at('my.product.category', category.id),
  ]);

  // const apiUrl = process.env.API_URL + `/products?category_id=${slug}`;
  // const response = await fetch(apiUrl);
  // const products = await response.json();

  return {
    props: {
      category,
      products: products.results,
    },
    revalidate: 60,
  };
};
