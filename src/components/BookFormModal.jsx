import { useEffect } from "react";
import { useForm } from "react-hook-form";

const genres = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Biography",
  "History",
  "Self-Help",
];

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Uzbek",
];

const BookFormModal = ({ editBook, onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (editBook) {
      setValue("title", editBook.title);
      setValue("author", editBook.author);
      setValue("genre", editBook.genre);
      setValue("isbn", editBook.isbn);
      setValue("published", editBook.published);
      setValue("pageCount", editBook.pageCount);
      setValue("language", editBook.language);
    } else {
      reset();
    }
  }, [editBook, setValue, reset]);

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/30 backdrop-blur-[1px]">
      <div className="bg-white p-6 shadow-lg w-full max-w-md border border-gray-300">
        <h2 className="text-xl font-bold mb-4">
          {editBook ? "Edit Book" : "Add Book"}
        </h2>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
            className="p-2 border w-full"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}

          <input
            type="text"
            placeholder="Author"
            {...register("author", { required: "Author is required" })}
            className="p-2 border w-full"
          />
          {errors.author && (
            <p className="text-red-500 text-sm">{errors.author.message}</p>
          )}

          <select
            {...register("genre", { required: "Genre is required" })}
            className="p-2 border w-full"
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          {errors.genre && (
            <p className="text-red-500 text-sm">{errors.genre.message}</p>
          )}

          <input
            type="text"
            placeholder="ISBN"
            {...register("isbn", { required: "ISBN is required" })}
            className="p-2 border w-full"
          />
          {errors.isbn && (
            <p className="text-red-500 text-sm">{errors.isbn.message}</p>
          )}

          <input
            type="date"
            placeholder="Published Date"
            {...register("published", {
              required: "Published Date is required",
            })}
            className="p-2 border w-full"
          />
          {errors.published && (
            <p className="text-red-500 text-sm">{errors.published.message}</p>
          )}

          <input
            type="number"
            placeholder="Page Count"
            {...register("pageCount", {
              required: "Page Count is required",
              min: 1,
            })}
            className="p-2 border w-full"
          />
          {errors.pageCount && (
            <p className="text-red-500 text-sm">{errors.pageCount.message}</p>
          )}

          <select
            {...register("language", { required: "Language is required" })}
            className="p-2 border w-full"
          >
            <option value="">Select Language</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          {errors.language && (
            <p className="text-red-500 text-sm">{errors.language.message}</p>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-600 transition"
            >
              {editBook ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookFormModal;
