import { useToastCommand } from "../../../components";
import { useAutoCallback } from "@hanghae-plus/lib";
import type { Product } from "../../products";
import { useCartUseCase } from "../useCartUseCase";

export const useCartAddCommand = () => {
  const { addToCart } = useCartUseCase();
  const toast = useToastCommand();
  return useAutoCallback((product: Product, quantity = 1) => {
    addToCart(product, quantity);
    toast.show("장바구니에 추가되었습니다", "success");
  });
};
