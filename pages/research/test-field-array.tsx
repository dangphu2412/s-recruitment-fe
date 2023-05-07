/* eslint-disable no-console */
import { NextPageWithLayout } from '../_app';
import { NoLayout } from '@modules/shared/components/NoLayout';
import { useFieldArray, useForm } from 'react-hook-form';

type X = {
  username: string;
  fields: {
    type: string;
  }[];
};

function SuperComponent({ item }: { item: X['fields'][0] }) {
  console.log('Render at', item.type);
  return (
    <div>
      <label>Field: {item.type}</label>
    </div>
  );
}

const HookFormPage: NextPageWithLayout = () => {
  console.log('Render');
  const { register, control, setValue, getValues } = useForm<X>({
    defaultValues: {
      username: '',
      fields: [
        {
          type: 'some value'
        }
      ]
    }
  });
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'fields'
  });

  return (
    <>
      <label>Username Name</label>
      <input {...register('username')} />
      <input type="number" max={10} maxLength={2} />

      {fields.map((item, index) => {
        return (
          <div key={item.id} className="text-red flex flex-col gap-4">
            At: {index}
            <SuperComponent key={item.id} item={item} />
            <div className="text-red flex flex-row gap-4">
              <button
                className="border border-black rounded w-44"
                onClick={() =>
                  setValue(`fields.${index}.type`, 'Updated' + Math.random())
                }
              >
                Update type
              </button>

              <button
                className="border border-black rounded w-44"
                onClick={() => remove(index)}
              >
                Remove
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

      <button
        className="border border-black rounded w-44"
        onClick={() => {
          replace(
            fields.map(field => {
              return {
                ...field,
                type: 'Con chim non'
              };
            })
          );
        }}
      >
        Replace
      </button>
    </>
  );
};

HookFormPage.getLayout = NoLayout;

export default HookFormPage;
