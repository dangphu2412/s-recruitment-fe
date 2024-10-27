const PREFIX = 'rcr-edit-';

type EmployeeId = {
  employId: string;
  userId: string;
};

export function saveLastEdit({ employId, userId }: EmployeeId, text: string) {
  window.localStorage.setItem(`${PREFIX}-${employId}-${userId}`, text);
}

export function getLastEdit({ employId, userId }: EmployeeId) {
  return window.localStorage.getItem(`${PREFIX}-${employId}-${userId}`);
}
