import { DocumentNode } from 'graphql';

// Images
declare module '*.png' {
  export const valuePng: string;
}

declare module '*.jpg' {
  export const value: string;
}

declare module '*.jpeg' {
  export const value: string;
}

declare module '*.gif' {
  export const value: string;
}

declare module '*.svg';

declare module '*.json' {
  const value: string;
  export default value;
}
