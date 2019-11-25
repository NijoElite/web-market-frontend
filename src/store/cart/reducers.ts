import {
  CartState,
  CartActionTypes,
  ADD_ITEM_IN_CART,
  DELETE_CART_ITEM,
  CartItem,
  UPDATE_CART_ITEM_QTY,
  CLEAR_CART,
} from './types';

const initialState: CartState = {
  items: [],
};

export const cartReducer = (state: CartState = initialState, action: CartActionTypes): CartState => {
  switch (action.type) {
    case ADD_ITEM_IN_CART: {
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
    }

    case DELETE_CART_ITEM: {
      const index = state.items.findIndex(el => el.article === action.payload.artilce);
      const article = action.payload.artilce;

      if (index === -1) {
        return state;
      }

      const newItems: CartItem[] = [];
      state.items.forEach(el => {
        if (el.article !== article) {
          return newItems.push(el);
        }
        if (el.qty - 1 > 0) {
          return newItems.push({ article: el.article, qty: el.qty - 1 });
        }
      });

      return {
        items: newItems,
      };
    }

    case UPDATE_CART_ITEM_QTY: {
      const index = state.items.findIndex(el => el.article === action.payload.artilce);
      const article = action.payload.artilce;

      if (index === -1) {
        return state;
      }

      const newItems: CartItem[] = [];
      state.items.forEach(el => {
        if (el.article !== article) {
          return newItems.push(el);
        }
        if (action.payload.qty > 0) {
          return newItems.push({ article: el.article, qty: action.payload.qty });
        }
      });

      return {
        items: newItems,
      };
    }

    case CLEAR_CART: {
      return {
        ...state,
        items: [],
      };
    }
    default:
      return state;
  }
};
