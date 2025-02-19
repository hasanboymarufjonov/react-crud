import { useState } from "react";
import ReactPaginate from "react-paginate";
import { FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const BookList = ({ books, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const booksPerPage = 5;
  const offset = currentPage * booksPerPage;
  const pageCount = Math.ceil(books.length / booksPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedBooks = [...books].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key]?.toString().toLowerCase();
    const bValue = b[sortConfig.key]?.toString().toLowerCase();

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const currentBooks = sortedBooks.slice(offset, offset + booksPerPage);

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort />;
    return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  return (
    <div className="w-full max-h-[500px]">
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border-collapse bg-white shadow-sm rounded-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border p-3 text-center font-semibold w-10">#</th>
              <th
                className="border p-3 text-center font-semibold cursor-pointer"
                onClick={() => handleSort("title")}
              >
                Title {getSortIcon("title")}
              </th>
              <th
                className="border p-3 text-center font-semibold cursor-pointer"
                onClick={() => handleSort("author")}
              >
                Author {getSortIcon("author")}
              </th>
              <th className="border p-3 text-center font-semibold">Genre</th>
              <th className="border p-3 text-center font-semibold">ISBN</th>
              <th
                className="border p-3 text-center font-semibold cursor-pointer"
                onClick={() => handleSort("published")}
              >
                Published {getSortIcon("published")}
              </th>
              <th
                className="border p-3 text-center font-semibold cursor-pointer"
                onClick={() => handleSort("pageCount")}
              >
                Pages {getSortIcon("pageCount")}
              </th>
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
            {currentBooks.map((book, index) => (
              <tr
                key={book.id}
                className={`border-b hover:bg-gray-50 transition ${
                  index % 2 !== 0 ? "bg-gray-200" : ""
                }`}
              >
                <td className="p-3 text-center text-gray-800">
                  {offset + index + 1}
                </td>
                <td className="p-3 text-center text-gray-800">{book.title}</td>
                <td className="p-3 text-center text-gray-800">{book.author}</td>
                <td className="p-3 text-center text-gray-800">{book.genre}</td>
                <td className="p-3 text-center text-gray-800">{book.isbn}</td>
                <td className="p-3 text-center text-gray-800">
                  {book.published}
                </td>
                <td className="p-3 text-center text-gray-800">
                  {book.pageCount}
                </td>
                <td className="p-3 text-center text-gray-800">
                  {book.language}
                </td>
                <td className="p-2 text-center">
                  <button
                    className="px-3 py-1 bg-gray-600 text-white hover:bg-gray-700 flex items-center gap-1 rounded-md"
                    onClick={() => onEdit(book)}
                  >
                    <FaEdit /> Edit
                  </button>
                </td>
                <td className="p-2 text-center">
                  <button
                    className="px-3 py-1 bg-gray-800 text-white hover:bg-gray-900 flex items-center gap-1 rounded-md"
                    onClick={() => onDelete(book.id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {books.length === 0 && (
              <tr>
                <td colSpan="10" className="py-24 text-center text-gray-500">
                  <img
                    src="https://img.icons8.com/ios-filled/1e2939/300/inbox.png"
                    className="mx-auto w-28"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {books.length > booksPerPage && (
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"flex justify-center mt-4 space-x-2"}
          pageClassName={"px-3 py-2 border rounded-md cursor-pointer"}
          activeClassName={"bg-gray-800 text-white"}
          previousClassName={"px-3 py-2 border rounded-md cursor-pointer"}
          nextClassName={"px-3 py-2 border rounded-md cursor-pointer"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      )}
    </div>
  );
};

export default BookList;
