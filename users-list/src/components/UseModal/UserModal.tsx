import type { User } from '../../types/User'
import styles from './UserModal.module.css'

interface UserModalProps {
  user: User | null
  onClose: () => void
}

export function UserModal({ user, onClose }: UserModalProps) {
  if (!user) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.user_card}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{user.name}</h2>

        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Telefone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>

        <h2>Endereço</h2>
        <p>{user.address.street}, {user.address.suite}</p>
        <p>{user.address.city} - {user.address.zipcode}</p>
        <p>
          <strong>Latitude:</strong> {user.address.geo.lat} / 
          <strong> Longitude:</strong> {user.address.geo.lng}
        </p>

        <h2>Empresa</h2>
        <p><strong>Nome:</strong> {user.company.name}</p>
        <p><strong>Slogan:</strong> {user.company.catchPhrase}</p>
        <p><strong>Bs:</strong> {user.company.bs}</p>

        <div className={styles.close}>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  )
}