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
  RadioGroup,
  Select
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
import { REQUEST_TYPES } from '../../../../../../entities/activities/config/constants/request-activity-metadata.constant';
import {
  useDayOfWeeksQuery,
  useTimeOfDayQuery
} from '../../../../../../entities/activities/models/activity-master-data.model';

export type CreateActivityInputs = {
  requestType: string;
  timeOfDay: string;
  dayOfWeek: string;
};

type AddActivityModalProps = Pick<UseDisclosureApi, 'onClose'>;

const validationSchema = object({
  requestType: string().required(),
  timeOfDay: string().required(),
  dayOfWeek: string().required()
});

export function AddActivityRequestModal({
  onClose
}: AddActivityModalProps): React.ReactElement {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control
  } = useForm<CreateActivityInputs>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });
  const notify = useNotify();

  const queryClient = useQueryClient();
  const { mutate } = useCreateActivityRequestMutation();
  const { data: DAY_OF_WEEKS } = useDayOfWeeksQuery();
  const { data: TIME_OF_DAYS } = useTimeOfDayQuery();

  const createRequest: SubmitHandler<CreateActivityInputs> = inputs => {
    mutate(
      {
        requestType: inputs.requestType,
        timeOfDayId: inputs.timeOfDay,
        dayOfWeekId: inputs.dayOfWeek
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
          <FormControl isInvalid={!!errors.requestType}>
            <FormLabel htmlFor="requestType">Title</FormLabel>

            <Select
              placeholder="Select request type"
              {...register('requestType', {
                required: 'title is required'
              })}
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
              <FormErrorMessage>{errors.requestType?.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.timeOfDay}>
            <FormLabel htmlFor="timeOfDay">Time of day</FormLabel>

            <Select
              placeholder="Select Time of day"
              {...register('timeOfDay', {
                required: 'Time of day is required'
              })}
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
                  <RadioGroup onChange={field.onChange} value={field.value}>
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
