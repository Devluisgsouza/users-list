import { useEffect, useState } from 'react'
import { useUsers } from '../hooks/UseUsers'
import styles from './App.module.css'

function Users() {
  const { users, loading, error } = useUsers()

  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  if (loading) return <p>Carregando...</p>
  if (error) return <p>{error}</p>

  const filteredUsers = users.filter((user) =>
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
            onChange={(e) => setSearch(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.result_list}>
          {debouncedSearch.trim() === '' ? (
            <p>...</p>
          ) : filteredUsers.length === 0 ? (
            <p>Nenhum usuário encontrado</p>
          ) : (
            filteredUsers.map((user) => (
              <p key={user.id}>
                {user.id} - {user.name}
              </p>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default Users