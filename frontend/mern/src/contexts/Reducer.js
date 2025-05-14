const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
};

export const addToCart = (product) => ({
  type: 'ADD_ITEM',
  payload: product,
});

export const removecartitem = (id) => ({
  type: 'REMOVE_ITEM',
  payload: id,
});

export const incrementQuantity = (id) => ({
  type: 'INCREMENT_QUANTITY',
  payload: id,
});

export const decrementQuantity = (id) => ({
  type: 'DECREMENT_QUANTITY',
  payload: id,
});


const cartReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      newState = {
        ...state,
        items: existingItem
          ? state.items.map(item =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.items, { ...action.payload, quantity: 1 }],
      };
      break;

    case 'REMOVE_ITEM':
      newState = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
      break;

    case 'INCREMENT_QUANTITY':
      newState = {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
      break;

    case 'DECREMENT_QUANTITY':
      newState = {
        ...state,
        items: state.items
          .map(item =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0),
      };
      break;

    default:
      newState = state;
  }

  localStorage.setItem('cartItems', JSON.stringify(newState.items));
  return newState;
};


export default cartReducer;