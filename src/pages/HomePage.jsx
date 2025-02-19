import { useState, useEffect } from "react";
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} from "../services/firebaseService";
import BookList from "../components/BookList";
import BookFormModal from "../components/BookFormModal";
import BookSearch from "../components/BookSearch";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editBook, setEditBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = getBooks((bookList) => {
      setBooks(bookList);
      setFilteredBooks(bookList);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const lowercasedQuery = searchQuery.toLowerCase();
    setFilteredBooks(
      books.filter(
        (book) =>
          book.title.toLowerCase().includes(lowercasedQuery) ||
          book.author.toLowerCase().includes(lowercasedQuery) ||
          book.genre.toLowerCase().includes(lowercasedQuery)
      )
    );
    setIsLoading(false);
  }, [searchQuery, books]);

  const openModal = (book = null) => {
    setEditBook(book);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditBook(null);
  };

  const handleSubmit = async (bookData) => {
    setIsLoading(true);
    if (editBook) {
      await updateBook(editBook.id, bookData);
      toast.success("Book updated successfully!");
    } else {
      await addBook(bookData);
      toast.success("Book added successfully!");
    }
    closeModal();
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    if (window.confirm("Are you sure you want to delete this book?")) {
      await deleteBook(id);
    }
    toast.success("Book deleted successfully!");
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-4 py-2 flex items-center gap-2 bg-gray-800 text-white rounded-md hover:bg-gray-600 transition"
      >
        <FaSignOutAlt size={18} /> Logout
      </button>

      <h1 className="text-4xl font-bold mb-6">Welcome to Your Library!</h1>
      <p className="text-xl mb-4">
        Hello, {auth.currentUser?.displayName || "User"}!
      </p>

      <div className="w-full max-w-8xl bg-white p-6 shadow-2xl rounded-xl ">
        <div className="mb-6 flex items-center justify-between">
          <BookSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-500 transition flex items-center gap-2 rounded-md"
          >
            <FaPlus size={15} /> Add Book
          </button>
        </div>

        <BookList
          books={filteredBooks}
          isLoading={isLoading}
          onEdit={openModal}
          onDelete={handleDelete}
        />
      </div>

      {isModalOpen && (
        <BookFormModal
          editBook={editBook}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default HomePage;
