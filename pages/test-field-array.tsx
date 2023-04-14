/* eslint-disable no-console */
import { NextPageWithLayout } from './_app';
import { NoLayout } from '@modules/shared/components/NoLayout';
import { useFieldArray, useForm } from 'react-hook-form';

type X = {
  username: string;
  fields: {
    type: string;
  }[];
};

const HookFormPage: NextPageWithLayout = () => {
  const { register, control, setValue } = useForm<X>({
    defaultValues: {
      username: '',
      fields: [
        {
          type: 'some value'
        }
      ]
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields'
  });
  console.log(fields);

  return (
    <>
      <label>Username Name</label>
      <input {...register('username')} />

      {fields.map((item, index) => {
        return (
          <div key={item.id}>
            <div>
              Fields
              {item.type}
              <button
                onClick={() =>
                  setValue(`fields.${index}.type`, 'Updated' + Math.random())
                }
              >
                Update type
              </button>
            </div>
          </div>
        );
      })}

      <button
        onClick={() => {
          append({ type: 'Some value' + Math.random() });
        }}
      >
        Add
      </button>
    </>
  );
};

HookFormPage.getLayout = NoLayout;

export default HookFormPage;
