import { utils, write } from 'xlsx';
import { downloadFile } from '../../../shared/models/file';

export function createUserFileExample() {
  const newBook = utils.book_new();
  const data = [['Họ và Tên', 'Email', 'Join At', 'Chuyên môn', 'Ngày sinh']];

  const newSheet = utils.aoa_to_sheet(data);
  utils.book_append_sheet(newBook, newSheet, 'Sheet1');
  const wbout = write(newBook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });

  downloadFile(blob, 'example.xlsx');
}
