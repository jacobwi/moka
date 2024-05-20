/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from 'react'
import {
  MdBookmark,
  MdCategory,
  MdOpenInNew,
  MdTagFaces,
  MdErrorOutline,
  MdLabel,
} from 'react-icons/md'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line,
} from 'recharts'
import { useAuth } from 'shared/hooks'
import { bookmarkService } from 'shared/services'
import { Loading } from 'shared/ui'

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#A28DFF',
  '#FF6384',
]

const DashboardPage = () => {
  const { user } = useAuth()
  const [bookmarks, setBookmarks] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [tasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const bookmarksPromise = bookmarkService.getAllBookmarks()
      const categoriesPromise = bookmarkService.getAllCategories()
      const tagsPromise = bookmarkService.getAllTags()

      const [bookmarksData, categoriesData, tagsData] = await Promise.all([
        bookmarksPromise,
        categoriesPromise,
        tagsPromise,
      ])

      setBookmarks(bookmarksData.data || [])
      setCategories(categoriesData.data || [])
      setTags(tagsData.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (isLoading) {
    return <Loading />
  }
  const categoryData =
    (categories as { name?: string }[])?.map((category, index) => ({
      name: category?.name ?? 'Unnamed Category',
      value: Math.floor(Math.random() * 100), // Mock value, replace with actual data
      color: COLORS[index % COLORS.length],
    })) ?? []

  const tagData =
    (tags as { name?: string }[])?.map((tag) => ({
      name: tag?.name ?? 'Unnamed Tag',
      bookmarks: Math.floor(Math.random() * 100), // Mock value, replace with actual data
    })) ?? []

  const taskData =
    (tasks as { name?: string }[])?.map((task) => ({
      name: task?.name ?? 'Unnamed Task',
      A: Math.floor(Math.random() * 100), // Mock value, replace with actual data
    })) ?? []

  return (
    <div className="p-6 bg-theme-bg min-h-screen text-theme-text">
      <DashboardHeader username={user?.username} />
      <StatCards bookmarks={bookmarks} categories={categories} tags={tags} />
      <DataSections bookmarks={bookmarks} categories={categories} tags={tags} />
      {/* Chart Section */}
      <ChartSection
        categoryData={categoryData}
        tagData={tagData}
        taskData={taskData}
        activityData={undefined}
      />
    </div>
  )
}

const DashboardHeader = ({ username }: { username: string }) => (
  <>
    <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
    <h2 className="text-xl font-bold mb-8">
      Hi <span className="text-theme-accent">{username?.toUpperCase()}</span> 👋
    </h2>
  </>
)
const ChartSection = ({
  categoryData,
  tagData,
  taskData,
  activityData,
}: {
  categoryData: { name: string; value: number; color: string }[]
  tagData: { name: string; bookmarks: number }[]
  taskData: { name: string; A: number }[]
  activityData: undefined
}) => {
  return (
    <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Categories Distribution */}
      <div className="p-4 bg-theme-card-bg rounded-lg shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-theme-accent">
          Categories Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius="70%"
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bookmarks by Tag */}
      <div className="p-4 bg-theme-card-bg rounded-lg shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-theme-accent">
          Bookmarks by Tag
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={tagData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="bookmarks" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Additional Charts */}
      {/* Task Completion Radar Chart */}
      <div className="p-4 bg-theme-card-bg rounded-lg shadow-xl col-span-1 lg:col-span-2">
        <h3 className="text-xl font-semibold mb-4 text-theme-accent">
          Task Completion Overview
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart outerRadius="70%" data={taskData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar
              name="Tasks"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* User Activity Line Chart */}
      <div className="p-4 bg-theme-card-bg rounded-lg shadow-xl col-span-1 lg:col-span-2">
        <h3 className="text-xl font-semibold mb-4 text-theme-accent">
          User Activity
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
const StatCards = ({
  bookmarks,
  categories,
  tags,
}: {
  bookmarks: any
  categories: any
  tags: any
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <StatCard
      icon={<MdBookmark />}
      title="Bookmarks"
      value={bookmarks.length}
    />
    <StatCard
      icon={<MdCategory />}
      title="Categories"
      value={categories.length}
    />
    <StatCard icon={<MdLabel />} title="Tags" value={tags.length} />
    {/* Additional stat cards can be added here */}
  </div>
)

const DataSections = ({
  bookmarks,
  categories,
  tags,
}: {
  bookmarks: any
  categories: any
  tags: any
}) => (
  <>
    <DataSection
      title="Recent Bookmarks"
      data={bookmarks.slice(0, 6)}
      renderItem={renderBookmark}
      noDataText="bookmarks"
    />
    <DataSection
      title="Categories Overview"
      data={categories}
      renderItem={renderCategory}
      noDataText="categories"
    />
    <DataSection
      title="Tags Summary"
      data={tags}
      renderItem={renderTag}
      noDataText="tags"
    />
    {/* More data sections can be added here */}
  </>
)

const renderBookmark = (bookmark) => (
  <div
    key={bookmark.id}
    className="py-2 px-4 bg-theme-card-bg rounded-lg hover:bg-theme-accent-hover transition-colors duration-300 cursor-pointer flex items-center justify-between"
  >
    <span>{bookmark.title}</span>
    <MdOpenInNew className="text-theme-text" />
  </div>
)

const renderCategory = (category) => (
  <div
    key={category.id}
    className="py-2 px-4 bg-theme-card-bg rounded-lg hover:bg-theme-accent-hover transition-colors duration-300 cursor-pointer flex items-center justify-between"
  >
    <span>{category.name}</span>
    <MdTagFaces className="text-theme-text" />
  </div>
)

const renderTag = (tag) => (
  <div
    key={tag.id}
    className="py-2 px-4 bg-theme-card-bg rounded-lg hover:bg-theme-accent-hover transition-colors duration-300 cursor-pointer flex items-center justify-between"
  >
    <span>{tag.name}</span>
    <MdLabel className="text-theme-text" />
  </div>
)

const StatCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode
  title: string
  value: number
}) => (
  <div className="p-4 bg-theme-card-bg rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-4 cursor-pointer">
    <div className="text-4xl text-theme-accent">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p>{value} Items</p>
    </div>
  </div>
)

const DataSection = ({
  title,
  data,
  renderItem,
  noDataText,
}: {
  title: string
  data: any[]
  renderItem: (item: any) => React.ReactNode
  noDataText: string
}) => (
  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-4 text-theme-accent">{title}</h2>
    {data.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(renderItem)}
      </div>
    ) : (
      <NoDataMessage itemType={noDataText} />
    )}
  </section>
)

const NoDataMessage = ({ itemType }: { itemType: string }) => (
  <div className="text-center py-4">
    <MdErrorOutline className="text-4xl text-theme-accent" />
    <p className="mt-2 text-theme-text">No {itemType} found.</p>
  </div>
)

export default DashboardPage
