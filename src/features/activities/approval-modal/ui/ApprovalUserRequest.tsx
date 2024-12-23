import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea
} from '@chakra-ui/react';
import {
  ACTIVITY_REQUESTS_QUERY_KEY,
  MY_ACTIVITY_REQUESTS_QUERY_KEY,
  useMyActivityStore,
  useUpdateApprovalActivityRequestMutation
} from '../../../../entities/activities/models/activity-request.model';
import { ApprovalRequestAction } from '../../../../entities/activities/config/constants/request-activity-status.enum';
import { useRef } from 'react';
import { useNotify } from '../../../../shared/models/notify';
import { useQueryClient } from 'react-query';

export function ApprovalUserRequest() {
  const approvalModel = useMyActivityStore(state => state.approvalModel);
  const setApprovalModel = useMyActivityStore(state => state.setApprovalModel);
  const { mutate } = useUpdateApprovalActivityRequestMutation();
  const ref = useRef<HTMLTextAreaElement>(null);
  const notify = useNotify();
  const queryClient = useQueryClient();

  function handleSubmit() {
    if (!approvalModel) return;

    const note =
      approvalModel.action === ApprovalRequestAction.REVISE
        ? {
            reviseNote: ref.current?.value
          }
        : {
            rejectReason: ref.current?.value
          };

    mutate(
      {
        id: approvalModel.id,
        action: approvalModel.action,
        ...note
      },
      {
        onSuccess: () => {
          setApprovalModel(null);
          notify({
            title: 'Request updated',
            description: 'Request has been updated successfully',
            status: 'success'
          });
          queryClient.invalidateQueries({
            queryKey: [ACTIVITY_REQUESTS_QUERY_KEY]
          });
          queryClient.invalidateQueries({
            queryKey: [MY_ACTIVITY_REQUESTS_QUERY_KEY]
          });
        }
      }
    );
  }

  if (!approvalModel) {
    return null;
  }

  return (
    <Modal isOpen={true} onClose={() => setApprovalModel(null)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reason modal</ModalHeader>
        <ModalCloseButton />
        <ModalBody className={'space-y-2'}>
          <Text>
            {approvalModel.action === ApprovalRequestAction.REJECT
              ? 'Reject reason'
              : 'Revise Note'}
          </Text>
          <Textarea ref={ref} />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme={'pink'} variant="solid" onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
