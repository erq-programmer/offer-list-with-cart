import { useQuery } from 'react-query';
import { useState } from 'react';

import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';

import { Wrapper, StyledCircularProgress, StyledButton } from './App.styles';
import ProductItem from './components/ProductItem/ProductItem';
import Cart from './components/Cart/Cart';

const getProducts = async () =>
  await (
    await fetch('data.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  ).json();

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
    <Wrapper>
      <h1>Oferta cateringowa</h1>

      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>

      <StyledButton
        style={{
          position: 'fixed',
        }}
        onClick={() => setCartOpen(true)}
      >
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          {data?.map((item) => (
            <div key={item.category.name}>
              <h2>{item.category.name}</h2>
              <p>{item.category.description}</p>
              <List>
                {item.content.map((product) => (
                  <ProductItem
                    key={product.id}
                    productCategory={item.category.name}
                    product={product}
                    addButton={handleAddToCart}
                  />
                ))}
              </List>
            </div>
          ))}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default App;
