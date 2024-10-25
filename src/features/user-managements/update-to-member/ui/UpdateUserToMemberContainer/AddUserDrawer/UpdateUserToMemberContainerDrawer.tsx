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
  Heading,
  Select,
  Text
} from '@chakra-ui/react';
import { UseDisclosureApi } from 'src/shared/models/disclosure.api';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  useDepartments,
  usePeriods
} from '../../../../../../entities/master-data/useMasteData';
import {
  QUERY_USERS_KEY,
  useMutateUpgradeMembers,
  useProbationUsers
} from '../../../../../../entities/user/models';
import { Table } from '../../../../../../shared/ui';
import { Column } from 'react-table';
import { formatDate } from '../../../../../../shared/models/utils/date.utils';
import { useNotify } from '../../../../../../shared/models/notify';
import { useQueryMonthlyMoneyConfigs } from '../../../../../../entities/monthly-money/models';
import { useQueryClient } from 'react-query';
import { MoneyOption } from '../../../../../../entities/monthly-money/ui/MoneyOption/MoneyOption';

export type MemberInputs = {
  domain: string;
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

export function UpdateUserToMemberContainerDrawer({
  onClose
}: AddUserDrawerProps): React.ReactElement {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch
  } = useForm<MemberInputs>({
    mode: 'onChange'
  });

  const period = watch('period');
  const domain = watch('domain');
  const notify = useNotify();

  const columns: Column<UserProbation>[] = useMemo(() => {
    return [
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Probation End Date',
        accessor: 'probationEndDate'
      },
      {
        Header: 'Created At',
        accessor: 'createdAt'
      }
    ];
  }, []);

  const { data: domains } = useDepartments();
  const { data: periods } = usePeriods();
  const { monthlyMoneyConfigs } = useQueryMonthlyMoneyConfigs({
    isEnabled: true
  });
  const { data: probationUsers, isLoading } = useProbationUsers({
    domainId: domain,
    periodId: period
  });
  const { upgradeToMembers } = useMutateUpgradeMembers();

  const queryClient = useQueryClient();

  const items = useMemo(() => {
    return probationUsers?.items.map(item => {
      return {
        ...item,
        probationEndDate: formatDate(new Date(item.probationEndDate)),
        createdAt: formatDate(new Date(item.createdAt))
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

        <DrawerHeader>Upgrade Probation to Members in S-Group</DrawerHeader>

        <DrawerBody className="space-y-4">
          <div className="space-y-4">
            <Heading as={'h3'} size={'md'}>
              Step 1: Please select probationary users from the available data
              source?
            </Heading>
            <Text>
              Please note that user that is <b>inactive</b> will not be shown
              here
            </Text>

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

              <FormControl isInvalid={!!errors.domain}>
                <FormLabel htmlFor="create-user-type">Domain</FormLabel>

                <Select placeholder="Select domain" {...register('domain')}>
                  {domains?.map(domain => {
                    return (
                      <option key={domain.id} value={domain.id}>
                        {domain.name}
                      </option>
                    );
                  })}
                </Select>

                {errors.domain && (
                  <FormErrorMessage>{errors.domain?.message}</FormErrorMessage>
                )}
              </FormControl>
            </div>
          </div>

          <div className="space-y-4">
            <Heading as={'h3'} size={'md'}>
              Step 2: Please correct the users that we are upgrading to members
            </Heading>

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

            <Table columns={columns} items={items} isLoading={isLoading} />
          </div>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit(saveUser)}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </>
  );
}
