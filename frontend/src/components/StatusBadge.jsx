// appointment status colors
const styles = {
  PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
  CONFIRMED: 'bg-medical-50 text-medical-700 border-medical-200',
  COMPLETED: 'bg-accent-soft text-emerald-700 border-emerald-200',
  CANCELLED: 'bg-gray-100 text-gray-600 border-gray-200',
}

export default function StatusBadge({ status }) {
  const style = styles[status] || styles.PENDING
  const label = status ? status.charAt(0) + status.slice(1).toLowerCase() : 'Unknown'

  return (
    <span className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full border ${style}`}>
      {label}
    </span>
  )
}
