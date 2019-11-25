import {
  AddItemInCart,
  DeleteCartItem,
  UpdateCartItemQty,
  ADD_ITEM_IN_CART,
  DELETE_CART_ITEM,
  UPDATE_CART_ITEM_QTY,
  ClearCart,
  CLEAR_CART,
} from './types';

export const addItemInCart = (article: string): AddItemInCart => {
  return {
    type: ADD_ITEM_IN_CART,
    payload: {
      artilce: article,
    },
  };
};

export const deleteCartItem = (article: string): DeleteCartItem => {
  return {
    type: DELETE_CART_ITEM,
    payload: {
      artilce: article,
    },
  };
};

export const updateCartItemQty = (article: string, qty: number): UpdateCartItemQty => {
  return {
    type: UPDATE_CART_ITEM_QTY,
    payload: {
      artilce: article,
      qty: qty,
    },
  };
};

export const clearCart = (): ClearCart => {
  return {
    type: CLEAR_CART,
  };
};
