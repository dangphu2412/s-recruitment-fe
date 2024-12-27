import {
  faArrowDown,
  faArrowUp,
  faSort
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Column } from '@tanstack/table-core';

type Props<T> = {
  column: Column<T>;
};

export function SortIcon<T>({ column }: Props<T>) {
  return (
    <span
      className={
        'cursor-pointer rounded-full hover:text-slate-800 hover:bg-slate-200 user-select-none w-6 h-6 flex items-center justify-center'
      }
      onClick={column.getToggleSortingHandler()}
    >
      <FontAwesomeIcon
        icon={
          column.getIsSorted() === 'asc'
            ? faArrowUp
            : column.getIsSorted() === 'desc'
            ? faArrowDown
            : faSort
        }
      />
    </span>
  );
}
