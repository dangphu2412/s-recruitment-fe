export enum RequestActivityStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REVISE = 'REVISE'
}

export const REQUEST_ACTIVITY_STATUS_DIALOG_MODEL = Object.values(
  RequestActivityStatus
).map(val => {
  return {
    id: val,
    name: val
  };
});

export enum ApprovalRequestAction {
  REVISE = 'REVISE',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT'
}
