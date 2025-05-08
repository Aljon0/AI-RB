import { useState, useEffect } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "../firebase";
import { formatUserData } from "../services/auth";
import { User } from "../utils/types";

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user: FirebaseUser | null) => {
        setCurrentUser(user ? formatUserData(user) : null);
        setLoading(false);
      },
      (error: Error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { 
    user: currentUser, 
    loading, 
    error,
    username: currentUser?.displayName || currentUser?.email?.split('@')[0] || null
  };
}