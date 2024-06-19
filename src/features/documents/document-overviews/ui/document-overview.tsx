import { DocumentCard } from './DocumentCard';

export function DocumentOverview() {
  const items = [
    {
      category: 'Nội Quy',
      title: 'Nội Quy S-Group',
      titleSlug: 'noi-quy-s-group',
      author: 'Đặng Ngọc Phú',
      image: '/rules.jpeg',
      imageAlt: 'rules'
    },
    {
      category: 'Tin tức',
      title: 'Chuyển văn phòng',
      titleSlug: 'chuyen-van-phong',
      author: 'Đặng Ngọc Phú'
    },
    {
      category: 'Tin tức',
      title: 'Unihack 2024',
      titleSlug: 'unihack-2024',
      author: 'Đặng Ngọc Phú'
    }
  ];
  const hotTopic = items[0];
  const remains = items.slice(1);

  return (
    <div className="flex flex-row space-x-12">
      <DocumentCard {...hotTopic} isHot />

      <div className="flex flex-col">
        {remains.map(item => {
          return (
            <div>
              <DocumentCard key={item.category} {...item} />
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}
