import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserIfNotExists,
  onUserStateChanged,
} from "../firebase/user.service";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
