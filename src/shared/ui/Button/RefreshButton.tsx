import React, { forwardRef } from 'react';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

export const RefreshButton = forwardRef<
  SVGSVGElement,
  Omit<FontAwesomeIconProps, 'icon'>
>(({ className, ...props }, ref) => {
  return (
    <FontAwesomeIcon
      className={classNames('p-1 rounded border cursor-pointer', className)}
      {...props}
      icon={faRefresh}
      ref={ref}
    />
  );
});
