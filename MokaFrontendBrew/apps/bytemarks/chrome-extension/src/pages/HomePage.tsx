import {
  IoLogoClosedCaptioning,
  IoBookmarks,
  IoPricetags,
} from 'react-icons/io5';
import { useBookmarks } from '@shared/hooks';

const HomePage = () => {
  const { bookmarks, categories, tags } = useBookmarks();
  const stats = [
    {
      title: 'Tags',
      count: tags.length,
      icon: <IoPricetags className="text-green-500" size={32} />,
    },
    {
      title: 'Bookmarks',
      count: bookmarks.length,
      icon: <IoBookmarks className="text-red-500" size={32} />,
    },
    {
      title: 'Categories',
      count: categories.length,
      icon: <IoLogoClosedCaptioning className="text-blue-500" size={32} />,
    },
    // Add more stats as needed
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 p-4 bg-gray-100">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          count={stat.count}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

const StatCard = ({
  title,
  count,
  icon,
}: {
  title: string;
  count: number;
  icon: JSX.Element;
}) => {
  return (
    <div className="flex flex-col items-center justify-between p-6 bg-white rounded-lg shadow-md w-full sm:w-48 h-48 hover:shadow-lg transition-shadow duration-300 ease-in-out">
      {icon}
      <div className="mt-2 text-3xl font-semibold text-gray-800">{count}</div>
      <div className="text-lg text-gray-600">{title}</div>
    </div>
  );
};

export default HomePage;
