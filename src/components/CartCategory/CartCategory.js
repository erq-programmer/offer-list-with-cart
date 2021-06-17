import React from 'react';
import CartItem from '../CartItem/CartItem';
import Typography from '@material-ui/core/Typography';
import { Wrapper } from './CartCategory.styles';
import List from '@material-ui/core/List';

const CartCategory = ({ category, products, addToCart, removeFromCart }) => {
  return (
    <Wrapper>
      <Typography variant="h5">{category}</Typography>
      <List>
        <CartItem products={products} addToCart={addToCart} removeFromCart={removeFromCart} />
      </List>
    </Wrapper>
  );
};

export default CartCategory;
