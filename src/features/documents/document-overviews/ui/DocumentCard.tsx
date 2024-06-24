import { Heading, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { TextContent } from '../../../../shared/ui/Text/TextContent';

type DocumentCardProps = {
  id: string;
  categories: string[];
  title: string;
  slug: string;
  author: string;
  previewImage?: string;
  imageAlt?: string;
  isHot?: boolean;
};

export function DocumentCard({
  id,
  categories,
  title,
  slug,
  author,
  previewImage,
  imageAlt,
  isHot
}: DocumentCardProps) {
  return (
    <article className="space-y-4 py-8">
      <Text fontSize="xl" className="text-sprimary">
        <Link href={'/quy-tac'}>{categories?.toString()}</Link>
      </Text>

      <Link href={`/thong-bao/${id}/${slug}`} className={'space-y-2'}>
        <Heading className={'hover:text-sprimary'} size={isHot ? 'xl' : 'md'}>
          {title}
        </Heading>

        <TextContent>{author}</TextContent>

        {previewImage && imageAlt && (
          <Image
            src={previewImage}
            alt={imageAlt}
            width={1024 / 2}
            height={'auto'}
            objectFit={'cover'}
          />
        )}
      </Link>
    </article>
  );
}
