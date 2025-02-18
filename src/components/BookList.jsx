import { FaEdit, FaTrash } from "react-icons/fa";

const BookList = ({ books, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto w-full max-h-[400px]">
      <table className="min-w-full table-fixed border-collapse bg-white shadow-sm rounded-md">
        <thead className="bg-gray-800">
          <tr>
            <th className="border p-3 text-center text-gray-200 font-semibold w-10">
              #
            </th>
            <th className="border p-3 text-center text-gray-200 font-semibold">
              Title
            </th>
            <th className="border p-3 text-center text-gray-200 font-semibold">
              Author
            </th>
            <th className="border p-3 text-center text-gray-200 font-semibold">
              Genre
            </th>
            <th className="border p-3 text-center text-gray-200 font-semibold">
              ISBN
            </th>
            <th className="border p-3 text-center text-gray-200 font-semibold">
              Published
            </th>
            <th className="border p-3 text-center text-gray-200 font-semibold">
              Pages
            </th>
            <th className="border p-3 text-center text-gray-200 font-semibold">
              Language
            </th>
            <th className="border p-3 text-center text-gray-200 font-semibold w-20">
              Edit
            </th>
            <th className="border p-3 text-center text-gray-200 font-semibold w-20">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr
              key={book.id}
              className="border-b hover:bg-gray-50 transition duration-200"
            >
              <td className="p-3 text-center text-gray-800 align-middle">
                {index + 1}
              </td>
              <td className="p-3 text-center text-gray-800 align-middle">
                {book.title}
              </td>
              <td className="p-3 text-center text-gray-800 align-middle">
                {book.author}
              </td>
              <td className="p-3 text-center text-gray-800 align-middle">
                {book.genre}
              </td>
              <td className="p-3 text-center text-gray-800 align-middle">
                {book.isbn}
              </td>
              <td className="p-3 text-center text-gray-800 align-middle">
                {book.published}
              </td>
              <td className="p-3 text-center text-gray-800 align-middle">
                {book.pageCount}
              </td>
              <td className="p-3 text-center text-gray-800 align-middle">
                {book.language}
              </td>
              <td className="p-2 text-center align-middle">
                <button
                  className="px-3 py-1 bg-gray-500 text-white hover:bg-gray-600 flex items-center justify-center gap-1"
                  onClick={() => onEdit(book)}
                >
                  <FaEdit /> Edit
                </button>
              </td>
              <td className="p-2 text-center align-middle">
                <button
                  className="px-3 py-1 bg-gray-700 text-white hover:bg-gray-800 flex items-center justify-center gap-1"
                  onClick={() => onDelete(book.id)}
                >
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
          {books.length === 0 && (
            <tr>
              <td colSpan="10" className="p-3 text-center text-gray-500">
                No books found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
