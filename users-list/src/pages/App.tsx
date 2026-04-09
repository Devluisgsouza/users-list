import { useState } from 'react'
import { useUsers } from '../hooks/UseUsers'
import styles from './App.module.css'

function Users() {
  const { users, loading, error } = useUsers()
  const [search, setSearch] = useState('')

  if (loading) return <p>Carregando...</p>
  if (error) return <p>{error}</p>

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section className={styles.interface}>
      <div className={styles.box}>
        <h1>Busque o usuário que desejar:</h1>
        <div className={styles.search_box}>
          <input
            type="text"
            placeholder="Buscar usuário..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            >Buscar
          </button>
        </div>
        <div className={styles.result_list}>
          {filteredUsers.map((user) => (
            <p key={user.id}>
              {user.id} - {user.name}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Users