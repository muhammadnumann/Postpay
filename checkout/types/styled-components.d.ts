import { ThemedStyledInterface } from 'styled-components';

interface CustomTheme {
  rtl?: boolean;
  fonts?: Record<string, any>;
  isMobile?: boolean;
  isAndroid?: boolean;
  appHeight?: number;
}

declare module 'styled-components' {
  interface DefaultTheme extends CustomTheme {}
}
