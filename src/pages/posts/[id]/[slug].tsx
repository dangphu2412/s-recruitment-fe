import React, { ReactElement, useRef } from 'react';
import { FullLoader } from '../../../shared/ui/Loader/Full/FullLoader';
import { Card, ContentHeader } from '../../../shared/ui';
import { useQueryPostDetail } from '../../../entities/posts/models';
import { useRouter } from 'next/router';
import { normalizeParam } from '../../../shared/models/utils/router.utils';
import { EditButton } from '../../../shared/ui/Button';
import { useToggle } from 'react-use';
import { Button, Flex } from '@chakra-ui/react';
import { EditPostForm } from '../../../features/posts/add-post/ui/EditPostForm';
import { TitleLabel } from '../../../shared/ui/Text/TitleLabel';
import { htmlParser } from '../../../shared/models/html-parser/html-parser';

export default function ViewPostDetailPage(): ReactElement {
  const { query } = useRouter();
  const id = normalizeParam(query.id);

  const { data } = useQueryPostDetail(id);
  const [isEditable, toggleEditable] = useToggle(false);
  const ref = useRef<HTMLFormElement>(null);

  function renderContent() {
    if (isEditable && data) {
      const defaultValues = {
        title: data.title,
        content: data.content,
        categories: (data.categories ?? []).map(category => category.id),
        previewImageURL: data.previewImage,
        summary: data.summary
      };

      return (
        <EditPostForm
          id={id}
          defaultValues={defaultValues}
          ref={ref}
          onSuccess={toggleEditable}
        />
      );
    }

    return (
      <>
        <TitleLabel>{data?.title}</TitleLabel>
        <img src={data?.previewImage} alt={'Fail to load preview'} />
        {data?.categories?.map(category => (
          <span key={category.id}>{category.name}</span>
        ))}
        <div>{htmlParser.parse(data?.content)}</div>
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
