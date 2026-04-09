import { useUsers } from '../hooks/UseUsers'

function Users() {
  const { users, loading, error } = useUsers()

  if (loading) return <p>Carregando...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      {users.map((user) => (
        <p key={user.id}>
          {user.id} - {user.name}
        </p>
      ))}
    </div>
  )
}

export default Users