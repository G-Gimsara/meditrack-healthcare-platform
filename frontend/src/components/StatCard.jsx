export default function StatCard({ title, value, icon: Icon, trend, color = 'blue' }) {
  const iconColors = {
    blue: 'bg-medical-50 text-medical-600',
    teal: 'bg-teal-50 text-teal-600',
    green: 'bg-emerald-50 text-emerald-600',
    gray: 'bg-gray-100 text-gray-600',
  }

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value ?? '—'}</p>
          {trend && <p className="text-xs text-gray-400 mt-1.5">{trend}</p>}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-lg ${iconColors[color]}`}>
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  )
}
