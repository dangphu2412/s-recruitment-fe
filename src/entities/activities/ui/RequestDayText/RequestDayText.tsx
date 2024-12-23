import { RequestTypes } from '../../config/constants/request-activity-metadata.constant';
import { formatDate } from '../../../../shared/models/utils/date.utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

type Props = {
  requestType: string;
  dayOfWeekName?: string;
  timeOfDayName?: string;
  requestChangeDay?: string;
  compensatoryDay?: string;
};

export function RequestDayText({
  requestType,
  dayOfWeekName,
  timeOfDayName,
  requestChangeDay,
  compensatoryDay
}: Props) {
  if (RequestTypes.WORKING === requestType) {
    return (
      <>
        {dayOfWeekName} - {timeOfDayName}
      </>
    );
  }

  if (RequestTypes.LATE === requestType) {
    return (
      <p>
        {timeOfDayName} / {formatDate(requestChangeDay)}
      </p>
    );
  }

  return (
    <p className={'flex gap-2 items-center'}>
      <span>{formatDate(requestChangeDay)}</span>

      <FontAwesomeIcon icon={faArrowRight} />

      <span>{formatDate(compensatoryDay)}</span>
    </p>
  );
}
