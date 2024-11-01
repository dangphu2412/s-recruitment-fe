import { UpdateUserDto, User } from '../../../../entities/user/api';

export function mapUserDetailToEditForm(userDetail: User): EditUserForm {
  return {
    email: userDetail.email,
    username: userDetail.username,
    fullName: userDetail.fullName,
    birthday: userDetail.birthday,
    phoneNumber: userDetail.phoneNumber,
    domain: userDetail.domain?.id,
    period: userDetail.period?.id
  };
}

export type EditUserForm = {
  email: string;
  username: string;
  fullName: string;
  domain?: string;
  period?: string;
  birthday?: string;
  phoneNumber: string;
  monthlyConfigId?: string;
};

export function mapFormToEditUserDto(
  id: string,
  form: EditUserForm
): UpdateUserDto {
  return {
    id,
    fullName: form.fullName,
    domainId: form.domain,
    periodId: form.period,
    birthday: form.birthday,
    phoneNumber: form.phoneNumber
  };
}
