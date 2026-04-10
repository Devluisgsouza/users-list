import type { ChangeEvent } from 'react'
import { useUsers } from '../../hooks/UseUsers'
import { filterUsersBySearch } from '../../utils/filterUsers'
import { UserModal } from '../../components/UserModal/UserModal'
import { UserListBlock } from './UserListBlock'
import { useAppUserSearch } from './useAppUserSearch'
import userLogo from '../../assets/user.png'

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

  if (loading) return <p>Carregando...</p>
  if (error) return <p>{error}</p>

  const filteredUsers = filterUsersBySearch(users, debouncedSearch, showAll)

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  return (
    <section className="min-h-[98vh] flex items-center justify-center bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950">
      <div className="flex h-[40%] w-[40%] flex-col items-center justify-center rounded-[2em] p-6 bg-black shadow-[0px_0px_10px_#520e5f]">
        <div className="flex flex-[0.5] flex-col w-[60%] items-center gap-8">
          <div className='flex gap-3 w-[100%] item-center justify-center'>
            <img src={userLogo} alt="Usuário" className="w-8 h-8" />
            <h1 className='text-2xl'>Busque o usuário que desejar:</h1>
          </div>
          <input
            type="text"
            placeholder="Digite o nome do usuário..."
            value={search}
            onChange={handleSearchChange}
            className="h-[15%] w-[90%] rounded-[0.8em] border-none p-3 shadow-[0px_0px_10px_#9200af] transition-shadow duration-200 hover:shadow-[0px_0px_20px_#9200af] focus:outline-none bg-black"
          />
        </div>
        <UserListBlock
          listRef={listRef}
          debouncedSearch={debouncedSearch}
          showAll={showAll}
          onShowAll={showAllUsers}
          filteredUsers={filteredUsers}
          onSelectUser={selectUser}
        />
      </div>
      <UserModal user={selectedUser} onClose={closeModal} />
    </section>
  )
}

export default App
