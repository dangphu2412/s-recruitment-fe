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
      label: 'Rules',
      link: '/documents/rules'
    },
    {
      id: 'News',
      label: 'News',
      link: '/documents/news'
    }
  ];
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  function renderSearch() {
    if (!isOpenSearch) {
      return (
        <span className={'space-x-1'}>
          <span>Search</span>
          <FontAwesomeIcon
            className={'cursor-pointer'}
            icon={faSearch}
            onClick={() => setIsOpenSearch(prev => !prev)}
          />
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
        <Input type="text" placeholder="Search" />
      </InputGroup>
    );
  }

  return (
    <header className="flex flex-col px-10 py-8 space-y-6 w-[13.125rem]">
      <div className={'flex flex-col gap-2'}>
        <Image src={'/logo.png'} alt={'logo'} width={'35'} height={'42'} />
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
