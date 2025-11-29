import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";

// STILL HAVE TO FINISH
export async function createTask(
  title,
  description,
  priority,
  dueDate,
  categoryId,
  userId,
) {
  try {
    await addDoc(collection(db, "tasks"), {
      title: title,
      description: description,
      priority: priority,
      dueDate: new Date(dueDate),
      categoryId: categoryId,
      userId: userId,
      done: false,
    });
  } catch {
    console.log("Error creating task");
  }
}

export async function getTasksForUser(userId, callback) {
  const q = query(collection(db, "tasks"), where("userId", "==", userId));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        ...data,
        dueDate: data.dueDate?.toDate() || null,
      };
    });

    callback(tasks);
  });

  return unsubscribe;
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
        dueDate: data.dueDate?.toDate() || null,
      };
    });

    callback(tasks);
  });

  return unsubscribe;
}

export async function updateTask(
  taskId,
  title,
  description,
  priority,
  dueDate,
  categoryId,
) {
  const taskRef = doc(db, "tasks", taskId);

  await updateDoc(taskRef, {
    title: title,
    description: description,
    priority: priority,
    dueDate: new Date(dueDate),
    categoryId: categoryId,
  });
}

export async function setTaskDone(taskId) {
  const taskRef = doc(db, "tasks", taskId);

  await updateDoc(taskRef, {
    done: true,
  });
}

export async function setTaskIncomplete(taskId) {
  const taskRef = doc(db, "tasks", taskId);

  await updateDoc(taskRef, {
    done: false,
  });
}

export async function deleteTask(taskId) {
  try {
    await deleteDoc(doc(db, "tasks", taskId));
  } catch {
    console.log("Error deleting task");
  }
}

export async function deleteTasksByCategory(categoryId) {
  const q = query(
    collection(db, "tasks"),
    where("categoryId", "==", categoryId),
  );

  const snapshot = await getDocs(q);

  const deletions = snapshot.docs.map((taskDoc) =>
    deleteDoc(doc(db, "tasks", taskDoc.id)),
  );

  await Promise.all(deletions);
}
