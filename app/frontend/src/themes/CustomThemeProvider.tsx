import * as React from "react";
import { ThemeProvider } from '@material-ui/core/styles';
import getTheme from './base';

// eslint-disable-next-line no-unused-vars
export const CustomThemeContext = React.createContext<Partial<ThemeContextValues>>(
  {
    currentTheme: 'light',
    setTheme: null,
  },
)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function CustomThemeProvider(props: CustomThemeProps) {
  const { children } = props;

  // Read current theme from localStorage or maybe from an api
  const currentTheme = localStorage.getItem('appTheme') || 'light';

  // State to hold the selected theme name
  const [themeName, _setThemeName] = React.useState<string>(currentTheme);

  // Retrieve the theme object by theme name
  const theme = getTheme(themeName);

  // Wrap _setThemeName to store new theme names in localStorage
  const setThemeName = (name: string) => {
    localStorage.setItem('appTheme', name);
    _setThemeName(name);
  };

  const contextValue: ThemeContextValues = {
    currentTheme: themeName,
    setTheme: setThemeName,
  };

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  )
}

export default CustomThemeProvider;
