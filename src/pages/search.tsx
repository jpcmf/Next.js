import { FormEvent, useCallback, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';
import PrismicDOM from 'prismic-dom';

import { client } from '@/lib/prismic';

import SEO from '@/components/SEO';

import { Container } from '@/styles/pages/home';

interface SearchProps {
  searchResults: Document[];
}

export default function Search({ searchResults }: SearchProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSearch = useCallback(
    async (e: FormEvent) => {
      try {
        e.preventDefault();

        router.push(`/search?q=${encodeURIComponent(search)}`);

        setSearch('');
      } catch (err) {
        console.log(err);
      }
    },
    [search]
  );

  return (
    <Container>
      <SEO title="Search" />

      <section>
        <h1>Search</h1>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <ul>
          {searchResults.map((product) => {
            return (
              <li key={product.id}>
                <Link href={`/catalog/products/${product.uid}`}>
                  {PrismicDOM.RichText.asText(product.data.title)}
                </Link>
              </li>
            );
          })}

          {searchResults.length <= 0 && <li>Nenhum produto encontrado!</li>}
        </ul>
      </section>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<SearchProps> = async (
  context
) => {
  const { q } = context.query;

  if (!q) {
    return { props: { searchResults: [] } };
  }

  const searchResults = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
    Prismic.Predicates.fulltext('my.product.title', String(q)),
  ]);

  return {
    props: {
      searchResults: searchResults.results,
    },
  };
};
