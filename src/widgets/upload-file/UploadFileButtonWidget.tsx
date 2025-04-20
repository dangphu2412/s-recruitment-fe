import React, { PropsWithChildren, ReactNode } from 'react';
import { useNotify } from 'src/shared/models/notify';
import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from 'react-query';
import { UploadModal } from '../../shared/ui/Header/ContentHeader/UploadModal';
import { HeaderModalAction } from '../../shared/ui/Header/ContentHeader/HeaderActionGroup';

type Props = PropsWithChildren<{
  mutateFn: (file: File) => Promise<void>;
  resource: string;
  id: string;
  title: ReactNode;
}>;

export function UploadFileButtonWidget({
  resource,
  mutateFn,
  children,
  title,
  ...rest
}: Props) {
  const { mutate } = useMutation({
    mutationKey: resource,
    mutationFn: mutateFn
  });
  const notify = useNotify();

  function handleUpload(file: File | null | undefined) {
    if (file) {
      mutate(file, {
        onSuccess: () => {
          notify({
            title: 'Upload success',
            status: 'success'
          });
        },
        onError: () => {
          notify({
            title: 'Upload failed',
            status: 'error'
          });
        }
      });
    }
  }

  return (
    <>
      <HeaderModalAction
        {...rest}
        triggerButton={props => (
          <Button colorScheme="pink" {...props}>
            <FontAwesomeIcon className="mr-2" icon={faUpload} />
            <span>{children}</span>
          </Button>
        )}
        content={props => (
          <UploadModal {...props} title={title} onSave={handleUpload} />
        )}
      />
    </>
  );
}
