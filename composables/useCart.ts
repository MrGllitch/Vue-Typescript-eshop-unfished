import type { CartItem, OrderItem, Product } from "@prisma/client";
export const useCart = () => {
  const { addNotification } = useNotification();

  const cartItems = useState<Product[]>("cart_items", () => []);

  async function addItem(productId: number): Promise<boolean> {
    const response = await $fetch<{
      data: null;
      message?: string;
      success: boolean;
    }>("/api/cart/addItem", {
      method: "post",
      body: { productId: productId },
    });
    addNotification(
      response.message ?? "No message provided",
      response.success ? "success" : "error"
    );

    updateCart();

    //frontend
    //todo check if there is enought products
    //todo check if not reserved

    return true;
  }

  async function removeItem(productId: number) {
    const response = await $fetch<{
      data: null;
      message?: string;
      success: boolean;
    }>("/api/cart/removeItem", {
      method: "post",
      body: { productId: productId },
    });
    addNotification(
      response.message ?? "No message provided",
      response.success ? "success" : "error"
    );

    updateCart();
  }

  async function updateCart() {
    const dbCartItems = await $fetch("/api/cart/items", { method: "get" });
    cartItems.value = dbCartItems.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }));
  }

  return {
    cartItems,
    addItem,
    removeItem,
    updateCart,
  };
};
