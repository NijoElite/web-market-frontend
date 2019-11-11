import { CartState, CartActionTypes } from './types';

const initialState: CartState = {
  items: [],
};

export const cartReducer = (state: CartState = initialState, action: CartActionTypes): CartState => {
  switch (action) {
    default:
      return state;
  }
};
