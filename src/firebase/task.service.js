import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";

// STILL HAVE TO FINISH
export async function createTask(title, description) {
  try {
    await addDoc(collection(db, "tasks"), {
      title: title,
      description: description,
    });
  } catch {
    console.log("Error creating task");
  }
}

export async function getTasksForCategory(categoryId, callback) {
  const q = query(
    collection(db, "tasks"),
    where("categoryId", "==", categoryId),
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        ...data,
        dueDate: data.dueDate?.toDate() || null, // <-- convert Timestamp to JS Date
      };
    });

    callback(tasks);
  });

  return unsubscribe;
}
