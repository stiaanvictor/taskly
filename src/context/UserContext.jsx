import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserIfNotExists,
  onUserStateChanged,
} from "../firebase/user.service";
import { auth, getRedirectResult } from "../firebase/firebaseconfig";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRedirectResult(auth).then(async (result) => {
      if (result && result.user) {
        setUser(result.user);
        await createUserIfNotExists(result.user.uid);
        setLoading(false);
      }
    });

    const unsubscribe = onUserStateChanged(async (firebaseUser) => {
      setUser(firebaseUser ?? null);

      if (firebaseUser) {
        await createUserIfNotExists(firebaseUser.uid);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
