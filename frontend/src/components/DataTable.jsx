import { useState } from 'react'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { paginate } from '../utils/helpers'
import EmptyState from './EmptyState'
import { Inbox } from 'lucide-react'

export default function DataTable({
  columns,
  data = [],
  searchKeys = [],
  filterOptions = null,
  perPage = 8,
  actions,
}) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [page, setPage] = useState(1)

  let filtered = [...data]

  if (search && searchKeys.length) {
    const q = search.toLowerCase()
    filtered = filtered.filter((row) =>
      searchKeys.some((key) => String(row[key] ?? '').toLowerCase().includes(q))
    )
  }

  if (filter && filterOptions) {
    filtered = filtered.filter((row) => row[filterOptions.key] === filter)
  }

  const { data: pageData, totalPages, total } = paginate(filtered, page, perPage)

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border-b border-gray-100">
        <div className="relative flex-1 max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="input-field pl-9 py-2"
          />
        </div>
        {filterOptions && (
          <select
            value={filter}
            onChange={(e) => { setFilter(e.target.value); setPage(1) }}
            className="input-field py-2 w-auto min-w-[140px]"
          >
            <option value="">All {filterOptions.label}</option>
            {filterOptions.options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )}
        {actions && <div className="sm:ml-auto">{actions}</div>}
      </div>

      {pageData.length === 0 ? (
        <EmptyState icon={Inbox} title="No records found" description="Try adjusting your search or filters." />
      ) : (
        // this section was breaking on smaller screens
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                {columns.map((col) => (
                  <th key={col.key} className="text-left px-4 py-3 font-medium text-gray-600 whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pageData.map((row, idx) => (
                <tr key={row.id || idx} className="hover:bg-gray-50/50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {total > perPage && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 text-sm text-gray-500">
          <span>Showing {pageData.length} of {total}</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-2">{page} / {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
