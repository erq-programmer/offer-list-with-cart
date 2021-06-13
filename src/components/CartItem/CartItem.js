import React from 'react';
import Button from '@material-ui/core/Button';

const CartItem = ({ products, addToCart, removeFromCart }) => {
  return products.map((product) => (
    <li key={product.id}>
      <div>
        <h4>{product.name}</h4>
        <div className="information">
          <p>Cena: {product.price} zł</p>
          <p>Cena w sumie: {product.amount * product.price} zł</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(product.id)}
          >
            -
          </Button>
          <p>{product.amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(product)}
          >
            +
          </Button>
        </div>
      </div>
    </li>
  ));
};

export default CartItem;
