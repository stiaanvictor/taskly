import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
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
} from "firebase/auth";

/////////////////////////////////////////////////////////
//////////////////// Authentication /////////////////////
/////////////////////////////////////////////////////////

// Email and Password Signin
export async function signUpWithEmail(email, password, name) {
  try {
    // Create the auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Update the displayName in Firebase Auth
    await updateProfile(user, {
      displayName: name,
    });

    return user;
  } catch (error) {
    console.error("Signup error:", error);
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

// Google Sign-In
export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user; // Firebase user
}

// Subscribe to auth changes (used in context)
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

// Logout
export async function logoutUser() {
  return await signOut(auth);
}

/////////////////////////////////////////////////////////
/////////////////////     THEME     /////////////////////
/////////////////////////////////////////////////////////

export function getUserTheme(userId, callback) {
  const q = query(collection(db, "settings"), where("userId", "==", userId));

  // Real-time updates
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
