import { useContext } from 'react';
import { ProductsContext } from 'providers/ProductsProvider';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ProductItem from 'components/ProductItem/ProductItem';
import Drawer from '@material-ui/core/Drawer';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';

import Cart from 'components/Cart/Cart';

import { StyledList, CategorySection, CategoryText, StyledButton } from 'views/Products.styles';

const Products = () => {
  const { products, productsInCart, setCartOpen, cartOpen, handleAddToCart, handleRemoveFromCart, isErrorWithFetch } =
    useContext(ProductsContext);

  const getTotalItems = (items) => items.reduce((total, item) => total + item.amount, 0);

  // if (isLoading) {
  //   return <StyledCircularProgress />;
  // }

  if (isErrorWithFetch) {
    return <span>Error: {isErrorWithFetch}</span>;
  }

  return (
    <>
      <Typography variant="h2" color="secondary">
        Oferta cateringowa
      </Typography>

      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={productsInCart}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          closeButton={() => setCartOpen(false)}
        />
      </Drawer>

      <StyledButton
        style={{
          position: 'fixed',
        }}
        onClick={() => setCartOpen(true)}
      >
        <Badge badgeContent={getTotalItems(productsInCart)} color="error">
          <AddShoppingCartIcon color="secondary" size="medium" />
        </Badge>
      </StyledButton>

      <Grid container>
        <Grid item xs={12}>
          {products?.map((item) => (
            <CategorySection key={item.category.name}>
              <CategoryText>
                <Typography variant="h4" component="h3">
                  {item.category.name}
                </Typography>
                <Typography variant="subtitle2">{item.category.description}</Typography>
              </CategoryText>
              <Paper>
                <StyledList>
                  {item.content.map((product) => (
                    <ProductItem key={product.id} productCategory={item.category.name} product={product} />
                  ))}
                </StyledList>
              </Paper>
            </CategorySection>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Products;
