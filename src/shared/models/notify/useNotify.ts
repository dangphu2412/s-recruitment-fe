import { createToaster } from '@chakra-ui/react';

const toaster = createToaster();

type NotifyProps = {
  title?: string;
  description?: string;
  status?: 'success' | 'error' | 'warning' | 'info';
};

type Notifier = (props: NotifyProps) => string | undefined;

export function useNotify(): Notifier {
  return ({ ...options }: NotifyProps = {}) =>
    toaster.create({
      ...{
        duration: 5000,
        isClosable: true,
        position: 'top'
      },
      ...options
    });
}
