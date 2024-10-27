import { forwardRef, ReactElement, useImperativeHandle, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  Input,
  Textarea
} from '@chakra-ui/react';
import { FormLabel } from 'src/shared/ui';
import classes from './AddPostForm.module.scss';
import { useNotify } from '../../../../shared/models/notify';
import {
  getQueryPostDetailKey,
  useMutateEditPost
} from '../../../../entities/posts/models';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { useQueryCategories } from '../../../../entities/posts/models/category.model';
import { BoxItem } from '../../../../shared/models/combobox.api';
import { MultipleCombobox } from '../../../../shared/ui/Combobox/MultipleCombobox';
import { TextEditor } from '../../../../widgets/text-editor/TextEditor';

type EditPostModel = {
  title: string;
  content: string;
  summary: string;
  categories: BoxItem[];
  previewImageURL: string;
};

type EditPostFormProps = {
  id: string;
  defaultValues?: EditPostModel;
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
      control,
      watch
    } = useForm<EditPostModel>({
      defaultValues
    });
    const { push } = useRouter();
    const showNotify = useNotify();
    const { editPost } = useMutateEditPost();
    const queryClient = useQueryClient();

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

    function submitResolver(model: EditPostModel) {
      const editPostBody = {
        id,
        title: model.title,
        content: model.content,
        categoryCodes: model.categories.map(item => item.value),
        previewImage: model.previewImageURL,
        summary: model.summary
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
                  return <TextEditor onChange={field.onChange} />;
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
