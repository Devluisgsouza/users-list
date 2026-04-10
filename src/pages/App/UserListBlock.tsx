import type { RefObject } from 'react'
import type { User } from '../../types/User'

export type UserListBlockProps = {
  listRef: RefObject<HTMLDivElement | null>
  debouncedSearch: string
  showAll: boolean
  onShowAll: () => void
  filteredUsers: User[]
  onSelectUser: (user: User) => void
}

export function UserListBlock({
  listRef,
  debouncedSearch,
  showAll,
  onShowAll,
  filteredUsers,
  onSelectUser,
}: UserListBlockProps) {
  return (
    <div
      className="flex flex-1 min-w-[55%] flex-col items-center overflow-y-auto rounded-[1em] p-2 mt-5 max-h-[200px]"
      ref={listRef}
    >
      {debouncedSearch.trim() === '' && !showAll ? (
        <button
          onClick={onShowAll}
          className="cursor-pointer rounded-[2em] mt-10 border border-[#520e5f] p-3 transition-shadow duration-200 hover:shadow-[0px_0px_20px_#9200af]"
        >
          Mostrar todos os usuários
        </button>
      ) : filteredUsers.length === 0 ? (
        <p>Nenhum usuário encontrado</p>
      ) : (
        filteredUsers.map((user) => (
          <p
            key={user.id}
            onClick={() => onSelectUser(user)}
            className="min-w-[100%] cursor-pointer bg-black border-b border-gray-800 border-l-2 border-l-transparent p-2 transition-all duration-300 hover:bg-[#202020] hover:border-l-[#9200af]"
          >
            {user.name} - {user.email}
          </p>
        ))
      )}
    </div>
  )
}
