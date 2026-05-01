import type { ChangeEvent } from 'react'
import { useUsers } from '../../hooks/UseUsers'
import { filterUsersBySearch } from '../../utils/filterUsers'
import { UserModal } from '../../components/UserModal/UserModal'
import { UserListBlock } from './UserListBlock'
import { useAppUserSearch } from './useAppUserSearch'

function App() {
  const { users, loading, error } = useUsers()
  const {
    listRef,
    search,
    debouncedSearch,
    showAll,
    selectedUser,
    setSearch,
    showAllUsers,
    selectUser,
    closeModal,
  } = useAppUserSearch()

  if (loading) return (
    <section className="min-h-screen flex items-center justify-center bg-[#0d1117]">
      <div className="flex items-center gap-3 text-slate-400">
        <div className="w-4 h-4 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
        <span className="font-mono text-sm">Carregando cadastros...</span>
      </div>
    </section>
  )

  if (error) return (
    <section className="min-h-screen flex items-center justify-center bg-[#0d1117]">
      <div className="bg-red-950/40 border border-red-900 rounded-xl px-6 py-4 text-red-400 font-mono text-sm">
        {error}
      </div>
    </section>
  )

  const filteredUsers = filterUsersBySearch(users, debouncedSearch, showAll)

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0d1117] p-6">
      <div className="w-full max-w-[520px] bg-[#111827] border border-[#1f2937] rounded-2xl relative overflow-hidden shadow-2xl">
        {/* Linha de destaque topo */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        {/* Header */}
        <div className="flex items-center gap-3 px-6 pt-6 pb-5">
          <div className="w-9 h-9 bg-cyan-900 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-medium text-slate-200">Busca de usuários</h1>
            <p className="text-xs text-slate-500 mt-0.5">Pesquise e consulte cadastros</p>
          </div>
        </div>

        {/* Search */}
        <div className="px-6 pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Digite o nome do usuário..."
              value={search}
              onChange={handleSearchChange}
              className="w-full bg-[#0d1117] border border-[#1f2937] rounded-xl px-4 py-2.5 pr-10 text-sm text-slate-200 placeholder-[#374151] outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 font-sans"
            />
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#374151]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="m21 21-4.35-4.35" />
            </svg>
          </div>
        </div>

        {/* Lista */}
        <div className="px-6 pb-4">
          <UserListBlock
            listRef={listRef}
            debouncedSearch={debouncedSearch}
            showAll={showAll}
            onShowAll={showAllUsers}
            filteredUsers={filteredUsers}
            onSelectUser={selectUser}
          />
        </div>

        {/* Footer contador */}
        <div className="px-6 py-3 border-t border-[#1f2937] flex items-center gap-2">
          <span className="bg-cyan-900 text-cyan-300 text-xs font-mono px-2 py-0.5 rounded-full">
            {filteredUsers.length}
          </span>
          <span className="text-xs text-slate-500">
            {filteredUsers.length === 1 ? 'usuário encontrado' : 'usuários encontrados'}
          </span>
        </div>
      </div>

      <UserModal user={selectedUser} onClose={closeModal} />
    </section>
  )
}

export default App