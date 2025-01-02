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
  useMyActivityStore,
  useUpdateApprovalActivityRequestMutation
} from '../../../../entities/activities/models/activity-request.model';
import { ApprovalRequestAction } from '../../../../entities/activities/config/constants/request-activity-status.enum';
import { useRef } from 'react';
import { useNotify } from '../../../../shared/models/notify';

export function ApprovalUserRequestModal() {
  const approvalModel = useMyActivityStore(state => state.approvalModel);
  const setApprovalModel = useMyActivityStore(state => state.setApprovalModel);
  const { mutate } = useUpdateApprovalActivityRequestMutation();
  const ref = useRef<HTMLTextAreaElement>(null);
  const notify = useNotify();

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
        ids: [approvalModel.id],
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
