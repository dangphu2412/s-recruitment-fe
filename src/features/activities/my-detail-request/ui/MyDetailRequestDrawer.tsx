import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Tag
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import {
  REQUEST_TYPES,
  RequestTypes
} from '../../../../entities/activities/config/constants/request-activity-metadata.constant';
import { RequestActivityStatus } from '../../../../entities/activities/config/constants/request-activity-status.enum';
import { ActivityStatusTag } from '../../../../entities/activities/ui/ActivityStatusTag/ActivityStatusTag';
import {
  ACTIVITY_REQUESTS_QUERY_KEY,
  ActivityRequestInputs,
  activityRequestValidationSchema,
  MY_ACTIVITY_REQUESTS_QUERY_KEY,
  useUpdateMyActivityRequestMutation
} from '../../../../entities/activities/models/activity-request.model';
import { useNotify } from '../../../../shared/models/notify';
import { useQueryClient } from 'react-query';
import {
  useDayOfWeeksQuery,
  useTimeOfDayQuery
} from '../../../../entities/activities/models/activity-master-data.model';
import { HookFormSelect } from '../../../../shared/ui/Form/HookFormSelect/HookFormSelect';
import { HookFormInput } from '../../../../shared/ui/Form/HookFormInput/HookFormInput';
import { HookFormTextarea } from '../../../../shared/ui/Form/HookFormTextarea/HookFormInput';

type MyDetailRequestDrawerProps = {
  defaultValues: ActivityRequestInputs;
  isOpen: boolean;
  onClose: () => void;
  id: number;
  approvalStatus: RequestActivityStatus;
  rejectReason?: string;
  reviseNote?: string;
};

export function MyDetailRequestDrawer({
  defaultValues,
  isOpen,
  onClose,
  approvalStatus,
  reviseNote,
  rejectReason,
  id
}: MyDetailRequestDrawerProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control
  } = useForm<ActivityRequestInputs>({
    mode: 'onChange',
    resolver: yupResolver(activityRequestValidationSchema),
    defaultValues
  });
  const { requestType } = defaultValues;
  const notify = useNotify();
  const { mutate } = useUpdateMyActivityRequestMutation();
  const queryClient = useQueryClient();
  const { data: DAY_OF_WEEKS } = useDayOfWeeksQuery();
  const { data: TIME_OF_DAYS } = useTimeOfDayQuery();

  const disabled = [
    RequestActivityStatus.APPROVED,
    RequestActivityStatus.REJECTED,
    RequestActivityStatus.PENDING
  ].includes(approvalStatus);

  function submit(inputs: ActivityRequestInputs) {
    const dto = {
      id,
      timeOfDayId: inputs.timeOfDay,
      dayOfWeekId: inputs.dayOfWeek
    };
    mutate(dto, {
      onSuccess: () => {
        notify({
          title: 'Request updated successfully',
          status: 'success'
        });
        queryClient.invalidateQueries({
          queryKey: [MY_ACTIVITY_REQUESTS_QUERY_KEY]
        });
        queryClient.invalidateQueries({
          queryKey: [ACTIVITY_REQUESTS_QUERY_KEY]
        });
        onClose();
      }
    });
  }

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" size={'md'} onClose={onClose}>
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader className={'flex items-center space-x-2'}>
            <span>My request</span>
            <ActivityStatusTag value={approvalStatus} />
          </DrawerHeader>

          <DrawerBody className="space-y-4">
            {RequestActivityStatus.REVISE === approvalStatus && reviseNote && (
              <Tag colorScheme={'yellow'}>Revise note: {reviseNote}</Tag>
            )}
            {RequestActivityStatus.REJECTED === approvalStatus &&
              rejectReason && (
                <Tag colorScheme={'red'}>Reject reason: {rejectReason}</Tag>
              )}
            <HookFormSelect
              name={'requestType'}
              errors={errors}
              register={register}
              label={'Request type'}
              options={REQUEST_TYPES}
              isDisabled
            />
            <HookFormSelect
              name={'timeOfDay'}
              errors={errors}
              register={register}
              label={'Time of day'}
              options={TIME_OF_DAYS}
              isDisabled={disabled}
            />
            {RequestTypes.WORKING === requestType && (
              <FormControl
                isInvalid={!!errors.dayOfWeek}
                isDisabled={disabled}
                isRequired
              >
                <FormLabel htmlFor="dayOfWeek">Day of week</FormLabel>

                <Controller
                  control={control}
                  name={'dayOfWeek'}
                  render={({ field }) => {
                    return (
                      <RadioGroup
                        onChange={field.onChange}
                        value={field.value}
                        isDisabled={disabled}
                      >
                        <div className={'flex row gap-2'}>
                          {DAY_OF_WEEKS.map(dayOfWeek => {
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
                  <FormErrorMessage>
                    {errors.dayOfWeek?.message}
                  </FormErrorMessage>
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
                isDisabled={disabled}
              />
            )}

            {RequestTypes.LATE === requestType && (
              <blockquote>
                Late policy: 15 minutes late only. If any exceed, it will be
                count as absence.
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
                isDisabled={disabled}
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
                isDisabled={disabled}
              />
            )}
          </DrawerBody>

          <DrawerFooter>
            {!disabled && (
              <Button colorScheme="blue" onClick={handleSubmit(submit)}>
                Submit
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
