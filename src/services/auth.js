import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

// Register a new user
export const register = async (email, password, displayName) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Update the user's profile with their display name
  if (displayName) {
    await updateProfile(userCredential.user, { displayName });
  }

  // Optionally send email verification
  await sendEmailVerification(userCredential.user);

  return userCredential.user;
};

// Login an existing user
export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

// Login with Google
export const loginWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleProvider);
  return userCredential.user;
};

// Logout the current user
export const logout = async () => {
  await signOut(auth);
  return true;
};

// Send password reset email
export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
  return true;
};

// Get current user from auth state
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Format user data for application use
export const formatUserData = (user) => {
  if (!user) return null;

  return {
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
    displayName:
      user.displayName || (user.email ? user.email.split("@")[0] : "User"),
    photoURL: user.photoURL,
    createdAt: user.metadata.creationTime,
  };
};
