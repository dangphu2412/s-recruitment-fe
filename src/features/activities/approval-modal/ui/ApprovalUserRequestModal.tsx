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
  useActivityRequestStore,
  useMyActivityStore,
  useUpdateApprovalActivityRequestMutation
} from '../../../../entities/activities/models/activity-request.model';
import { ApprovalRequestAction } from '../../../../entities/activities/config/constants/request-activity-status.enum';
import { useRef } from 'react';
import { useNotify } from '../../../../shared/models/notify';

export function ApprovalUserRequestModal() {
  const approvalModel = useMyActivityStore(state => state.approvalModel);
  const { mutate } = useUpdateApprovalActivityRequestMutation();
  const notify = useNotify();

  function close() {
    useMyActivityStore.setState({
      approvalModel: null,
      selectedId: null
    });
    useActivityRequestStore.setState({
      selectedId: null
    });
  }

  function revise(reviseForm: ReviseForm) {
    if (!approvalModel) return;

    mutate(
      {
        ids: [approvalModel.id],
        action: ApprovalRequestAction.REVISE,
        ...reviseForm
      },
      {
        onSuccess: () => {
          close();
          notify({
            title: 'Request updated',
            description: 'Request has been updated successfully',
            status: 'success'
          });
        }
      }
    );
  }

  function reject(rejectForm: RejectForm) {
    if (!approvalModel) return;

    mutate(
      {
        ids: [approvalModel.id],
        action: ApprovalRequestAction.REJECT,
        ...rejectForm
      },
      {
        onSuccess: () => {
          close();
          notify({
            title: 'Request updated',
            description: 'Request has been updated successfully',
            status: 'success'
          });
        }
      }
    );
  }

  if (ApprovalRequestAction.REVISE === approvalModel?.action) {
    return <ReviseModal onClose={close} onSubmit={revise} />;
  }

  if (ApprovalRequestAction.REJECT === approvalModel?.action) {
    return <RejectModal onClose={close} onSubmit={reject} />;
  }

  return null;
}

type RejectForm = {
  rejectReason?: string;
};
type RejectModalProps = {
  onClose: () => void;
  onSubmit: (rejectForm: RejectForm) => void;
};

function RejectModal({ onSubmit, onClose }: RejectModalProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  function handleSubmit() {
    onSubmit({
      rejectReason: ref.current?.value
    });
  }

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reject Request</ModalHeader>
        <ModalCloseButton />
        <ModalBody className={'space-y-2'}>
          <Text>Reject Reason</Text>
          <Textarea
            ref={ref}
            placeholder="Please provide reason for rejection"
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme={'red'} variant="solid" onClick={handleSubmit}>
            Reject
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

type ReviseForm = {
  reviseNote?: string;
};
type ReviseModalProps = {
  onClose: () => void;
  onSubmit: (reviseForm: ReviseForm) => void;
};

function ReviseModal({ onSubmit, onClose }: ReviseModalProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  function handleSubmit() {
    onSubmit({
      reviseNote: ref.current?.value
    });
  }

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Revise Request</ModalHeader>
        <ModalCloseButton />
        <ModalBody className={'space-y-2'}>
          <Text>Revise Instruction</Text>
          <Textarea
            ref={ref}
            placeholder="Please provide specific instruction"
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme={'cyan'} variant="solid" onClick={handleSubmit}>
            Revise
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
