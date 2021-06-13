import React from 'react';
import { Wrapper } from './Cart.styles';
import CartCategory from '../CartCategory/CartCategory';
import { groupBy } from '../../helpers';

const Cart = ({ cartItems, addToCart, removeFromCart }) => {
  const productGroupedByCategory = groupBy(cartItems, 'category');

  const calculateTotalPrice = (product) =>
    product.reduce((acc, product) => acc + product.amount * product.price, 0);

  return (
    <Wrapper>
      <div>
        <h2>Zamówienie cateringowe</h2>
        {cartItems.length === 0 ? <p>Brak produktów w zamówieniu</p> : null}
        {Object.entries(productGroupedByCategory)?.map(
          ([category, categoryData]) => (
            <CartCategory
              key={category}
              category={category}
              products={categoryData}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          )
        )}
        <p>
          <strong>Cena za catering: {calculateTotalPrice(cartItems)} zł</strong>
        </p>
      </div>
    </Wrapper>
  );
};

export default Cart;
