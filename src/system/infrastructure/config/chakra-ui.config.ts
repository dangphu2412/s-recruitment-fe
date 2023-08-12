import { extendTheme } from '@chakra-ui/react';

export const SYSTEM_COLORS = {
  bg: '#f8f9fa'
};

export const chakraTheme = extendTheme({
  styles: {
    global: () => ({
      body: SYSTEM_COLORS
    })
  }
});
