import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const usersRef = collection(db, "users");

export const addUser = async (userData) => {
  const { fullName, age, location, gender } = userData;
  const createdAt = new Date().toISOString();
  const user = {
    fullName,
    age,
    location,
    gender,
    createdAt,
    updatedAt: createdAt,
  };
  await addDoc(usersRef, user);
};

export const getUsers = (callback) => {
  return onSnapshot(usersRef, (snapshot) => {
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(users);
  });
};

export const updateUser = async (id, userData) => {
  const updatedAt = new Date().toISOString();
  const userDoc = doc(db, "users", id);
  await updateDoc(userDoc, {
    ...userData,
    updatedAt,
  });
};

export const deleteUser = async (id) => {
  const userDoc = doc(db, "users", id);
  await deleteDoc(userDoc);
};
