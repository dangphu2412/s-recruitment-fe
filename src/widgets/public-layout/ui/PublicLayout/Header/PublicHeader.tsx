import Image from 'next/image';
import Link from 'next/link';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export function PublicHeader() {
  const categories = [
    {
      id: 'Rules',
      label: 'Quy định',
      link: '/tai-lieu/quy-dinh'
    },
    {
      id: 'News',
      label: 'Tin tức',
      link: '/tai-lieu/tin-tuc'
    }
  ];
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  function renderSearch() {
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

  return (
    <header className="flex flex-col px-10 py-8 space-y-6 w-[13.125rem]">
      <div className={'flex flex-col gap-2'}>
        <Link href={'/documents'}>
          <Image src={'/logo.png'} alt={'logo'} width={'35'} height={'42'} />
        </Link>
      </div>

      <div className={'flex flex-col gap-4'}>
        {renderSearch()}

        {categories.map(({ id, label, link }) => {
          return (
            <Link key={id} href={link}>
              {label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
