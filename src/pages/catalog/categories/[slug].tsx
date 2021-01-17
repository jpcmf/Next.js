import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Container } from "@/styles/pages/top10";

interface IProduct {
  id: string;
  title: string;
}

interface CategoryProps {
  products: IProduct[];
}

export default function Category({ products }: CategoryProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      <section>
        <h1>{router.query.slug}</h1>
        <ul>
          {products.map((product) => {
            return (
              <li key={product.id}>
                <p>{product.title}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apiUrl = process.env.API_URL + `/categories`;
  const response = await fetch(apiUrl);
  const categories = await response.json();

  const paths = categories.map((category: { id: any }) => {
    return {
      params: { slug: category.id },
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

  const apiUrl = process.env.API_URL + `/products?category_id=${slug}`;
  const response = await fetch(apiUrl);
  const products = await response.json();

  return {
    props: {
      products,
    },
    revalidate: 60,
  };
};
