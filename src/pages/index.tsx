// import { useEffect, useState } from 'react';
import { GetServerSideProps } from "next";
import { Container } from "@/styles/pages/home";
import SEO from "@/components/SEO";

// TODO: CLIENT SIDE FETCHING
interface IProduct {
  id: string;
  title: string;
}

// TODO: SERVER SIDE FETCHING
interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  // TODO: CLIENT SIDE FETCHING
  // const apiUrl = process.env.API_URL + '/recommended';
  // const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);

  // useEffect(() => {
  //   fetch(apiUrl).then(response => {
  //     response.json().then(data => {
  //       setRecommendedProducts(data);
  //     })
  //   })
  // }, []);

  return (
    <Container>
      <SEO
        title="The place for Devnation!"
        image="teste.jpg"
        shouldExcludeTitleSuffix
      />

      <h1>Hello Next.js</h1>

      <section>
        <h1>Products</h1>

        <ul>
          {recommendedProducts.map((recommendedProduct) => {
            return (
              <li key={recommendedProduct.id}>
                <p>{recommendedProduct.title}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </Container>
  );
}

// TODO: SERVER SIDE FETCHING
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const apiUrl = process.env.API_URL + "/recommended";
  const response = await fetch(apiUrl);
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    },
  };
};
