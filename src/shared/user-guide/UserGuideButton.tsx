import { Button, Tooltip } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Joyride, { CallBackProps, EVENTS, STATUS, Step } from 'react-joyride';
import React, { useEffect, useState } from 'react';

type Props = {
  steps: Step[];
  feature: string;
};

export function UserGuideButton({ steps, feature }: Props) {
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
      localStorage.setItem(`${feature}-user-tour`, 'true');
    }
  }

  useEffect(() => {
    const hasSeenTour = localStorage.getItem(`${feature}-user-tour`);
    if (!hasSeenTour) {
      setIsRun(true);
    }
  }, [feature]);

  return (
    <>
      <div className={'absolute top-0'}>
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
      </div>
      <Tooltip label="User guide">
        <Button colorScheme={'green'} onClick={handleClickStart}>
          <FontAwesomeIcon icon={faBook} />
        </Button>
      </Tooltip>
    </>
  );
}
