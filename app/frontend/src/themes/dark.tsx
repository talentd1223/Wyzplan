import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeOptions {
    // eslint-disable-next-line
    [key: string]: any;
  }
}

const themeOptions = {
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#cc4444',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f5f5f5',
    },
    appTest: {
      default: '#fff',
    }
  },
};

const themeName = 'dark';

export default createMuiTheme({ themeOptions, themeName });
