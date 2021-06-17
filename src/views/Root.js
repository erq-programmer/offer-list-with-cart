import ProductsProvider from 'providers/ProductsProvider';
import 'fontsource-roboto';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Products from 'views/Products';

import { Wrapper } from 'views/Root.styles';

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

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProductsProvider>
        <Wrapper>
          <Products />
        </Wrapper>
      </ProductsProvider>
    </ThemeProvider>
  );
};

export default Root;
