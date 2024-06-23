import { forwardRef, ReactElement, useImperativeHandle } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { FormLabel } from 'src/shared/ui';
import classes from './AddPostForm.module.scss';
import { useNotify } from '../../../../shared/models/notify';
import { TextEditor } from './TextEditor';
import {
  getQueryPostDetailKey,
  useMutateEditPost
} from '../../../../entities/posts/models';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

type AddPostModel = {
  title: string;
  content: string;
};

type EditPostFormProps = {
  id: string;
  defaultValues?: AddPostModel;
  onSuccess?: () => void;
};

export const EditPostForm = forwardRef<HTMLFormElement, EditPostFormProps>(
  function EditPostForm(
    { id, defaultValues, onSuccess }: EditPostFormProps,
    ref
  ): ReactElement {
    const {
      register,
      handleSubmit,
      formState: { errors },
      control
    } = useForm<AddPostModel>({
      defaultValues
    });
    const { push } = useRouter();
    const showNotify = useNotify();
    const { editPost } = useMutateEditPost();
    const queryClient = useQueryClient();

    function submitResolver(model: AddPostModel) {
      const editPostBody = {
        id,
        title: model.title,
        content: model.content
      };

      editPost(editPostBody, {
        onSuccess: response => {
          showNotify({
            title: 'Post updated successfully',
            status: 'success'
          });

          queryClient.invalidateQueries(getQueryPostDetailKey(id));
          push(`/posts/${id}/${response.slug}`);
          onSuccess?.();
        },
        onError: () => {
          showNotify({
            title: 'Post updated failed',
            status: 'success'
          });
        }
      });
    }

    useImperativeHandle(ref, () => {
      return {
        onSubmit() {
          handleSubmit(submitResolver)();
        }
      } as unknown as HTMLFormElement;
    });

    return (
      <>
        <div className={classes['form-container']}>
          <form className={classes['login-form']} ref={ref}>
            <FormControl isInvalid={!!errors?.title?.message} isRequired>
              <FormLabel htmlFor="username">Title</FormLabel>
              <Input
                id="title"
                type="text"
                placeholder="Title"
                {...register('title', {
                  minLength: {
                    value: 4,
                    message: 'Username must be at least 4 characters long'
                  },
                  required: 'Username is required'
                })}
              />

              {errors.title && (
                <FormErrorMessage>{errors.title.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors?.content?.message} isRequired>
              <FormLabel htmlFor="content">Content</FormLabel>
              <Controller
                control={control}
                render={({ field }) => {
                  return (
                    <TextEditor value={field.value} onChange={field.onChange} />
                  );
                }}
                name={'content'}
              />
            </FormControl>
          </form>
        </div>
      </>
    );
  }
);
