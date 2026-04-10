import type { User } from '../types/User'

export function filterUsersBySearch(
  users: User[],
  query: string,
  showAll: boolean,
): User[] {
  if (showAll) return users
  const normalized = query.toLowerCase()
  return users.filter((user) =>
    user.name.toLowerCase().includes(normalized),
  )
}
