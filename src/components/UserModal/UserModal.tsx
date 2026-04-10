import type { User } from '../../types/User'

interface UserModalProps {
  user: User | null
  onClose: () => void
}

export function UserModal({ user, onClose }: UserModalProps) {
  if (!user) return null

  return (
    <div
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-[30em] max-h-[50em] bg-black/80 overflow-y-auto rounded-[2em] p-8 shadow-[0px_0px_20px_#9200af]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mt-0 border-b border-[#9200af] text-purple-300 text-xl pb-2">{user.name}</h2>

        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Telefone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>

        <h2 className="mt-4 border-b border-[#9200af] text-purple-300 text-xl text-xl pb-2">Endereço</h2>
        <p>{user.address.street}, {user.address.suite}</p>
        <p>{user.address.city} - {user.address.zipcode}</p>
        <p>
          <strong>Latitude:</strong> {user.address.geo.lat} / 
          <strong> Longitude:</strong> {user.address.geo.lng}
        </p>

        <h2 className="mt-4 border-b border-[#9200af] text-purple-300 text-xl pb-2">Empresa</h2>
        <p><strong>Nome:</strong> {user.company.name}</p>
        <p><strong>Slogan:</strong> {user.company.catchPhrase}</p>
        <p><strong>Bs:</strong> {user.company.bs}</p>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-md border border-white px-4 py-2"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}