import React, { useMemo } from 'react';
import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select
} from '@chakra-ui/react';
import { UseDisclosureApi } from 'src/shared/models/disclosure.api';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  useDepartments,
  usePeriods
} from '../../../../../../entities/user/models/user-master-data.model';
import {
  QUERY_USERS_KEY,
  useMutateUpgradeMembers,
  useProbationUsers
} from '../../../../../../entities/user/models';
import { BasicTable } from '../../../../../../shared/ui';
import { formatDate } from '../../../../../../shared/models/utils/date.utils';
import { useNotify } from '../../../../../../shared/models/notify';
import { useQueryMonthlyMoneyConfigs } from '../../../../../../entities/monthly-money/models';
import { useQueryClient } from 'react-query';
import { MoneyOption } from '../../../../../../entities/monthly-money/ui/MoneyOption/MoneyOption';
import { createColumnHelper } from '@tanstack/table-core';

export type MemberInputs = {
  department: string;
  period: string;
  monthlyMoneyConfig: number;
};

type UserProbation = {
  id: string;
  email: string;
  probationEndDate: string;
  createdAt: string;
};
type AddUserDrawerProps = Pick<UseDisclosureApi, 'onClose'>;

const columnHelper = createColumnHelper<UserProbation>();

export function UpdateUserToMemberContainerDrawer({
  onClose
}: AddUserDrawerProps): React.ReactElement {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch
  } = useForm<MemberInputs>({
    mode: 'onChange'
  });

  const period = watch('period');
  const department = watch('department');
  const notify = useNotify();

  const columns = useMemo(() => {
    return [
      columnHelper.accessor('email', {
        header: 'Email'
      }),
      columnHelper.accessor('probationEndDate', {
        header: 'Probation End Date'
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created At'
      })
    ];
  }, []);

  const { data: departments } = useDepartments();
  const { data: periods } = usePeriods();
  const { monthlyMoneyConfigs } = useQueryMonthlyMoneyConfigs({
    isEnabled: true,
    onSuccess: data => {
      setValue('monthlyMoneyConfig', data[0].id);
    }
  });
  const { data: probationUsers, isLoading } = useProbationUsers({
    departmentId: department,
    periodId: period
  });
  const { upgradeToMembers } = useMutateUpgradeMembers();

  const queryClient = useQueryClient();

  const items = useMemo(() => {
    return probationUsers?.items.map(item => {
      return {
        ...item,
        probationEndDate: formatDate(item.probationEndDate),
        createdAt: formatDate(item.createdAt)
      };
    });
  }, [probationUsers]);

  const saveUser: SubmitHandler<MemberInputs> = memberInputs => {
    upgradeToMembers(
      {
        ids: probationUsers?.items.map(item => item.id) || [],
        monthlyConfigId: memberInputs.monthlyMoneyConfig
      },
      {
        onSuccess: () => {
          notify({
            title: 'Upgrade probation to members successfully',
            status: 'success'
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_USERS_KEY]
          });
          onClose();
        },
        onError: () => {
          notify({
            title: 'Upgrade probation to members failed due to system error',
            status: 'error'
          });
        }
      }
    );
  };

  return (
    <>
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>Upgrade to Official Member</DrawerHeader>

        <DrawerBody className="space-y-4">
          <div className="space-y-4">
            <div className={'grid grid-cols-2 gap-2'}>
              <FormControl isInvalid={!!errors.period} isRequired>
                <FormLabel htmlFor="period">Period</FormLabel>

                <Select
                  placeholder="Select period"
                  {...register('period', {
                    required: 'Period is required'
                  })}
                >
                  {periods?.map(period => {
                    return (
                      <option key={period.id} value={period.id}>
                        {period.name}
                      </option>
                    );
                  })}
                </Select>

                {errors.period && (
                  <FormErrorMessage>{errors.period?.message}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.department}>
                <FormLabel htmlFor="create-user-type">Department</FormLabel>

                <Select
                  placeholder="Select department"
                  {...register('department')}
                >
                  {departments?.map(department => {
                    return (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    );
                  })}
                </Select>

                {errors.department && (
                  <FormErrorMessage>
                    {errors.department?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </div>

            <FormControl isInvalid={!!errors.monthlyMoneyConfig} isRequired>
              <FormLabel htmlFor="create-user-type">
                Monthly Money Config
              </FormLabel>

              <Select
                placeholder="Select config"
                {...register('monthlyMoneyConfig', {
                  required: 'Monthly Money Config is required'
                })}
              >
                {monthlyMoneyConfigs?.map(config => {
                  return <MoneyOption key={config.id} {...config} />;
                })}
              </Select>

              {errors.monthlyMoneyConfig && (
                <FormErrorMessage>
                  {errors.monthlyMoneyConfig?.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <BasicTable columns={columns} items={items} isLoading={isLoading} />
          </div>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit(saveUser)}>
            Upgrade
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </>
  );
}
