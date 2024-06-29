// Định nghĩa các kiểu dữ liệu
export interface Product {
  id: number;
  title: string;
  newprice: number;
  image: string;
  desc: string;
}

export interface State {
  products: Product[];
}

// Định nghĩa các loại action
export type Action =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: number };

// Khởi tạo state ban đầu
export const initialState: State = {
  products: [],
};

// Reducer cho Product
const productReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "SET_PRODUCTS":
  return { ...state, products: [...action.payload] };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      };
    default:
      return state;
  }
};

export default productReducer;
