import light from './light';
import dark from './dark';

const themes = {
  light,
  dark,
};
// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getTheme = (theme : string) => themes[theme];

export default getTheme;
