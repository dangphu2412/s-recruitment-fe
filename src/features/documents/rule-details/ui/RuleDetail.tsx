import { Heading, Text, Image as ImageLoader } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { normalizeParam } from '../../../../shared/models/utils/router.utils';
import { useQueryPostDetail } from '../../../../entities/posts/models';
import React from 'react';
import { formatDate } from '../../../../shared/models/utils/date.utils';
import { htmlParser } from 'src/shared/models/html-parser/html-parser';

export function RuleDetail() {
  const { query } = useRouter();
  const id = normalizeParam(query.id);

  const { data } = useQueryPostDetail(id);

  return (
    <div className="flex flex-row space-x-12">
      <div className="space-y-4 grow">
        <Text fontSize="lg" className="text-sprimary">
          {data?.categories?.map(category => (
            <Link key={category.id} href={`/danh-muc/${category.id}`}>
              {category.name}
            </Link>
          ))}
        </Text>

        <Heading>{data?.title ?? 'Loading'}</Heading>

        <div>
          <Text fontSize="sm" fontWeight="black" as={'span'}>
            {data?.author?.fullName}
          </Text>
          {' / '}
          <Text fontSize="sm" fontWeight="light" as={'span'}>
            {data?.createdAt ? formatDate(new Date(data.createdAt)) : ''}
          </Text>
        </div>

        <ImageLoader
          src={data?.previewImage}
          alt={'imageAlt'}
          width={1024 / 1.5}
          height={'auto'}
          objectFit={'cover'}
        />

        <div>{htmlParser.parse(data?.content ?? '')}</div>
      </div>

      <div className={'min-w-[300px] flex flex-col space-y-8'}>
        <Image
          src={'/operation.jpg'}
          alt={'operation'}
          width={'280'}
          height={'280'}
        />

        <Image
          src={'/birthday2023.png'}
          alt={'birthday2023'}
          width={'280'}
          height={'280'}
        />
      </div>
    </div>
  );
}
