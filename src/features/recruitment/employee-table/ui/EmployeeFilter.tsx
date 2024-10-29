import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useEventDetailStore } from '../../../../entities/recruitment/models/event-detail.store';
import { VoteStatus } from '../../../../entities/recruitment/configs/event.constant';

export function EmployeeFilter() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const voteStatus = useEventDetailStore(state => state.voteStatus);
  const toggleVoteStatus = useEventDetailStore(state => state.toggleVoteStatus);

  return (
    <>
      <Popover
        placement="bottom-start"
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      >
        <PopoverTrigger>
          <Button
            leftIcon={
              <FontAwesomeIcon className={classNames('pr-2')} icon={faFilter} />
            }
            colorScheme={voteStatus ? 'teal' : undefined}
          >
            Status
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverHeader>Status</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Flex className="space-x-4 my-2">
              <FormControl className="grid grid-cols-2 gap-2">
                <Checkbox
                  isChecked={voteStatus === VoteStatus.Passed}
                  onChange={() => toggleVoteStatus(VoteStatus.Passed)}
                >
                  Passed
                </Checkbox>
                <Checkbox
                  isChecked={voteStatus === VoteStatus.NotVoted}
                  onChange={() => toggleVoteStatus(VoteStatus.NotVoted)}
                >
                  Not Voted
                </Checkbox>
                <Checkbox
                  isChecked={voteStatus === VoteStatus.Failed}
                  onChange={() => toggleVoteStatus(VoteStatus.Failed)}
                >
                  Failed
                </Checkbox>
              </FormControl>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
