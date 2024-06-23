import { ReactElement } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { FormLabel } from 'src/shared/ui';
import classes from './AddPostForm.module.scss';
import { useRouter } from 'next/router';
import { useNotify } from '../../../../shared/models/notify';
import { TextEditor } from './TextEditor';
import { useMutateCreatePost } from '../../../../entities/posts/models';

type AddPostModel = {
  title: string;
  content: string;
};

type AddPostFormProps = {
  defaultValues?: AddPostModel;
};

export function AddPostForm({ defaultValues }: AddPostFormProps): ReactElement {
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
  const { createPost } = useMutateCreatePost();

  function submitResolver(model: AddPostModel) {
    const createPostBody = {
      title: model.title,
      content: model.content
    };

    createPost(createPostBody, {
      onSuccess: () => {
        showNotify({
          title: 'Post created successfully',
          status: 'success'
        });
        push('/posts/overview');
      },
      onError: () => {
        showNotify({
          title: 'Post created failed',
          status: 'error'
        });
      }
    });
  }

  return (
    <>
      <div className={classes['form-container']}>
        <form
          className={classes['login-form']}
          onSubmit={handleSubmit(submitResolver)}
        >
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

          <Button
            variant="solid"
            colorScheme="twitter"
            type="submit"
            className={classes['submit-btn']}
          >
            Create
          </Button>
        </form>
      </div>
    </>
  );
}
