import type { User } from '../../types/User'

interface UserModalProps {
  user: User | null
  onClose: () => void
}

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

function FieldRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center px-3 py-2 bg-[#0d1117] border-b border-[#1f2937] last:border-b-0">
      <span className="text-xs text-slate-500 w-24 flex-shrink-0">{label}</span>
      <span className={`text-xs font-mono truncate ${accent ? 'text-cyan-400' : 'text-slate-300'}`}>
        {value}
      </span>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="text-[10px] font-mono font-medium text-cyan-500 tracking-widest uppercase mb-2">
        {label}
      </p>
      <div className="border border-[#1f2937] rounded-lg overflow-hidden">
        {children}
      </div>
    </div>
  )
}

export function UserModal({ user, onClose }: UserModalProps) {
  if (!user) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] max-h-[85vh] bg-[#111827] border border-[#1f2937] rounded-2xl overflow-hidden flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Linha de destaque topo */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

        {/* Header fixo */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-[#1f2937] flex-shrink-0">
          <div className="w-11 h-11 rounded-xl bg-cyan-900 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-mono font-medium text-cyan-300">
              {getInitials(user.name)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-medium text-slate-100 truncate">{user.name}</h2>
            <p className="text-xs font-mono text-slate-500 mt-0.5">
              ID · {String(user.id).padStart(3, '0')} · @{user.username}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 bg-[#1f2937] hover:bg-[#374151] border-none rounded-lg flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Corpo com scroll */}
        <div className="overflow-y-auto flex-1 px-5 py-4 scrollbar-thin">
          <Section label="Contato">
            <FieldRow label="Email" value={user.email} accent />
            <FieldRow label="Telefone" value={user.phone} />
            <FieldRow label="Website" value={user.website} accent />
          </Section>

          <Section label="Endereço">
            <FieldRow label="Rua" value={`${user.address.street}, ${user.address.suite}`} />
            <FieldRow label="Cidade" value={user.address.city} />
            <FieldRow label="CEP" value={user.address.zipcode} />
            <FieldRow label="Geo" value={`${user.address.geo.lat} / ${user.address.geo.lng}`} />
          </Section>

          <Section label="Empresa">
            <FieldRow label="Nome" value={user.company.name} />
            <FieldRow label="Slogan" value={user.company.catchPhrase} />
            <FieldRow label="Bs" value={user.company.bs} />
          </Section>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#1f2937] flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="text-xs font-medium text-slate-400 hover:text-slate-200 bg-transparent border border-[#1f2937] hover:border-[#374151] px-4 py-2 rounded-lg transition-all cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}