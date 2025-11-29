import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db, googleProvider } from "./firebaseconfig";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";

export async function signUpWithEmail(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: name,
    });

    return user;
  } catch (error) {
    throw error;
  }
}

export async function logInWithEmailAndPassword(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error;
  }
}

export async function loginWithGoogle() {
  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  if (!isLocal && isMobile) {
    await signInWithRedirect(auth, googleProvider);
    return;
  }

  if (!isLocal) {
    await signInWithRedirect(auth, googleProvider);
    return;
  }

  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export function onUserStateChanged(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function createUserIfNotExists(userId) {
  const q = query(collection(db, "settings"), where("userId", "==", userId));

  const snap = await getDocs(q);

  if (snap.empty) {
    await addDoc(collection(db, "settings"), {
      userId,
      theme: "light",
      notifications: false,
    });
  }
}

export async function logoutUser() {
  return await signOut(auth);
}

export function getUserTheme(userId, callback) {
  const q = query(collection(db, "settings"), where("userId", "==", userId));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      callback(doc.data().theme);
    } else {
      callback("light");
    }
  });

  return unsubscribe;
}

export async function setUserTheme(userId, theme) {
  const q = query(collection(db, "settings"), where("userId", "==", userId));

  const querySnapshot = getDocs(q);

  (await querySnapshot).forEach(async (docSnapshot) => {
    const docRef = docSnapshot.ref;

    await updateDoc(docRef, { theme: theme });
  });
}
