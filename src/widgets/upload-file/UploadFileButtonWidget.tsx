import React, { PropsWithChildren, ReactNode } from 'react';
import { useNotify } from 'src/shared/models/notify';
import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from 'react-query';
import { UploadModal } from '../../shared/ui/Header/ContentHeader/UploadModal';
import { HeaderModalAction } from '../../shared/ui/Header/ContentHeader/HeaderActionGroup';
import { noop } from '../../shared/models/utils';

type Props = PropsWithChildren<{
  mutateFn: (file: File) => Promise<void>;
  resource: string;
  id: string;
  title: ReactNode;
  description?: ReactNode;
  accept?: string;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}>;

export function UploadFileButtonWidget({
  resource,
  mutateFn,
  children,
  title,
  description,
  accept,
  onSuccess,
  onError,
  ...rest
}: Props) {
  const { mutate } = useMutation({
    mutationKey: resource,
    mutationFn: mutateFn,
    onError: noop
  });
  const notify = useNotify();

  function handleUpload(file: File | null | undefined) {
    if (file) {
      mutate(file, {
        onSuccess: () => {
          if (onSuccess) {
            onSuccess();
            return;
          }

          notify({
            title: 'Upload success',
            status: 'success'
          });
        },
        onError: error => {
          if (onError) {
            onError(error);
            return;
          }

          notify({
            title:
              'Upload failed. Please check your file size, file content, file type',
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
          <UploadModal
            {...props}
            title={title}
            description={description}
            accept={accept}
            onSave={handleUpload}
          />
        )}
      />
    </>
  );
}
