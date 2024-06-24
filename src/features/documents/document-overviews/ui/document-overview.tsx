import { DocumentCard } from './DocumentCard';
import {
  useQueryLatestPosts,
  useQueryPinPosts
} from '../../../../entities/posts/models';
import { useMemo } from 'react';
import { Card } from '../../../../shared/ui';
import { Text } from '@chakra-ui/react';
import { LatestCard } from './LatestCard';

export function DocumentOverview() {
  const { data: pinPosts } = useQueryPinPosts();
  const { data: latestPosts } = useQueryLatestPosts({
    pagination: { page: 1, size: 10 }
  });

  const pinItems = useMemo(() => {
    if (!pinPosts) return [];

    return pinPosts.items.map(item => {
      return {
        id: item.id,
        categories: item.categories.map(c => c.name),
        title: item.title,
        content: item.content,
        slug: item.slug,
        author: item.author.fullName,
        previewImage: item.previewImage,
        imageAlt: 'item.title',
        summary: item.summary
      };
    });
  }, [pinPosts]);
  const hotTopic = pinItems[0];
  const remains = pinItems.slice(1);

  const latestPostItems = useMemo(() => {
    if (!latestPosts) return [];

    return latestPosts.items.map(item => {
      return {
        id: item.id,
        categories: item.categories.map(c => c.name),
        title: item.title,
        content: item.content,
        slug: item.slug,
        author: 'Dang Phu',
        previewImage: item.previewImage,
        imageAlt: 'item.title',
        summary: item.summary
      };
    });
  }, [latestPosts]);

  return (
    <div className="space-y-4">
      <div className="flex flex-row space-x-12">
        <DocumentCard {...hotTopic} isHot />

        <div className="flex flex-col">
          {remains.map(({ previewImage, ...item }) => {
            return (
              <div>
                <DocumentCard key={item.slug} {...item} />
                <hr />
              </div>
            );
          })}
        </div>
      </div>

      <hr />

      <Text fontSize="3xl" as="b" marginTop="1rem">
        Tin mới nhất
      </Text>

      <div className={'space-y-4'}>
        {latestPostItems.map(item => {
          return (
            <Card key={item.slug}>
              <LatestCard {...item} />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
