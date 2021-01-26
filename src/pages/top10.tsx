import { GetStaticProps } from 'next';
import { Container } from '@/styles/pages/top10';
import SEO from '@/components/SEO';

interface IProduct {
  id: string;
  title: string;
}

interface Top10Props {
  products: IProduct[];
}

export default function TopProducts({ products }: Top10Props) {
  return (
    <Container>
      {/* <SEO title="Top 10 Products" />
      <section>
        <h1>Top 10</h1>
        <ul>
          {products.map((product) => {
            return (
              <li key={product.id}>
                <p>{product.title}</p>
              </li>
            );
          })}
        </ul>
      </section> */}
    </Container>
  );
}

// TODO: STATIC SITE GENERATION
// export const getStaticProps: GetStaticProps<Top10Props> = async (context) => {
//   const apiUrl = process.env.API_URL + "/products";
//   const response = await fetch(apiUrl);
//   const products = await response.json();

//   return {
//     props: {
//       products,
//     },
//     revalidate: 60,
//   };
// };
