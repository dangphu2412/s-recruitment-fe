import { Parser } from 'html-to-react';
import { Heading, Text } from '@chakra-ui/react';
import { RULE_CONTENT } from './rule-example';
import Link from 'next/link';
import Image from 'next/image';

// @ts-ignore
const htmlParser = new Parser();

export function RuleDetail() {
  const {
    content: rawHtml,
    heading,
    category
  } = {
    category: 'Quy tắc',
    heading: 'Nội quy S-Group',
    content: RULE_CONTENT
  };

  return (
    <div className="flex flex-row space-x-12">
      <div className="space-y-8">
        <Text fontSize="xl" className="text-sprimary">
          <Link href={'/quy-tac'}>{category}</Link>
        </Text>
        <Heading className={'text-sprimary'}>{heading}</Heading>
        <div>{htmlParser.parse(rawHtml)}</div>
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
