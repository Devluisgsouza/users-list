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

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
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
      ref={listRef}
      className="flex flex-col gap-1 max-h-[220px] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#1f2937_transparent]"
    >
      {debouncedSearch.trim() === '' && !showAll ? (
        <div className="flex items-center justify-center py-6">
          <button
            onClick={onShowAll}
            className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-cyan-400 bg-transparent border border-[#1f2937] hover:border-cyan-900 px-4 py-2.5 rounded-lg transition-all duration-200 cursor-pointer group"
          >
            <svg
              className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-500 transition-colors"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            Mostrar todos os usuários
          </button>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 gap-2">
          <svg className="w-8 h-8 text-[#1f2937]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75 21 21m-4.5-9a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z" />
          </svg>
          <p className="text-xs font-mono text-slate-600">Nenhum usuário encontrado</p>
        </div>
      ) : (
        filteredUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => onSelectUser(user)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer border border-transparent hover:bg-[#1a2335] hover:border-[#1f2937] transition-all duration-150 group"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-900 flex items-center justify-center flex-shrink-0">
              <span className="text-[11px] font-mono font-medium text-cyan-300">
                {getInitials(user.name)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-300 truncate">{user.name}</p>
              <p className="text-xs font-mono text-slate-500 truncate">{user.email}</p>
            </div>
            <svg
              className="w-3.5 h-3.5 text-[#1f2937] group-hover:text-cyan-600 transition-colors flex-shrink-0"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
            </svg>
          </div>
        ))
      )}
    </div>
  )
}