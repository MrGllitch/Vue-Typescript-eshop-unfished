import type { OrderItem } from "@prisma/client";
import type { CartItem, Notification } from "~/utils/interfaces";

export const useCart = () => {
	const cartItems = useState<CartItem[]>("cart_items", () => []);

  function addItem (productId: number) : boolean{
    //todo check if there is enought products
    //todo check if not reserved

  const exists = cartItems.value.find((item) => item.productId === productId)
  if(exists !== undefined){
    cartItems.value.push(exists)
  }else{
    cartItems.value.push({productId: productId,quantity: 1})

  }

    return true
  }

  function removeItem(cartItem: CartItem){
    const index = cartItems.value.indexOf(cartItem);
    if (index !== -1) {
      cartItems.value.splice(index, 1);
    } 
  }

	return {
		cartItems,
    addItem,
    removeItem,
	};
};
