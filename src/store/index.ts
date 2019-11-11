import { combineReducers, createStore } from 'redux';
import { systemReducer } from './system/reducers';
import { cartReducer } from './cart/reducers';

const rootReducer = combineReducers({
  system: systemReducer,
  cart: cartReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);