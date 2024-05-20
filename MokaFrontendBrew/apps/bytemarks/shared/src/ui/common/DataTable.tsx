import {
  MdFirstPage,
  MdLastPage,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';

const DataTable = ({
  data,
  columns,
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
}: {
  data: any[];
  columns: any[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  const pageCount = Math.ceil(totalCount / pageSize);

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-theme-accent text-theme-text">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-theme-card-bg divide-y divide-theme-border">
          {data &&
            data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className="group hover:bg-theme-accent hover:bg-opacity-10 transition duration-300"
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-theme-text"
                  >
                    {typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : item[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="px-4 py-3 flex items-center justify-between bg-theme-bg sm:px-6">
        <PaginationInfo
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={totalCount}
        />
        <PaginationControls
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

const PaginationInfo = ({
  currentPage,
  pageSize,
  totalCount,
}: {
  currentPage: number;
  pageSize: number;
  totalCount: number;
}) => (
  <div>
    <p className="text-sm text-theme-text">
      Showing{' '}
      <span className="font-semibold">{(currentPage - 1) * pageSize + 1}</span>{' '}
      to{' '}
      <span className="font-semibold">
        {Math.min(currentPage * pageSize, totalCount ?? 1)}
      </span>{' '}
      of <span className="font-semibold">{totalCount}</span> results
    </p>
  </div>
);

const PaginationControls = ({
  currentPage,
  pageCount,
  onPageChange,
}: {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}) => (
  <nav
    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
    aria-label="Pagination"
  >
    <PageButton
      label="First"
      onClick={() => onPageChange(1)}
      icon={<MdFirstPage />}
      disabled={currentPage <= 1}
    />
    <PageButton
      label="Previous"
      onClick={() => onPageChange(currentPage - 1)}
      icon={<MdChevronLeft />}
      disabled={currentPage <= 1}
    />
    <PageButton
      label="Next"
      onClick={() => onPageChange(currentPage + 1)}
      icon={<MdChevronRight />}
      disabled={currentPage >= pageCount}
    />
    <PageButton
      label="Last"
      onClick={() => onPageChange(pageCount)}
      icon={<MdLastPage />}
      disabled={currentPage >= pageCount}
    />
  </nav>
);

const PageButton = ({
  label,
  onClick,
  icon,
  disabled,
}: {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
  disabled: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`relative inline-flex items-center px-2 py-2 rounded-md text-sm font-medium focus:outline-none ${
      disabled
        ? 'cursor-not-allowed text-theme-border bg-theme-card-bg'
        : 'text-theme-text bg-theme-card-bg hover:bg-theme-accent hover:text-theme-button-text'
    } focus:ring-2 focus:ring-theme-accent`}
    aria-label={label}
  >
    {icon}
  </button>
);

export default DataTable;
