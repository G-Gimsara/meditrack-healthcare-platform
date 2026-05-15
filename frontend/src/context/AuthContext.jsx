import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('meditrack_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        // had issues with old saved data
        localStorage.removeItem('meditrack_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    if (!data.success) throw new Error(data.message || 'Login failed')

    const auth = data.data
    localStorage.setItem('meditrack_token', auth.token)
    const userData = {
      userId: auth.userId,
      email: auth.email,
      fullName: auth.fullName,
      role: auth.role,
      profileId: auth.profileId,
    }
    localStorage.setItem('meditrack_user', JSON.stringify(userData))
    setUser(userData)
    return userData
  }

  const register = async (formData) => {
    const { data } = await api.post('/auth/register', formData)
    if (!data.success) throw new Error(data.message || 'Registration failed')

    const auth = data.data
    localStorage.setItem('meditrack_token', auth.token)
    const userData = {
      userId: auth.userId,
      email: auth.email,
      fullName: auth.fullName,
      role: auth.role,
      profileId: auth.profileId,
    }
    localStorage.setItem('meditrack_user', JSON.stringify(userData))
    setUser(userData)
    return userData
  }

  const logout = () => {
    localStorage.removeItem('meditrack_token')
    localStorage.removeItem('meditrack_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
