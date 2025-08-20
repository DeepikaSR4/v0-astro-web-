"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

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
  decrementChats: () => void
  addChats: (count: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("astroweb-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)
    try {
      // Simulate API call - in real app, this would be actual authentication
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: "1",
        email,
        name: email.split("@")[0],
        chatsLeft: 3,
      }

      setUser(mockUser)
      localStorage.setItem("astroweb-user", JSON.stringify(mockUser))
      setLoading(false)
      return true
    } catch (error) {
      setLoading(false)
      return false
    }
  }

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: "1",
        email,
        name,
        chatsLeft: 3,
      }

      setUser(mockUser)
      localStorage.setItem("astroweb-user", JSON.stringify(mockUser))
      setLoading(false)
      return true
    } catch (error) {
      setLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("astroweb-user")
  }

  const decrementChats = () => {
    if (user && user.chatsLeft > 0) {
      const updatedUser = { ...user, chatsLeft: user.chatsLeft - 1 }
      setUser(updatedUser)
      localStorage.setItem("astroweb-user", JSON.stringify(updatedUser))
    }
  }

  const addChats = (count: number) => {
    if (user) {
      const updatedUser = { ...user, chatsLeft: user.chatsLeft + count }
      setUser(updatedUser)
      localStorage.setItem("astroweb-user", JSON.stringify(updatedUser))
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
