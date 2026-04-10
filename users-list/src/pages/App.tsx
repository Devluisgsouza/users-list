import { useEffect, useState } from 'react'
import { useUsers } from '../hooks/UseUsers'
import styles from './App.module.css'
import type { User } from '../types/User'
import { UserModal } from '../components/UseModal/UserModal'

function Users() {
  const { users, loading, error } = useUsers()

  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  if (loading) return <p>Carregando...</p>
  if (error) return <p>{error}</p>

  const filteredUsers = showAll
    ? users
    : users.filter((user) =>
        user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      )

  return (
    <section className={styles.interface}>
      <div className={styles.box}>
        <div className={styles.search_box}>
          <h1>Busque o usuário que desejar:</h1>
          <input
            type="text"
            placeholder="Digite o nome do usuário..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setShowAll(false)
            }}
          />
        </div>
        <div className={styles.result_list}>
          {debouncedSearch.trim() === '' && !showAll ? (
            <button onClick={() => setShowAll(true)} >
              Mostrar todos os usuários
            </button>
          ) : filteredUsers.length === 0 ? (
            <p>Nenhum usuário encontrado</p>
          ) : (
            filteredUsers.map((user) => (
              <p
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={styles.result_item}
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

export default Users