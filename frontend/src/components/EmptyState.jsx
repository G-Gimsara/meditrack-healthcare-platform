export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-4 text-center">
      {Icon && (
        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Icon size={24} className="text-gray-400" />
        </div>
      )}
      <h3 className="text-base font-medium text-gray-800">{title}</h3>
      {description && <p className="text-sm text-gray-500 mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
