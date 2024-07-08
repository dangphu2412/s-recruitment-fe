import { useMutation } from 'react-query';
import { fileApiClient } from '../api';

export function useMutateUploadFile() {
  const { mutateAsync, isLoading } = useMutation({
    mutationKey: 'MUTATION_UPLOAD_FILE',
    mutationFn: fileApiClient.upload
  });

  return { upload: mutateAsync, isLoading };
}
