import React from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup
} from '@chakra-ui/react';
import { UseDisclosureApi } from 'src/shared/models/disclosure.api';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { useQueryClient } from 'react-query';
import {
  MY_ACTIVITY_REQUESTS_QUERY_KEY,
  useCreateActivityRequestMutation
} from '../../../../../../entities/activities/models/activity-request.model';
import { useNotify } from '../../../../../../shared/models/notify';
import {
  REQUEST_TYPES,
  RequestTypes
} from '../../../../../../entities/activities/config/constants/request-activity-metadata.constant';
import {
  useDayOfWeeksQuery,
  useTimeOfDayQuery
} from '../../../../../../entities/activities/models/activity-master-data.model';
import { HookFormTextarea } from '../../../../../../shared/ui/Form/HookFormTextarea/HookFormInput';
import { HookFormInput } from '../../../../../../shared/ui/Form/HookFormInput/HookFormInput';
import { HookFormSelect } from '../../../../../../shared/ui/Form/HookFormSelect/HookFormSelect';

export type CreateActivityInputs = {
  requestType: string;
  timeOfDay: string;
  dayOfWeek: string;
  reason?: string;
  requestChangeDay?: string;
  compensatoryDay?: string;
};

type AddActivityModalProps = Pick<UseDisclosureApi, 'onClose'>;

const validationSchema = object({
  requestType: string().required(),
  timeOfDay: string().required(),
  dayOfWeek: string().optional(),
  reason: string().optional(),
  requestChangeDay: string().optional(),
  compensatoryDay: string().optional()
});

export function AddActivityRequestModal({
  onClose
}: AddActivityModalProps): React.ReactElement {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch
  } = useForm<CreateActivityInputs>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      requestType: RequestTypes.WORKING
    }
  });
  const requestType = watch('requestType');

  const notify = useNotify();

  const queryClient = useQueryClient();
  const { mutate } = useCreateActivityRequestMutation();
  const { data: dayOfWeeks } = useDayOfWeeksQuery();
  const { data: timeOfDays } = useTimeOfDayQuery();

  const createRequest: SubmitHandler<CreateActivityInputs> = inputs => {
    mutate(
      {
        requestType: inputs.requestType,
        timeOfDayId: inputs.timeOfDay,
        dayOfWeekId: inputs.dayOfWeek,
        requestChangeDay: inputs.requestChangeDay,
        compensatoryDay: inputs.compensatoryDay,
        reason: inputs.reason
      },
      {
        onSuccess: () => {
          notify({
            title: 'Activity request created',
            status: 'success'
          });
          queryClient.invalidateQueries(MY_ACTIVITY_REQUESTS_QUERY_KEY);
          onClose();
        }
      }
    );
  };

  return (
    <>
      <ModalOverlay />

      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Create your activity request</ModalHeader>

        <ModalBody className="space-y-4">
          <HookFormSelect
            name={'requestType'}
            errors={errors}
            register={register}
            label={'Request type'}
            options={REQUEST_TYPES}
          />

          <HookFormSelect
            name={'timeOfDay'}
            errors={errors}
            register={register}
            label={'Time of day'}
            options={timeOfDays}
          />

          {RequestTypes.WORKING === requestType && (
            <FormControl isInvalid={!!errors.dayOfWeek}>
              <FormLabel htmlFor="dayOfWeek">Day of week</FormLabel>

              <Controller
                control={control}
                name={'dayOfWeek'}
                render={({ field }) => {
                  return (
                    <RadioGroup onChange={field.onChange} value={field.value}>
                      <div className={'flex row gap-2'}>
                        {dayOfWeeks.map(dayOfWeek => {
                          return (
                            <Radio key={dayOfWeek.id} value={dayOfWeek.id}>
                              {dayOfWeek.name}
                            </Radio>
                          );
                        })}
                      </div>
                    </RadioGroup>
                  );
                }}
              />

              {errors.dayOfWeek && (
                <FormErrorMessage>{errors.dayOfWeek?.message}</FormErrorMessage>
              )}
            </FormControl>
          )}

          {[RequestTypes.ABSENCE, RequestTypes.LATE].includes(
            requestType as RequestTypes
          ) && (
            <HookFormInput
              name={'requestChangeDay'}
              errors={errors}
              register={register}
              label={
                {
                  [RequestTypes.ABSENCE]: 'Absense Day',
                  [RequestTypes.LATE]: 'Late Day'
                }[requestType]
              }
              type={'date'}
              isRequired
            />
          )}

          {RequestTypes.LATE === requestType && (
            <blockquote>
              Late policy: 15 minutes late only. If any exceed, it will be count
              as absence.
            </blockquote>
          )}

          {RequestTypes.ABSENCE === requestType && (
            <HookFormInput
              name={'compensatoryDay'}
              errors={errors}
              register={register}
              label={'Compensatory Day'}
              type={'date'}
              isRequired
            />
          )}

          {[RequestTypes.ABSENCE, RequestTypes.LATE].includes(
            requestType as RequestTypes
          ) && (
            <HookFormTextarea
              name={'reason'}
              errors={errors}
              register={register}
              label={'Reason'}
              isRequired
            />
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit(createRequest)}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
}
