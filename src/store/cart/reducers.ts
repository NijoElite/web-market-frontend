import { CartState, CartActionTypes, ADD_ITEM_IN_CART } from './types';

const initialState: CartState = {
  items: [],
};

export const cartReducer = (state: CartState = initialState, action: CartActionTypes): CartState => {
  switch (action.type) {
    case ADD_ITEM_IN_CART:
      const index = state.items.findIndex(el => el.article === action.payload.artilce);
      const article = action.payload.artilce;

      if (index === -1) {
        return {
          items: state.items.concat({ article: article, qty: 1 }),
        };
      }

      const newItems = state.items.map(el => {
        if (el.article !== article) {
          return el;
        }

        return { article: el.article, qty: el.qty + 1 };
      });

      return {
        items: newItems,
      };

    default:
      return state;
  }
};
