import { useQuery } from 'react-query';
import { useState } from 'react';

import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ProductItem from './components/ProductItem/ProductItem';
import Cart from './components/Cart/Cart';

import {
  Wrapper,
  StyledCircularProgress,
  StyledButton,
  StyledList,
  CategorySection,
  CategoryText,
} from './App.styles';

import 'fontsource-roboto';

const getProducts = async () =>
  await (
    await fetch('data.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  ).json();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#7F8054',
    },
    secondary: {
      main: '#52542C',
    },
  },
});

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const { data, error, isLoading, isError } = useQuery('products', getProducts);

  const handleAddToCart = (clickedItem) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) =>
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

  const getTotalItems = (items) =>
    items.reduce((total, item) => total + item.amount, 0);

  if (isLoading) {
    return <StyledCircularProgress />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Wrapper>
        <Typography variant="h2" color="secondary">
          Oferta cateringowa
        </Typography>

        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart
            cartItems={cartItems}
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
          <Badge badgeContent={getTotalItems(cartItems)} color="error">
            <AddShoppingCartIcon color="secondary" size="medium" />
          </Badge>
        </StyledButton>

        <Grid container>
          <Grid item xs={12}>
            {data?.map((item) => (
              <CategorySection key={item.category.name}>
                <CategoryText>
                  <Typography variant="h4" component="h3">
                    {item.category.name}
                  </Typography>
                  <Typography variant="subtitle2">
                    {item.category.description}
                  </Typography>
                </CategoryText>
                <Paper>
                  <StyledList>
                    {item.content.map((product) => (
                      <ProductItem
                        key={product.id}
                        productCategory={item.category.name}
                        product={product}
                        addButton={handleAddToCart}
                      />
                    ))}
                  </StyledList>
                </Paper>
              </CategorySection>
            ))}
          </Grid>
        </Grid>
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
