import React from 'react';
import { Wrapper } from './Cart.styles';
import CartCategory from '../CartCategory/CartCategory';
import { groupBy } from '../../helpers';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  icon: {
    height: 35,
    width: 35,
  },
});

const Cart = ({ cartItems, addToCart, removeFromCart, closeButton }) => {
  const classes = useStyles();
  const productGroupedByCategory = groupBy(cartItems, 'category');

  const calculateTotalPrice = (product) =>
    product.reduce((acc, product) => acc + product.amount * product.price, 0);

  return (
    <Wrapper>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={2}>
          <IconButton onClick={closeButton}>
            <ChevronRightIcon className={classes.icon} />
          </IconButton>
        </Grid>
        <Grid item xs="auto">
          <Typography variant="h5" component="h3" color="secondary">
            Zamówienie cateringowe
          </Typography>
        </Grid>
      </Grid>

      {cartItems.length === 0 ? (
        <Typography
          variant="h5"
          component="h3"
          color="initial"
          align="center"
          style={{ marginTop: '2rem' }}
        >
          Brak produktów w zamówieniu
        </Typography>
      ) : null}
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
      {cartItems.length > 0 ? (
        <Typography variant="h6" color="initial" align="right">
          <strong>Cena za catering: {calculateTotalPrice(cartItems)} zł</strong>
        </Typography>
      ) : null}
    </Wrapper>
  );
};

export default Cart;
