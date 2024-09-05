import * as globals from './globals';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $globals: typeof globals;
  }
}

export {};