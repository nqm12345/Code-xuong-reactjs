import React, {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import instance from "@/axios/services";
import productReducer, { initialState } from "@/reducers/productReducer";

export const ProductContext = createContext<{
  state: any;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

interface ProductContextProviderProps {
  children: ReactNode;
}

const ProductContextProvider: React.FC<ProductContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    if (isFetching) {
      async function fetchData() {
        try {
          const { data } = await instance.get("/products");
          dispatch({ type: "SET_PRODUCTS", payload: data });
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setIsFetching(false); // Set isFetching to false after fetching data
        }
      }

      fetchData();
    }
  }, [isFetching]);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
