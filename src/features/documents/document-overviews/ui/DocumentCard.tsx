import { Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { TextContent } from '../../../../shared/ui/Text/TextContent';
import Image from 'next/image';

type DocumentCardProps = {
  category: string;
  title: string;
  titleSlug: string;
  author: string;
  image?: string;
  imageAlt?: string;
  isHot?: boolean;
};

export function DocumentCard({
  category,
  title,
  titleSlug,
  author,
  image,
  imageAlt,
  isHot
}: DocumentCardProps) {
  return (
    <article className="space-y-2 py-8">
      <Text fontSize="xl" className="text-primary">
        <Link href={'/quy-tac'}>{category}</Link>
      </Text>

      <Link href={`/quy-tac/${titleSlug}`}>
        <Heading className={'hover:text-primary'} size={isHot ? 'xl' : 'md'}>
          {title}
        </Heading>
      </Link>

      <TextContent>{author}</TextContent>

      {image && imageAlt && (
        <Image src={image} alt={imageAlt} width={1024 / 2} height={574 / 2} />
      )}
    </article>
  );
}
