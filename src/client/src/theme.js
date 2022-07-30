import { createTheme } from '@mui/material/styles';

/**
 * @see [MUI Theming](https://mui.com/material-ui/customization/theming/)
 */
export const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

console.log('theme:', theme);
