import React from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { Flex } from '@chakra-ui/react';
import { ItemPerPageSelector } from './ItemPerPageSelector/ItemPerPageSelector';

type Props = {
  className?: string | undefined;
  page?: number;
  size?: number;
  pageSizeItems?: number[];
  totalRecords: number;
  onPageChange: (page: number) => void;
  onSizeChange: (size: number) => void;
};

export function Paginator({
  page = 1,
  size = 10,
  pageSizeItems = [10, 20, 30, 40, 50],
  totalRecords,
  onPageChange,
  onSizeChange,
  className
}: Props): React.ReactElement {
  function handleSizeChange(size: number) {
    onPageChange(1);
    onSizeChange(size);
  }

  return (
    <Flex className={className}>
      <Pagination
        current={page}
        pageSize={size}
        onChange={onPageChange}
        total={totalRecords}
      />

      <ItemPerPageSelector
        pageSize={size}
        setPageSize={handleSizeChange}
        pageSizeItems={pageSizeItems}
      />
    </Flex>
  );
}
