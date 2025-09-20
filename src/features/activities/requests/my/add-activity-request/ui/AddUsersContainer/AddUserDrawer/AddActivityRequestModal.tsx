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
import { UseDisclosureApi } from 'src/shared/disclosure.api';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from 'react-query';
import {
  ActivityRequestInputs,
  activityRequestValidationSchema,
  MY_ACTIVITY_REQUESTS_QUERY_KEY,
  useCreateActivityRequestMutation
} from '../../../../../../../../entities/activities/models/activity-request.model';
import { useNotify } from '../../../../../../../../shared/notify';
import {
  REQUEST_TYPES,
  RequestTypes
} from '../../../../../../../../entities/activities/config/constants/request-activity-metadata.constant';
import {
  useDayOfWeeksQuery,
  useTimeOfDayQuery
} from '../../../../../../../../entities/activities/models/activity-master-data.model';
import { HookFormTextarea } from '../../../../../../../../shared/ui/Form/HookFormTextarea/HookFormInput';
import { HookFormInput } from '../../../../../../../../shared/ui/Form/HookFormInput/HookFormInput';
import { HookFormSelect } from '../../../../../../../../shared/ui/Form/HookFormSelect/HookFormSelect';
import Link from 'next/link';
import { addDays } from 'date-fns';
import { formatToInputDate } from '../../../../../../../../shared/date';

type AddActivityModalProps = Pick<UseDisclosureApi, 'onClose'>;

export function AddActivityRequestModal({
  onClose
}: AddActivityModalProps): React.ReactElement {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch
  } = useForm<ActivityRequestInputs>({
    mode: 'onChange',
    resolver: yupResolver(activityRequestValidationSchema),
    defaultValues: {
      requestType: RequestTypes.WORKING
    }
  });
  const requestType = watch('requestType');
  const requestChangeDay = watch('requestChangeDay');
  const minCompensatoryDay = requestChangeDay
    ? formatToInputDate(addDays(new Date(requestChangeDay), 1))
    : undefined;

  const notify = useNotify();

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useCreateActivityRequestMutation();
  const { data: dayOfWeeks } = useDayOfWeeksQuery();
  const { data: timeOfDays } = useTimeOfDayQuery();

  const createRequest: SubmitHandler<ActivityRequestInputs> = inputs => {
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
            description: (
              <p>
                Your request has been created successfully. View it{' '}
                <Link
                  href={'/activities/requests/my'}
                  className={'underline text-black'}
                >
                  here
                </Link>
              </p>
            ),
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
            isRequired
          />

          <HookFormSelect
            name={'timeOfDay'}
            errors={errors}
            register={register}
            label={'Time of day'}
            options={timeOfDays}
            isRequired
          />

          {RequestTypes.WORKING === requestType && (
            <FormControl isInvalid={!!errors.dayOfWeek} isRequired>
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
              min={minCompensatoryDay}
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
          <Button
            colorScheme="blue"
            onClick={handleSubmit(createRequest)}
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
}
