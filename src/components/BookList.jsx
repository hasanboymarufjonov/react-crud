import { useState } from "react";
import ReactPaginate from "react-paginate";
import { FaEdit, FaTrash } from "react-icons/fa";

const BookList = ({ books, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 5;
  const offset = currentPage * booksPerPage;
  const currentBooks = books.slice(offset, offset + booksPerPage);
  const pageCount = Math.ceil(books.length / booksPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

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
            {currentBooks.map((book, index) => (
              <tr
                key={book.id}
                className="border-b hover:bg-gray-50 transition"
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
                    className="px-3 py-1 bg-gray-500 text-white hover:bg-gray-600 flex items-center gap-1"
                    onClick={() => onEdit(book)}
                  >
                    <FaEdit /> Edit
                  </button>
                </td>
                <td className="p-2 text-center">
                  <button
                    className="px-3 py-1 bg-gray-700 text-white hover:bg-gray-800 flex items-center gap-1"
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
