import { ToastId, useToast, UseToastOptions } from '@chakra-ui/react';

type NotifyProps = Omit<UseToastOptions, 'isClosable'>;

type Notifier = (props: NotifyProps) => ToastId;

export function useNotify(): Notifier {
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
