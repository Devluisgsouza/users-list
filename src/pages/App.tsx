import { useEffect, useState, useRef } from 'react'
import { useUsers } from '../hooks/UseUsers'
import type { User } from '../types/User'
import { UserModal } from '../components/UseModal/UserModal'
import userLogo from '../assets/user.png'

function App() {
  const { users, loading, error } = useUsers()

  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showAll, setShowAll] = useState(false)
  const listRef = useRef<HTMLDivElement | null>(null)


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        listRef.current &&
        !listRef.current.contains(event.target as Node)
      ) {
        setShowAll(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (loading) return <p>Carregando...</p>
  if (error) return <p>{error}</p>

  const filteredUsers = showAll
    ? users
    : users.filter((user) =>
        user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      )

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
            onChange={(e) => {
              setSearch(e.target.value)
              setShowAll(false)
            }}
            className="h-[15%] w-[90%] rounded-[0.8em] border-none p-3 shadow-[0px_0px_10px_#9200af] transition-shadow duration-200 hover:shadow-[0px_0px_20px_#9200af] focus:outline-none bg-black"
          />
        </div>
        <div
          className="flex flex-1 min-w-[55%] flex-col items-center overflow-y-auto rounded-[1em] p-2 mt-5 max-h-[200px]"
          ref={listRef}
        >
          {debouncedSearch.trim() === '' && !showAll ? (
            <button
              onClick={() => setShowAll(true)}
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
                onClick={() => setSelectedUser(user)}
                className="min-w-[100%] cursor-pointer bg-black border-b border-gray-800 border-l-2 border-l-transparent p-2 transition-all duration-300 hover:bg-[#202020] hover:border-l-[#9200af]"
              >
                {user.name} - {user.email}
              </p>
            ))
          )}
        </div>
      </div>
      <UserModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </section>
  )
}

export default App