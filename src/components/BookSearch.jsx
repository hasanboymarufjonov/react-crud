import { FaSearch } from "react-icons/fa";

const BookSearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex items-center bg-gray-200 text-gray-800 rounded-md px-4 py-2 md:w-full w-1/2 max-w-xs">
      <FaSearch className="text-gray-800 mr-2" />
      <input
        type="text"
        placeholder="Search books..."
        className="bg-transparent outline-none text-gray-800 w-full placeholder-gray-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default BookSearch;
