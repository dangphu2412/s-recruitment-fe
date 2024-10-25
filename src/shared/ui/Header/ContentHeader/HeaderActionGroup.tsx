import { FC, PropsWithChildren } from 'react';
import {
  ButtonProps,
  Drawer as DrawerContainer,
  DrawerProps,
  useDisclosure
} from '@chakra-ui/react';
import { UseDisclosureApi } from '../../../models/disclosure.api';
import { ComponentWithAs } from '@chakra-ui/react/dist/types/system/system.types';

type HeaderActionGroupProps = PropsWithChildren<{}>;

export function HeaderActionGroup({ children }: HeaderActionGroupProps) {
  return <div className={'space-x-2'}>{children}</div>;
}

type HeaderActionProps = {
  id: string;
  triggerButton: ComponentWithAs<'button', ButtonProps>;
  drawer?: FC<DrawerProps>;
  content: FC<Pick<UseDisclosureApi, 'onClose'>>;
};

export function HeaderAction({
  id,
  content: Content,
  triggerButton: TriggerButton,
  drawer: Drawer = DrawerContainer
}: HeaderActionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure({
    id
  });

  return (
    <>
      <TriggerButton onClick={onOpen} />
      <Drawer placement="right" size="xl" onClose={onClose} isOpen={isOpen}>
        <Content onClose={onClose} />
      </Drawer>
    </>
  );
}
