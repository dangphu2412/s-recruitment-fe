import { ReactElement } from 'react';
import classes from './Combobox.module.scss';
import { BoxItem } from '../../models/combobox.api';
import { Text } from '@chakra-ui/react';

export function ComboboxItem(props: Readonly<BoxItem>): ReactElement {
  return (
    <div className={classes['option-item']}>
      <Text fontWeight={'medium'} fontSize={'sm'}>
        {props.text}
      </Text>
      {props.helperText && (
        <Text fontWeight={'light'} fontSize={'sm'}>
          {props.helperText}
        </Text>
      )}
    </div>
  );
}
