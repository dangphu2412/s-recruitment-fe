import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useState } from 'react';

export function Search() {
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  if (!isOpenSearch) {
    return (
      <span
        className={'space-x-1 cursor-pointer'}
        onClick={() => setIsOpenSearch(prev => !prev)}
      >
        <span>Tìm kiếm</span>
        <FontAwesomeIcon icon={faSearch} />
      </span>
    );
  }

  return (
    <InputGroup>
      <InputLeftElement>
        <FontAwesomeIcon
          className={'cursor-pointer'}
          icon={faSearch}
          onClick={() => setIsOpenSearch(prev => !prev)}
        />
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Search"
        onBlur={() => setIsOpenSearch(false)}
      />
    </InputGroup>
  );
}
