import { createTheme } from '@mui/material/styles';

/**
 * - @see [MUI Theming](https://mui.com/material-ui/customization/theming/)
 * - @see [MUI Palette Colors](https://mui.com/material-ui/customization/palette/#default-values)
 */
export const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

console.log('theme:', theme);
