import { useToast } from '@chakra-ui/react';
import { UseToastOptions } from '@chakra-ui/toast/dist/declarations/src/use-toast';

type NotifyProps = Omit<UseToastOptions, 'duration' | 'isClosable'>;

export function useNotify() {
  const toast = useToast();

  return ({ ...options }: NotifyProps = {}) =>
    toast({
      ...{
        duration: 5000,
        isClosable: true,
        position: 'top'
      },
      ...options
    });
}
