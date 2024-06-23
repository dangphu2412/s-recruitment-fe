import React, { ReactElement, useRef } from 'react';
import { FullLoader } from '../../../shared/ui/Loader/Full/FullLoader';
import { Card, ContentHeader } from '../../../shared/ui';
import { useQueryPostDetail } from '../../../entities/posts/models';
import { useRouter } from 'next/router';
import { normalizeParam } from '../../../shared/models/utils/router.utils';
import { Parser } from 'html-to-react';
import { EditButton } from '../../../shared/ui/Button';
import { useToggle } from 'react-use';
import { Button, Flex } from '@chakra-ui/react';
import { EditPostForm } from '../../../features/posts/add-post/ui/EditPostForm';
import { TitleLabel } from '../../../shared/ui/Text/TitleLabel';

// @ts-ignore
const htmlParser = new Parser();

export default function ViewPostDetailPage(): ReactElement {
  const { query } = useRouter();
  const id = normalizeParam(query.id);

  const { data } = useQueryPostDetail(id);
  const [isEditable, toggleEditable] = useToggle(false);
  const ref = useRef<HTMLFormElement>(null);

  function renderContent() {
    if (isEditable) {
      return (
        <EditPostForm
          id={id}
          defaultValues={data}
          ref={ref}
          onSuccess={toggleEditable}
        />
      );
    }

    return (
      <>
        <TitleLabel>{data?.title}</TitleLabel>
        {htmlParser.parse(data?.content)}
      </>
    );
  }

  function renderAction() {
    if (!isEditable) {
      return <EditButton onClick={toggleEditable} />;
    }

    return (
      <div className={'space-x-2'}>
        <Button
          variant="outline"
          onClick={() => {
            toggleEditable();
          }}
        >
          Cancel
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => {
            ref.current?.onSubmit();
          }}
        >
          Save
        </Button>
      </div>
    );
  }

  return (
    <div className={'space-y-2'}>
      <FullLoader isLoading={false} />

      <Card className={'space-y-4'}>
        <Flex justifyContent={'space-between'}>
          <ContentHeader
            main={'Post Detail'}
            brief={'Where you can add your post'}
          />

          {renderAction()}
        </Flex>

        {renderContent()}
      </Card>
    </div>
  );
}
