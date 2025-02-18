import { db, auth } from "../firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export const getBooks = (setBooks) => {
  const user = auth.currentUser;
  if (!user) return;
  const q = query(collection(db, "books"), where("userId", "==", user.uid));
  return onSnapshot(q, (snapshot) => {
    const books = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setBooks(books);
  });
};

export const addBook = async (data) => {
  const user = auth.currentUser;
  if (!user) return;
  await addDoc(collection(db, "books"), { ...data, userId: user.uid });
};

export const updateBook = async (id, data) => {
  const bookRef = doc(db, "books", id);
  await updateDoc(bookRef, data);
};

export const deleteBook = async (id) => {
  const bookRef = doc(db, "books", id);
  await deleteDoc(bookRef);
};
