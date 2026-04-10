// src/hooks/useUsers.ts
import { useEffect, useState } from 'react'
import { getUsers } from '../services/Users'
import type { User } from '../types/User'

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch(() => setError('Erro ao buscar usuários'))
      .finally(() => setLoading(false))
  }, [])

  return { users, loading, error }
}