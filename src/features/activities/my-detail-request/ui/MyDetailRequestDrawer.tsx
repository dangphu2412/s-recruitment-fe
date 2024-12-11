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
  Select,
  Tag
} from '@chakra-ui/react';
import { object, string } from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateActivityInputs } from '../../add-activity-request/ui/AddUsersContainer/AddUserDrawer';
import React from 'react';
import { REQUEST_TYPES } from '../../../../entities/activities/config/constants/request-activity-metadata.constant';
import { RequestActivityStatus } from '../../../../entities/activities/config/constants/request-activity-status.enum';
import { ActivityStatusTag } from '../../../../entities/activities/ui/ActivityStatusTag/ActivityStatusTag';
import {
  ACTIVITY_REQUESTS_QUERY_KEY,
  MY_ACTIVITY_REQUESTS_QUERY_KEY,
  useUpdateMyActivityRequestMutation
} from '../../../../entities/activities/models/activity-request.model';
import { useNotify } from '../../../../shared/models/notify';
import { useQueryClient } from 'react-query';
import {
  useDayOfWeeksQuery,
  useTimeOfDayQuery
} from '../../../../entities/activities/models/activity-master-data.model';

export type EditActivityInputs = {
  requestType: string;
  timeOfDay: string;
  dayOfWeek: string;
};

const validationSchema = object({
  requestType: string().required(),
  timeOfDay: string().required(),
  dayOfWeek: string().required()
});

type MyDetailRequestDrawerProps = {
  defaultValues: EditActivityInputs;
  isOpen: boolean;
  onClose: () => void;
  approvalStatus: RequestActivityStatus;
  rejectReason?: string;
  reviseNote?: string;
  id: number;
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
  } = useForm<CreateActivityInputs>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues
  });
  const notify = useNotify();
  const { mutate } = useUpdateMyActivityRequestMutation();
  const queryClient = useQueryClient();
  const { data: DAY_OF_WEEKS } = useDayOfWeeksQuery();
  const { data: TIME_OF_DAYS } = useTimeOfDayQuery();

  const disabled = [
    RequestActivityStatus.APPROVED,
    RequestActivityStatus.REJECTED
  ].includes(approvalStatus);

  function submit(inputs: EditActivityInputs) {
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
            <FormControl isInvalid={!!errors.requestType}>
              <FormLabel htmlFor="requestType">Title</FormLabel>

              <Select
                placeholder="Select request type"
                {...register('requestType', {
                  required: 'title is required'
                })}
                disabled
              >
                {REQUEST_TYPES?.map(timeOfDay => {
                  return (
                    <option key={timeOfDay.id} value={timeOfDay.id}>
                      {timeOfDay.name}
                    </option>
                  );
                })}
              </Select>

              {errors.requestType && (
                <FormErrorMessage>
                  {errors.requestType?.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.timeOfDay}>
              <FormLabel htmlFor="timeOfDay">Time of day</FormLabel>

              <Select
                placeholder="Select Time of day"
                {...register('timeOfDay', {
                  required: 'Time of day is required'
                })}
                disabled={disabled}
              >
                {TIME_OF_DAYS?.map(timeOfDay => {
                  return (
                    <option key={timeOfDay.id} value={timeOfDay.id}>
                      {timeOfDay.name}
                    </option>
                  );
                })}
              </Select>

              {errors.timeOfDay && (
                <FormErrorMessage>{errors.timeOfDay?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.dayOfWeek}>
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
                <FormErrorMessage>{errors.dayOfWeek?.message}</FormErrorMessage>
              )}
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            {![
              RequestActivityStatus.REJECTED,
              RequestActivityStatus.APPROVED
            ].includes(approvalStatus) && (
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
