import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebaseconfig";

export async function createCategory(userId, title, color) {
  try {
    await addDoc(collection(db, "categories"), {
      userId: userId,
      title: title,
      color: color,
    });
  } catch {
    console.error("Error creating category");
  }
}

export async function getUserCategories(userId, callback) {
  const q = query(collection(db, "categories"), where("userId", "==", userId));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    if (!snapshot.empty) {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(docs);
    } else {
      callback([]);
    }
  });

  return unsubscribe;
}
