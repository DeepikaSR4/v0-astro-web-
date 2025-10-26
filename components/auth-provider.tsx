"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth"
import {
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  Unsubscribe,
  getDoc,
  // Added Firestore functions necessary for the logic
  // If you are missing these imports in your actual file, please add them.
  // from "firebase/firestore"
} from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

interface User {
  id: string
  email: string
  name: string
  chatsLeft: number
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  loading: boolean
  decrementChats: () => Promise<void>
  addChats: (count: number) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [firebaseAuthUser, setFirebaseAuthUser] = useState<FirebaseUser | null>(null) // <-- NEW STATE to hold the Firebase Auth object
  const [userSnapshotUnsubscribe, setUserSnapshotUnsubscribe] = useState<Unsubscribe | null>(null)

  // 1. Listen for Firebase Auth State Changes (Only manages the FirebaseUser object)
  useEffect(() => {
    // This listener is highly optimized to run once and manage the main Firebase state
    const authUnsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseAuthUser(fbUser)
      // Note: We don't set loading=false here, we wait for the Firestore listener below
    })

    return () => authUnsubscribe()
  }, [])

  // 2. Listen for Firestore Data Changes (Dependent on FirebaseUser)
  useEffect(() => {
    // CRITICAL CLEANUP on dependency change
    if (userSnapshotUnsubscribe) {
        userSnapshotUnsubscribe()
        setUserSnapshotUnsubscribe(null)
    }
    
    // Only proceed if we have an authenticated Firebase user
    if (firebaseAuthUser) {
      const userDocRef = doc(db, "users", firebaseAuthUser.uid)
      
      // Setup the REAL-TIME listener
      const unsubscribe = onSnapshot(userDocRef, async (docSnap) => {
        if (docSnap.exists()) {
          // Document exists: update state with live data
          const userData = docSnap.data() as Omit<User, "id">
          setUser({ ...userData, id: firebaseAuthUser.uid })
        } else {
          // Document missing: This is a new user who signed up but the listener beat the write
          // OR the first time a user logs in. Create the document safely.
          if (!firebaseAuthUser.email) {
            console.error("Firebase user object is missing email. Cannot create Firestore document.")
            setUser(null); // Deny access if data is corrupted
            setLoading(false)
            return
          }

          const newUserData: User = {
            id: firebaseAuthUser.uid,
            email: firebaseAuthUser.email,
            name: firebaseAuthUser.displayName || firebaseAuthUser.email.split('@')[0] || "User",
            chatsLeft: 3, // Initial credits
          }
          
          // Safety check: ensure we only write the document if it's missing (should only happen once)
          const docCheck = await getDoc(userDocRef);
          if (!docCheck.exists()){
             await setDoc(userDocRef, newUserData);
          }

          setUser(newUserData)
        }
        setLoading(false) // Only set loading to false AFTER the data fetch succeeds
      }, (error) => {
        // Handle listener errors (e.g., security rule issues)
        console.error("Firestore snapshot error:", error);
        setUser(null);
        setLoading(false);
      })
      
      // Save the unsubscribe function for manual cleanup
      setUserSnapshotUnsubscribe(() => unsubscribe)

      // Initial loading state while waiting for the first snapshot
      setLoading(true);
      
      return () => unsubscribe(); // Cleanup on unmount/dependency change
    } else {
        // No authenticated user
        setUser(null);
        setLoading(false);
    }
  }, [firebaseAuthUser]) // <-- DEPENDENCY: Runs ONLY when Firebase Auth status changes

  // --- Auth Functions (Unchanged) ---
  
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return true
    } catch (error) {
      console.error("Login failed:", error)
      setLoading(false)
      return false
    }
  }

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // The Firestore document creation is now handled automatically by the onSnapshot listener 
      // if it detects the document is missing (docSnap.exists() === false), 
      // ensuring robust state sync. However, we'll keep the direct write here for immediate feedback 
      // and compatibility with the auth listener logic above.
      const userDocRef = doc(db, "users", userCredential.user.uid)
      const newUserData: User = {
        id: userCredential.user.uid,
        email: email,
        name: name,
        chatsLeft: 3,
      }
      await setDoc(userDocRef, newUserData)
      
      return true
    } catch (error) {
      console.error("Signup failed:", error)
      setLoading(false)
      return false
    }
  }

  const logout = () => {
    // CRITICAL FIX: Explicitly unsubscribe the Firestore listener before logging out
    if (userSnapshotUnsubscribe) {
        userSnapshotUnsubscribe()
        setUserSnapshotUnsubscribe(null)
    }
    signOut(auth)
  }

  const decrementChats = async () => {
    if (user && user.chatsLeft > 0) {
      const userDocRef = doc(db, "users", user.id)
      await updateDoc(userDocRef, {
        chatsLeft: user.chatsLeft - 1,
      })
    }
  }

  const addChats = async (count: number) => {
    if (user) {
      const userDocRef = doc(db, "users", user.id)
      await updateDoc(userDocRef, {
        chatsLeft: user.chatsLeft + count,
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
        decrementChats,
        addChats,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
