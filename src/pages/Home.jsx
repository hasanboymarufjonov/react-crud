import { useState, useEffect } from "react";
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} from "../services/firebaseService";
import BookList from "../components/BookList";
import BookFormModal from "../components/BookFormModal";
import { FaBook, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = getBooks(setBooks);
    return () => unsubscribe();
  }, []);

  const openModal = (book = null) => {
    setEditBook(book);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditBook(null);
  };

  const handleSubmit = async (bookData) => {
    if (editBook) {
      await updateBook(editBook.id, bookData);
    } else {
      await addBook(bookData);
    }
    closeModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await deleteBook(id);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-4 py-2 flex items-center gap-2 bg-gray-800 text-white rounded hover:bg-gray-600 transition"
      >
        <FaSignOutAlt size={18} /> Logout
      </button>

      <h1 className="text-4xl font-bold mb-6">Welcome to Your Library!</h1>
      <p className="text-xl mb-4">
        Hello, {auth.currentUser?.displayName || "User"}!
      </p>

      <div className="w-full max-w-5xl bg-white p-6 shadow-2xl rounded-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 flex items-center justify-center gap-3">
          <FaBook /> Book Collection
        </h1>
        <hr />

        <div className="mb-6 text-right pt-5">
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-500 transition flex items-center gap-2 ml-auto"
          >
            <FaPlus size={20} /> Add Book
          </button>
        </div>

        <BookList books={books} onEdit={openModal} onDelete={handleDelete} />
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

export default Home;
