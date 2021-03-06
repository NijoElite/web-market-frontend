// #region State
export interface CartItem {
  article: string;
  qty: number;
}

export interface CartState {
  items: CartItem[];
}
// #endregion

// #region Constants
export const ADD_ITEM_IN_CART = 'ADD_ITEM_IN_CART';
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
export const UPDATE_CART_ITEM_QTY = 'UPDATE_CART_ITEM_QT';
export const CLEAR_CART = 'CLEAR_CART';
// #endregion

// #region Actions
export interface AddItemInCart {
  type: typeof ADD_ITEM_IN_CART;
  payload: {
    artilce: string;
  };
}

export interface DeleteCartItem {
  type: typeof DELETE_CART_ITEM;
  payload: {
    artilce: string;
  };
}

export interface UpdateCartItemQty {
  type: typeof UPDATE_CART_ITEM_QTY;
  payload: {
    artilce: string;
    qty: number;
  };
}

export interface ClearCart {
  type: typeof CLEAR_CART;
}
// #endregion

export type CartActionTypes = AddItemInCart | DeleteCartItem | UpdateCartItemQty | ClearCart;
