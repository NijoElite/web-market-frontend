const initialState = {
  cartItems: [],
  showCartDialog: false,
  showMenu: true,
  checkedOutItems: [],
  loggedInUser: null,
};

interface Action {
  type: string;
  payload?: any;
}

const rootReducer = (state = initialState, action: Action) => state;

export default rootReducer;
