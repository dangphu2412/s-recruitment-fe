import Image from 'next/image';
import Link from 'next/link';
import { useQueryCategories } from '../../../../../entities/posts/pagination/category.model';
import { Search } from '../Search/Search';
import { Text } from '@chakra-ui/react';

export function PublicHeader() {
  const { data: categories } = useQueryCategories();

  return (
    <header className="flex flex-col px-10 py-8 space-y-6 w-[13.125rem]">
      <div className={'flex flex-col gap-2'}>
        <Link href={'/thong-bao'}>
          <Image src={'/logo.png'} alt={'logo'} width={'35'} height={'42'} />
        </Link>
      </div>

      <div className={'flex flex-col gap-4'}>
        <Search />

        {(categories ?? []).map(({ id, name }) => {
          return (
            <Link key={id} href={`/danh-muc/${id}`}>
              <Text className={'hover:text-sprimary'}>{name}</Text>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
