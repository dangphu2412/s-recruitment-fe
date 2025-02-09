import { UpdateUserDto, User } from '../../../../entities/user/api';
import { formatToInputDate } from '../../../../shared/models/utils/date.utils';

export function mapUserDetailToEditForm(userDetail: User): EditUserForm {
  return {
    email: userDetail.email,
    username: userDetail.username,
    fullName: userDetail.fullName,
    trackingId: userDetail.trackingId,
    birthday: formatToInputDate(userDetail.birthday),
    phoneNumber: userDetail.phoneNumber,
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
  phoneNumber: string;
  trackingId: string;
  monthlyConfigId?: string;
};

export function mapFormToEditUserDto(
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
    phoneNumber: form.phoneNumber
  };
}
