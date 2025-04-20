import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Joyride, { CallBackProps, EVENTS, STATUS, Step } from 'react-joyride';
import React, { useEffect, useState } from 'react';

type Props = {
  steps: Step[];
};

export function UserGuideButton({ steps }: Props) {
  const [isRun, setIsRun] = useState(false);

  function handleClickStart(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();

    setIsRun(true);
  }

  function handleClickEnd(data: CallBackProps) {
    if (
      // @ts-ignore
      [STATUS.FINISHED, STATUS.SKIPPED].includes(data.status) &&
      EVENTS.TOUR_END === data.type
    ) {
      setIsRun(false); // turn off the tour
      localStorage.setItem('seen-user-tour', 'true');
    }
  }

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('seen-user-tour');
    if (!hasSeenTour) {
      setIsRun(true);
    }
  }, []);

  return (
    <>
      <div className={'flex flex-wrap justify-end'}>
        <Joyride
          continuous
          run={isRun}
          scrollOffset={64}
          scrollToFirstStep
          showProgress
          showSkipButton
          steps={steps}
          callback={handleClickEnd}
          styles={{
            options: {
              zIndex: 10000
            }
          }}
        />
        <Button
          colorScheme={'green'}
          leftIcon={<FontAwesomeIcon icon={faBook} />}
          onClick={handleClickStart}
        >
          Guide
        </Button>
      </div>
    </>
  );
}
