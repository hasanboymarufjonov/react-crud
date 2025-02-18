import { useState, useEffect } from "react";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../services/firebaseService";
import UserList from "../components/UserList";
import UserFormModal from "../components/UserFormModal";
import { FaUserPlus } from "react-icons/fa";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = getUsers(setUsers);
    return () => unsubscribe();
  }, []);

  const openModal = (user = null) => {
    setEditId(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
  };

  const onSubmit = async (data) => {
    if (editId) {
      await updateUser(editId.id, data);
    } else {
      await addUser(data);
    }
    closeModal();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="w-full max-w-8xl bg-white p-6  shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
          React CRUD
        </h1>
        <hr />
        <div className="mb-6 text-right pt-5">
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-500 transition flex items-center gap-2 ml-auto"
          >
            <FaUserPlus size={20} /> Add User
          </button>
        </div>
        <UserList users={users} onEdit={openModal} onDelete={handleDelete} />
      </div>

      {isModalOpen && (
        <UserFormModal
          editId={editId}
          onSubmit={onSubmit}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Home;
