import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const ProductItem = ({ productCategory, product, addButton }) => {
  return (
    <ListItem>
      <ListItemText>
        {product.name} <strong>{product.price} zł</strong>
      </ListItemText>
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          addButton({
            ...product,
            category: productCategory,
          })
        }
      >
        <AddIcon />
      </Button>
    </ListItem>
  );
};

export default ProductItem;
