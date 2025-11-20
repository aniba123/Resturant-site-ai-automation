


// src/context/CartContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Cart actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  TOGGLE_CHATBOT: 'TOGGLE_CHATBOT',
  SET_ORDER_STATUS: 'SET_ORDER_STATUS',
  LOAD_CART: 'LOAD_CART' // New action for loading cart
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM:
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
      };

    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload)
      };

    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        cartItems: []
      };

    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        cartItems: action.payload || []
      };

    case CART_ACTIONS.TOGGLE_CHATBOT:
      return {
        ...state,
        isChatbotOpen: !state.isChatbotOpen
      };

    case CART_ACTIONS.SET_ORDER_STATUS:
      return {
        ...state,
        orderStatus: action.payload
      };

    default:
      return state;
  }
};

const initialState = {
  cartItems: [],
  isChatbotOpen: false,
  orderStatus: 'idle' // 'idle', 'processing', 'success', 'error'
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('restaurant-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Use the new LOAD_CART action instead of multiple ADD_ITEM dispatches
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        // Clear corrupted cart data
        localStorage.removeItem('restaurant-cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('restaurant-cart', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const addItem = (item) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: item });
  };

  const removeItem = (itemId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: itemId });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
    // Also remove from localStorage immediately
    localStorage.removeItem('restaurant-cart');
  };

  const toggleChatbot = () => {
    dispatch({ type: CART_ACTIONS.TOGGLE_CHATBOT });
  };

  const setOrderStatus = (status) => {
    dispatch({ type: CART_ACTIONS.SET_ORDER_STATUS, payload: status });
  };

  const getCartTotal = () => {
    return state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value = {
    cartItems: state.cartItems,
    isChatbotOpen: state.isChatbotOpen,
    orderStatus: state.orderStatus,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleChatbot,
    setOrderStatus,
    getCartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};