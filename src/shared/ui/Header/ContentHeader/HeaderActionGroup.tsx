import { FC, PropsWithChildren } from 'react';
import {
  ButtonProps,
  Drawer as DrawerContainer,
  DrawerProps,
  Modal,
  ModalProps,
  useDisclosure
} from '@chakra-ui/react';
import { UseDisclosureApi } from '../../../disclosure.api';
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

export function HeaderDrawerAction({
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
      <TriggerButton onClick={onOpen} id={id} />
      <Drawer placement="right" size="xl" onClose={onClose} isOpen={isOpen}>
        <Content onClose={onClose} />
      </Drawer>
    </>
  );
}

type HeaderModalActionProps = {
  id: string;
  triggerButton: ComponentWithAs<'button', ButtonProps>;
  modal?: FC<ModalProps>;
  content: FC<Pick<UseDisclosureApi, 'onClose'>>;
};

export function HeaderModalAction({
  id,
  content: Content,
  triggerButton: TriggerButton,
  modal: ModalContainer = Modal
}: HeaderModalActionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure({
    id
  });

  return (
    <>
      <TriggerButton onClick={onOpen} id={id} />
      <ModalContainer onClose={onClose} isOpen={isOpen}>
        <Content onClose={onClose} />
      </ModalContainer>
    </>
  );
}
