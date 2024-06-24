import { ReactElement, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea
} from '@chakra-ui/react';
import { FormLabel } from 'src/shared/ui';
import classes from './AddPostForm.module.scss';
import { useRouter } from 'next/router';
import { useNotify } from '../../../../shared/models/notify';
import { TextEditor } from './TextEditor';
import { useMutateCreatePost } from '../../../../entities/posts/models';
import { MultipleCombobox } from '../../../../shared/ui/Combobox/MultipleCombobox';
import { BoxItem } from '../../../../shared/models/combobox.api';
import { useQueryCategories } from '../../../../entities/posts/models/category.model';

type AddPostModel = {
  title: string;
  content: string;
  summary: string;
  categories: string[];
  previewImageURL: string;
};

export function AddPostForm(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm<AddPostModel>({
    defaultValues: {
      categories: []
    }
  });
  const { push } = useRouter();
  const showNotify = useNotify();
  const { createPost } = useMutateCreatePost();
  const { data } = useQueryCategories();

  const categoryBoxItems: BoxItem[] = useMemo(() => {
    return (
      data?.map(item => ({
        text: item.name,
        value: item.id
      })) || []
    );
  }, [data]);

  const previewImageURL = watch('previewImageURL');
  function submitResolver(model: AddPostModel) {
    const createPostBody = {
      title: model.title,
      content: model.content,
      categoryCodes: model.categories,
      previewImage: model.previewImageURL,
      summary: model.summary
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
                  value: 1,
                  message: 'Title must be at least 1 characters long'
                },
                required: 'Title is required'
              })}
            />

            {errors.title && (
              <FormErrorMessage>{errors.title.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors?.categories?.message} isRequired>
            <FormLabel htmlFor="categories">Categories</FormLabel>

            <Controller
              control={control}
              name={'categories'}
              render={({ field }) => {
                return (
                  <MultipleCombobox
                    name={'categories'}
                    items={categoryBoxItems}
                    value={field.value}
                    onChange={field.onChange}
                  />
                );
              }}
            />

            {errors.title && (
              <FormErrorMessage>{errors.title.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl
            isInvalid={!!errors?.previewImageURL?.message}
            isRequired
          >
            <FormLabel htmlFor="previewImageURL">Preview Image URL</FormLabel>
            <Input
              id="previewImageURL"
              type="text"
              placeholder="Preview Image"
              {...register('previewImageURL', {
                required: 'Preview Image is required'
              })}
            />

            {errors.previewImageURL && (
              <FormErrorMessage>
                {errors.previewImageURL.message}
              </FormErrorMessage>
            )}

            {previewImageURL && (
              <img src={previewImageURL} alt={'Fail to load preview'} />
            )}
          </FormControl>

          <FormControl isInvalid={!!errors?.summary?.message} isRequired>
            <FormLabel htmlFor="previewImageURL">Summary</FormLabel>
            <Textarea
              id="summary"
              placeholder="Summary"
              {...register('summary', {
                required: 'Summary is required'
              })}
            />

            {errors.summary && (
              <FormErrorMessage>{errors.summary.message}</FormErrorMessage>
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
