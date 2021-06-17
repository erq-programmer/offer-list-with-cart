import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
});

const CartItem = ({ products, addToCart, removeFromCart }) => {
  const classes = useStyles();

  return products.map((product) => (
    <ListItem key={product.id} divider>
      <Grid container direction="column">
        <Typography variant="h6">{product.name}</Typography>
        <Grid item>
          <Grid container direction="row" justify="space-between">
            <Typography variant="overline">Cena: {product.price} zł</Typography>
            <Typography variant="overline">
              Cena w sumie: {product.amount * product.price} zł
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <IconButton
              size="medium"
              onClick={() => removeFromCart(product.id)}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="subtitle1">{product.amount}</Typography>
            <IconButton size="medium" onClick={() => addToCart(product)}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  ));
};

export default CartItem;
