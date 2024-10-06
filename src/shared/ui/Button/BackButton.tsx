import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';

export function BackButton() {
  const { back } = useRouter();

  return (
    <Link className={'space-x-2'} color={'teal.500'} onClick={back}>
      <FontAwesomeIcon icon={faArrowLeft} />
      <span>Back to profile</span>
    </Link>
  );
}
