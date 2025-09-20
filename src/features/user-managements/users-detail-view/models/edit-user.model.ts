import {
  UpdateMyProfileDto,
  UpdateUserDto,
  User,
  UserDetail
} from '../../../../entities/user/api';
import { formatToInputDate } from '../../../../shared/date';

export function fromUserDetailToEditForm(userDetail: User): EditUserForm {
  return {
    email: userDetail.email,
    username: userDetail.username,
    fullName: userDetail.fullName,
    trackingId: userDetail.trackingId,
    birthday: formatToInputDate(userDetail.birthday),
    phoneNumber: userDetail.phoneNumber,
    joinedAt: formatToInputDate(userDetail.joinedAt),
    department: userDetail.department?.id,
    period: userDetail.period?.id
  };
}

export function fromMyProfileToEditForm(userDetail: UserDetail): EditUserForm {
  return {
    email: userDetail.email,
    username: userDetail.username,
    fullName: userDetail.fullName,
    trackingId: userDetail.trackingId,
    birthday: formatToInputDate(userDetail.birthday),
    phoneNumber: userDetail.phoneNumber,
    joinedAt: formatToInputDate(userDetail.joinedAt),
    department: userDetail.department?.id,
    period: userDetail.period?.id
  };
}

export type EditUserForm = {
  email: string;
  username: string;
  fullName: string;
  department?: string;
  period?: string;
  birthday?: string;
  joinedAt?: string;
  phoneNumber: string;
  trackingId: string;
  monthlyConfigId?: string;
};

export function fromFormToEditUserDto(
  id: string,
  form: EditUserForm
): UpdateUserDto {
  return {
    id,
    fullName: form.fullName,
    departmentId: form.department,
    periodId: form.period,
    birthday: form.birthday,
    trackingId: form.trackingId,
    phoneNumber: form.phoneNumber,
    joinedAt: form.joinedAt
  };
}

export function fromFormToEditMyProfileDto(
  form: EditUserForm
): UpdateMyProfileDto {
  return {
    fullName: form.fullName,
    birthday: form.birthday,
    phoneNumber: form.phoneNumber
  };
}
