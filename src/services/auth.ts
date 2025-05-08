import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPopup,
  signInAnonymously,
  User as FirebaseUser,
  UserCredential,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { User } from "../utils/types";

// Register a new user
export const register = async (
  email: string,
  password: string,
  displayName?: string
): Promise<User> => {
  const userCredential: UserCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  if (displayName) {
    await updateProfile(userCredential.user, { displayName });
  }

  await sendEmailVerification(userCredential.user);
  return formatUserData(userCredential.user);
};

// Login an existing user
export const login = async (email: string, password: string): Promise<User> => {
  const userCredential: UserCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return formatUserData(userCredential.user);
};

// Login with Google
export const loginWithGoogle = async (): Promise<User> => {
  const userCredential = await signInWithPopup(auth, googleProvider);
  return formatUserData(userCredential.user);
};

// Demo/Anonymous login
export const signInWithDemo = async (): Promise<User> => {
  const userCredential = await signInAnonymously(auth);
  
  // Set a display name for the anonymous user
  await updateProfile(userCredential.user, {
    displayName: "Demo User"
  });

  return formatUserData(userCredential.user);
};

// Logout the current user
export const logout = async (): Promise<void> => {
  await signOut(auth);
};

// Send password reset email
export const resetPassword = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};

// Get current user from auth state
export const getCurrentUser = (): User | null => {
  const user = auth.currentUser;
  return user ? formatUserData(user) : null;
};

// Format user data for application use
export const formatUserData = (user: FirebaseUser): User => {
  return {
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
    displayName:
      user.displayName || (user.email ? user.email.split("@")[0] : "User"),
    photoURL: user.photoURL,
    isAnonymous: user.isAnonymous,
    createdAt: user.metadata.creationTime || undefined,
  };
};