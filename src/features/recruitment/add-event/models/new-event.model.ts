import { DateRange } from '../../../../shared/models/filter.api';
import { BoxItem } from '../../../../shared/models/combobox.api';
import { array, mixed, number, object, string } from 'yup';
import { CreateRecruitmentEventPayload } from '../../../../entities/recruitment/api/recruitment.usecase';

export type ScoreStandard = {
  standard: string;
  point: number;
  description: string;
};

export type NewRecruitmentEventFormModal = {
  name: string;
  location: string;
  remark: string;
  passPoint: number;
  recruitmentRange: DateRange;
  examiners: BoxItem[];
  scoreStandards: ScoreStandard[];
  file: FileList;
};

export const newEventValidationSchema = object({
  name: string().required('Name must not empty'),
  location: string()
    .required('Location must not empty')
    .max(50, 'Max 50 characters allowed'),
  recruitmentRange: object({
    fromDate: string().required('From date is required for this event'),
    toDate: string().required('To date is required for this event')
  }),
  examiners: array().min(1, 'At least 1 examiner must be selected'),
  scoreStandards: array(
    object({
      point: number()
        .typeError('Point must not be empty')
        .min(1, 'Min is 1')
        .required('Need to fill point'),
      standard: string().required('Standard is required'),
      description: string().required('Description is required')
    })
  ),
  passPoint: number()
    .typeError('Pass point must not be empty')
    .min(1, 'Min must be greater than 0')
    .test({
      name: 'passPoint',
      test: (value, context) => {
        const { scoreStandards } =
          context.parent as NewRecruitmentEventFormModal;
        const maxPoint = scoreStandards.reduce((acc, item) => {
          return acc + item.point;
        }, 0);

        if (!value) {
          return true;
        }

        if (value <= maxPoint) {
          return true;
        }

        return context.createError({
          message: `Pass point must be less than or equal to the total point: ${maxPoint}`
        });
      }
    })
    .required('Pass point is required'),
  file: mixed().nullable().required()
});

export function mapFormToApiRequest(
  formInputs: NewRecruitmentEventFormModal
): CreateRecruitmentEventPayload {
  return {
    examinerIds: formInputs.examiners.map(item => item.value),
    recruitmentRange: {
      fromDate: formInputs.recruitmentRange.fromDate,
      toDate: formInputs.recruitmentRange.toDate
    },
    location: formInputs.location,
    remark: formInputs.remark,
    name: formInputs.name,
    scoringStandards: formInputs.scoreStandards,
    file: formInputs.file[0],
    passPoint: +formInputs.passPoint
  };
}
