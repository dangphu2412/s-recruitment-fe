import { ReactElement } from 'react';
import classes from './Combobox.module.scss';
import { BoxItem } from '../../../../domain/clients/combobox.api';

export function ComboboxItem(props: BoxItem): ReactElement {
  return (
    <div className={classes['option-item']}>
      <div className={classes['option-text']}>{props.text}</div>
    </div>
  );
}
