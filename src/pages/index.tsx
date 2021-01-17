// import { useEffect, useState } from 'react';
import { GetServerSideProps } from "next";
import { Container } from "@/styles/pages/home";

// TODO: CLIENT SIDE FETHING
interface IProduct {
  id: string;
  title: string;
}

// TODO: SERVER SIDE FETHING
interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  // TODO: CLIENT SIDE FETHING
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

// TODO: SERVER SIDE FETHING
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
