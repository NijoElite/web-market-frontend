import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { systemReducer } from './system/reducers';
import { cartReducer } from './cart/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { errorsReducer } from './errors/reducers';

const rootReducer = combineReducers({
  system: systemReducer,
  cart: cartReducer,
  errors: errorsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, compose(applyMiddleware(thunk), devToolsEnhancer({})));
