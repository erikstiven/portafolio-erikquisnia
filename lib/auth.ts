// lib/auth.ts
'use client'

import { useAuthStore } from '@/store/authStore'

export const useAuth = () => {
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)

  const isAuthenticated = !!token

  return { token, isAuthenticated, logout }
}
