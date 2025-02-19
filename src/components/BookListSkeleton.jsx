import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BookListSkeleton = ({ rows = 5 }) => {
  return (
    <div className="w-full max-h-[500px]">
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border-collapse bg-white shadow-sm rounded-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border p-3 text-center font-semibold w-10">#</th>
              <th className="border p-3 text-center font-semibold">Title</th>
              <th className="border p-3 text-center font-semibold">Author</th>
              <th className="border p-3 text-center font-semibold">Genre</th>
              <th className="border p-3 text-center font-semibold">ISBN</th>
              <th className="border p-3 text-center font-semibold">
                Published
              </th>
              <th className="border p-3 text-center font-semibold">Pages</th>
              <th className="border p-3 text-center font-semibold">Language</th>
              <th className="border p-3 text-center font-semibold w-20">
                Edit
              </th>
              <th className="border p-3 text-center font-semibold w-20">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, index) => (
              <tr
                key={index}
                className={`border-b ${index % 2 !== 0 ? "bg-gray-200" : ""}`}
              >
                <td className="p-3 text-center">
                  <Skeleton width={20} height={20} />
                </td>
                <td className="p-3 text-center">
                  <Skeleton width="80%" height={20} />
                </td>
                <td className="p-3 text-center">
                  <Skeleton width="60%" height={20} />
                </td>
                <td className="p-3 text-center">
                  <Skeleton width="50%" height={20} />
                </td>
                <td className="p-3 text-center">
                  <Skeleton width="70%" height={20} />
                </td>
                <td className="p-3 text-center">
                  <Skeleton width="50%" height={20} />
                </td>
                <td className="p-3 text-center">
                  <Skeleton width="40%" height={20} />
                </td>
                <td className="p-3 text-center">
                  <Skeleton width="50%" height={20} />
                </td>
                <td className="p-2 text-center">
                  <Skeleton width={40} height={30} />
                </td>
                <td className="p-2 text-center">
                  <Skeleton width={40} height={30} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookListSkeleton;
