import {
  ComboboxProps,
  MultipleCombobox
} from '../../../../shared/ui/Combobox/MultipleCombobox';
import React, { useMemo } from 'react';
import { BoxItem } from '../../../../shared/models/combobox.api';
import { getInitialOverviewState, useQueryUsers } from '../../models';

type UserComboboxProps = Omit<ComboboxProps, 'items'>;

export function UserCombobox({ value = [], ...rest }: UserComboboxProps) {
  const { data } = useQueryUsers({
    ...getInitialOverviewState()
  });
  const items: BoxItem[] = useMemo(() => {
    if (!data) return [];

    return data.items.map(user => {
      return {
        text: user.username,
        value: user.id
      };
    });
  }, [data]);

  return <MultipleCombobox {...rest} value={value} items={items} />;
}
