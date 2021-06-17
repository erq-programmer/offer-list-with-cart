import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const CartItem = ({ products, addToCart, removeFromCart }) => {
  return products.map((product) => (
    <ListItem key={product.id} divider>
      <Grid container direction="column">
        <Typography variant="h6">{product.name}</Typography>
        <Grid item>
          <Grid container direction="row" justify="space-between">
            <Typography variant="overline">Cena: {product.price} zł</Typography>
            <Typography variant="overline">Cena w sumie: {product.amount * product.price} zł</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <IconButton size="medium" onClick={() => removeFromCart(product.id)}>
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
