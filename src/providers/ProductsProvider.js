import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductsContext = createContext({
  products: [],
  productsInCart: [],
  handleAddToCart: () => {},
  handleRemoveFromCart: () => {},
  setCartOpen: () => {},
  cartOpen: false,
  isErrorWithFetch: null,
});

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isErrorWithFetch, setErrorWithFetch] = useState(null);

  useEffect(() => {
    axios
      .get('data.json')
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((err) => setErrorWithFetch(err));
  }, []);

  const handleAddToCart = (clickedItem) => {
    setProductsInCart((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) => (item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item));
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setProductsInCart((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [])
    );
  };
  return (
    <ProductsContext.Provider
      value={{
        products,
        productsInCart,
        handleAddToCart,
        handleRemoveFromCart,
        setCartOpen,
        cartOpen,
        isErrorWithFetch,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
