import { useQuery } from 'react-query';

import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';

import { Wrapper, StyledCircularProgress, StyledButton } from './App.styles';

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
  const { data, error, isLoading, isError } = useQuery('products', getProducts);
  console.log(data);

  const handleAddButton = (product) => console.log(product);

  if (isLoading) {
    return <StyledCircularProgress />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Wrapper>
      <h1>Oferta cateringowa</h1>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {data?.map((item) => (
            <div key={item.category.name}>
              <h2>{item.category.name}</h2>
              <p>{item.category.description}</p>
              <List>
                {item.content.map((product) => (
                  <ListItem key={product.id}>
                    <ListItemText>
                      {product.name} <strong>{product.price} zł</strong>
                    </ListItemText>
                    <Button
                      onClick={() =>
                        handleAddButton({
                          ...product,
                          category: item.category.name,
                        })
                      }
                    >
                      Add
                    </Button>
                  </ListItem>
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
