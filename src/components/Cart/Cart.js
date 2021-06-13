import React from 'react';
import { Wrapper } from './Cart.styles';
import CartCategory from '../CartCategory/CartCategory';
import { groupBy } from '../../helpers';

const Cart = ({ cartItems, addToCart, removeFromCart }) => {
  const productGroupedByCategory = groupBy(cartItems, 'category');

  return (
    <Wrapper>
      <div>
        <h2>Zamówienie cateringowe</h2>
        {cartItems.length === 0 ? <p>Brak produktów w zamówieniu</p> : null}
        {Object.entries(productGroupedByCategory)?.map(([key, value]) => (
          <CartCategory
            category={key}
            products={value}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default Cart;
