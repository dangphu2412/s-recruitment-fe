import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';

export function BackButton({ children }: PropsWithChildren) {
  const { back } = useRouter();

  return (
    <Link className={'space-x-2'} color={'teal.500'} onClick={back}>
      <FontAwesomeIcon icon={faArrowLeft} />
      <span>{children ?? 'Back to previous'}</span>
    </Link>
  );
}
