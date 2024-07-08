import { Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { TextContent } from '../../../../shared/ui/Text/TextContent';
import Image from 'next/image';

type LatestCardProps = {
  id: string;
  categories: string[];
  title: string;
  slug: string;
  author: string;
  summary: string;
  previewImage?: string;
  imageAlt?: string;
  isHot?: boolean;
};

export function LatestCard({
  id,
  categories,
  title,
  slug,
  author,
  previewImage,
  imageAlt,
  isHot,
  summary
}: LatestCardProps) {
  return (
    <Link href={`/thong-bao/${id}/${slug}`} className="grid grid-cols-3 gap-2">
      <div className={'flex flex-col space-y-2'}>
        <Text fontSize="xl" className="text-sprimary">
          <Link href={'/quy-tac'}>{categories?.toString()}</Link>
        </Text>

        <Heading className={'hover:text-sprimary'} size={isHot ? 'xl' : 'md'}>
          {title}
        </Heading>

        <TextContent>{author}</TextContent>
      </div>

      <Text noOfLines={3}>{summary}</Text>

      {previewImage && imageAlt && (
        <Image
          src={previewImage}
          alt={imageAlt}
          width={1024 / 2}
          height={1024 / 2}
          objectFit={'cover'}
        />
      )}
    </Link>
  );
}
