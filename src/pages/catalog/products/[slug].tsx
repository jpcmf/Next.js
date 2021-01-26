// import { useCallback, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
// import dynamic from 'next/dynamic';

// import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';
import PrismicDOM from 'prismic-dom';

import { client } from '@/lib/prismic';

import SEO from '@/components/SEO';

import { Container } from '@/styles/pages/home';

// const AddToCartModal = dynamic(() => import('@/components/AddToCartModal'), {
//   loading: () => <p>Loading...</p>,
//   //TODO: ssr false enable component load in the client-side (browser)
//   ssr: false,
// });

interface ProductProps {
  product: Document;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <Container>Carregando...</Container>;
  }

  // const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

  // const handleAddToCart = useCallback(() => {
  //   setIsAddToCartModalVisible(true);
  // }, []);

  return (
    <Container>
      <SEO title="Products" />

      <section>
        <h1>{PrismicDOM.RichText.asText(product.data.title)}</h1>

        <img
          src={product.data.thumbnail.url}
          width="250"
          alt={product.data.title}
        />

        <div
          dangerouslySetInnerHTML={{
            __html: PrismicDOM.RichText.asHtml(product.data.description),
          }}
        ></div>

        <p>Price: ${product.data.price}</p>

        {/* <button onClick={handleAddToCart}>Add to cart</button> */}

        {/* {isAddToCartModalVisible && <AddToCartModal />} */}
      </section>
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const { slug } = context.params;

  const product = await client().getByUID('product', String(slug), {});

  return {
    props: {
      product,
    },
    revalidate: 5,
  };
};
