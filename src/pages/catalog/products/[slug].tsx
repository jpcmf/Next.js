import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { Container } from "@/styles/pages/home";

const AddToCartModal = dynamic(() => import("@/components/AddToCartModal"), {
  loading: () => <p>Loading...</p>,
  ssr: false, //TODO: ssr false enable component load in the client-side (browser)
});

export default function Product() {
  const router = useRouter();

  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

  const handleAddToCart = useCallback(() => {
    setIsAddToCartModalVisible(true);
  }, []);

  return (
    <Container>
      <h1>{router.query.slug}</h1>

      <button onClick={handleAddToCart}>Add to cart</button>

      {isAddToCartModalVisible && <AddToCartModal />}
    </Container>
  );
}
