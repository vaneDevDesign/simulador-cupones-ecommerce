import {
  createContext,
  useReducer,
  type ReactNode,
  type Dispatch,
} from "react";
import type { CartItem } from "../types/Cart";

type State = {
  cart: CartItem[];
};

type Action =
  | { type: "ADD_TO_CART"; payload: string }
  | { type: "INCREASE"; payload: string }
  | { type: "DECREASE"; payload: string };

const initialState: State = {
  cart: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cart.find(
        (item) => item.productId === action.payload
      );

      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.productId === action.payload
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { productId: action.payload, quantity: 1 }],
        };
      }
    }

    case "INCREASE": {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.productId === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    case "DECREASE": {
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.productId === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    }

    default:
      return state;
  }
}

export const CartContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
