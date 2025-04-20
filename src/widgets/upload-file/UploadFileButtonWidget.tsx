import React, { ChangeEvent, PropsWithChildren, useRef } from 'react';
import { useNotify } from 'src/shared/models/notify';
import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from 'react-query';

type Props = PropsWithChildren<{
  mutateFn: (file: File) => Promise<void>;
  resource: string;
  id?: string;
}>;

export function UploadFileButtonWidget({
  resource,
  mutateFn,
  children,
  ...rest
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const { mutate } = useMutation({
    mutationKey: resource,
    mutationFn: mutateFn
  });
  const notify = useNotify();

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

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
        },
        onSettled: () => {
          ref.current!.files = null;
        }
      });
    }
  }

  return (
    <Button colorScheme="pink" onClick={() => ref.current?.click()} {...rest}>
      <input type="file" ref={ref} hidden onChange={handleUpload} />
      <FontAwesomeIcon className="mr-2" icon={faUpload} />
      <span>{children}</span>
    </Button>
  );
}
