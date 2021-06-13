import React from 'react';
import CartItem from '../CartItem/CartItem';
import { Wrapper } from './CartCategory.styles';

const CartCategory = ({ category, products, addToCart, removeFromCart }) => {
  return (
    <Wrapper>
      <h3>{category}</h3>
      <ul>
        <CartItem
          products={products}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      </ul>
    </Wrapper>
  );
};

export default CartCategory;
