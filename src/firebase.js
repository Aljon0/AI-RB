import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Collection reference
const RESUMES_COLLECTION = "resumes";

// Authentication Functions
export const registerUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const logoutUser = async () => {
  await signOut(auth);
  return true;
};

export const signInWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleProvider);
  return userCredential.user;
};

export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
  return true;
};

// Firestore Functions
export const saveResumeToFirestore = async (resumeData, template) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not authenticated");
    }

    const resumeName = resumeData.personalInfo.name || "Untitled Resume";

    // Check if a resume with this name already exists for this user
    const resumesRef = collection(db, RESUMES_COLLECTION);
    const q = query(
      resumesRef,
      where("userId", "==", user.uid),
      where("name", "==", resumeName)
    );

    const querySnapshot = await getDocs(q);

    // If resume exists, update it
    if (!querySnapshot.empty) {
      const existingResume = querySnapshot.docs[0];
      await updateDoc(doc(db, RESUMES_COLLECTION, existingResume.id), {
        data: resumeData,
        template: template,
        lastModified: serverTimestamp(),
      });
      return existingResume.id;
    }

    // Otherwise, create a new resume
    const newResumeRef = await addDoc(collection(db, RESUMES_COLLECTION), {
      userId: user.uid,
      name: resumeName,
      data: resumeData,
      template: template,
      createdAt: serverTimestamp(),
      lastModified: serverTimestamp(),
    });

    return newResumeRef.id;
  } catch (error) {
    console.error("Error saving resume to Firestore:", error);
    throw error;
  }
};

export const getUserResumes = async () => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not authenticated");
    }

    const resumesRef = collection(db, RESUMES_COLLECTION);
    const q = query(resumesRef, where("userId", "==", user.uid));

    const querySnapshot = await getDocs(q);
    const resumes = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      resumes.push({
        id: doc.id,
        name: data.name,
        data: data.data,
        template: data.template,
        lastModified: data.lastModified?.toDate() || new Date(),
      });
    });

    return resumes;
  } catch (error) {
    console.error("Error getting user resumes:", error);
    throw error;
  }
};

export const deleteResumeFromFirestore = async (resumeId) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not authenticated");
    }

    await deleteDoc(doc(db, RESUMES_COLLECTION, resumeId));
    return true;
  } catch (error) {
    console.error("Error deleting resume:", error);
    throw error;
  }
};

export { auth, googleProvider, db };