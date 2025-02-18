import { FaEdit, FaTrash } from "react-icons/fa";

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto w-full max-h-[400px]">
      <table className="min-w-full table-fixed border-collapse bg-white shadow-sm rounded-md">
        <thead className="bg-gray-800">
          <tr>
            <th className="border p-3 text-center text-gray-200 font-semibold w-10">
              #
            </th>
            <th className="border p-3 text-center text-gray-200 font-semibold">
              Full Name
            </th>
            <th className="border p-3 text-center text-gray-200 font-semibold">
              Age
            </th>
            <th className="border p-3 text-center text-gray-200 font-semibold">
              Location
            </th>
            <th className="border p-3 text-center text-gray-200 font-semibold">
              Gender
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
          {users.map((user, index) => (
            <tr
              key={user.id}
              className="border-b hover:bg-gray-50 transition duration-200"
            >
              <td className="p-3 text-center text-gray-800 align-middle">
                {index + 1}
              </td>
              <td className="p-3 text-center text-gray-800 align-middle">
                {user.fullName}
              </td>
              <td className="p-3 text-center text-gray-800 align-middle">
                {user.age}
              </td>
              <td className="p-3 text-center text-gray-800 align-middle">
                {user.location}
              </td>
              <td className="p-3 text-center text-gray-800 align-middle">
                {user.gender}
              </td>
              <td className="p-2 text-center align-middle">
                <button
                  className="px-3 py-1 bg-gray-500 text-white  hover:bg-gray-600 flex items-center justify-center gap-1"
                  onClick={() => onEdit(user)}
                >
                  <FaEdit /> Edit
                </button>
              </td>
              <td className="p-2 text-center align-middle">
                <button
                  className="px-3 py-1 bg-gray-700 text-white hover:bg-gray-800 flex items-center justify-center gap-1"
                  onClick={() => onDelete(user.id)}
                >
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
