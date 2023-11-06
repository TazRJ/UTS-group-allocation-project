import React, { createContext, useState, useContext, ReactNode } from 'react'
import jwt, { JwtPayload } from 'jsonwebtoken'

type AuthContextType = {
  user: any
  login: (token: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const login = (token: string) => {
    localStorage.setItem('token', token)
  }

  const checkUser = () => {
    const token = localStorage.getItem('token')

    if (token) {
      const decodedUser = jwt.decode(token) as JwtPayload | null
      if (decodedUser) {
        return decodedUser
      } else {
        return ''
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const user = checkUser()

  const isAuthenticated = user && user.name

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
