export enum RequestTypes {
  WORKING = 'Working',
  LATE = 'Late',
  ABSENCE = 'Absence'
}

export enum ExtraRequestTypes {
  COMPENSATORY = 'Compensatory'
}

export const REQUEST_TYPES = Object.values(RequestTypes).map(val => {
  return {
    id: val,
    name: val
  };
});
