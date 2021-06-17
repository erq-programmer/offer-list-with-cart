import { useContext } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { ProductsContext } from 'providers/ProductsProvider';

const ProductItem = ({ productCategory, product }) => {
  const { handleAddToCart } = useContext(ProductsContext);

  return (
    <>
      <ListItem>
        <ListItemText primary={product.name} secondary={`${product.price} zł (${product.priceDetails})`} />
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            handleAddToCart({
              ...product,
              category: productCategory,
            })
          }
        >
          <AddIcon />
        </Button>
      </ListItem>
      <Divider component="li" />
    </>
  );
};

export default ProductItem;
