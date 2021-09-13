
import { DarkTheme, DefaultTheme } from 'react-native-paper';

export const themeConst = {
    ...DefaultTheme,
    roundness: 2,
    dark: false,
    colors: {
        ...DefaultTheme.colors
    },
};
export const darkThemeConst = {
    ...DarkTheme,
    roundness: 2,
    dark: true,
    colors: {
        ...DarkTheme.colors
    },
};

