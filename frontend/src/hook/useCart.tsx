import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./useStorage";
import axios from "axios";
import { debounce, reduce } from "lodash";
import { ChangeEvent } from "react";

const useCart = () => {
  const queryClient = useQueryClient();
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  // console.log(userId);

  const { data, ...restQuery } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:8080/carts/${userId}`);

      return data;
    },
  });

  const updateQuantityDebounce = debounce(
    async (productId: string, quantity: number) => {
      await axios.post(`http://localhost:8080/carts/update`, {
        userId,
        productId,
        quantity,
      });
      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
      });
    },
    300
  );

  const { mutate } = useMutation({
    mutationFn: async ({
      action,
      productId,
    }: {
      action: string;
      productId: string | undefined;
    }) => {
      switch (action) {
        case "INCREMENT":
          await axios.post(`http://localhost:8080/carts/increase`, {
            userId,
            productId,
          });
          break;
        case "DECREMENT":
          await axios.post(`http://localhost:8080/carts/decrease`, {
            userId,
            productId,
          });
          break;
        case "REMOVE":
          await axios.post(`http://localhost:8080/carts/delete`, {
            userId,
            productId,
          });
          break;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
      });
    },
  });

  const handleQuantityChange = (
    productId: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const quantity = parseInt(e.target.value);
    updateQuantityDebounce(productId, quantity);
  };

  const calculateTotal = () => {
    if (!data || !data.products) return 0;
    return reduce(
      data.products,
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  return {
    data,
    mutate,
    calculateTotal,
    handleQuantityChange,
    ...restQuery,
  };
};

export default useCart;
