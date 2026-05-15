import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import EmptyState from '../../components/EmptyState'
import { Stethoscope, Search } from 'lucide-react'
export default function FindDoctors() {
  const [doctors, setDoctors] = useState([])
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('')
  useEffect(() => {
    Promise.all([
      api.get('/doctors'),
      api.get('/departments'),
    ]).then(([docRes, deptRes]) => {
      if (docRes.data.success) setDoctors(docRes.data.data)
      if (deptRes.data.success) setDepartments(deptRes.data.data)
    }).finally(() => setLoading(false))
  }, [])
  const filtered = doctors.filter((d) => {
    const matchSearch = !search || d.fullName.toLowerCase().includes(search.toLowerCase())
                       || d.specialization?.toLowerCase().includes(search.toLowerCase())
    const matchDept = !deptFilter || d.departmentId === deptFilter
    return matchSearch && matchDept && d.available
  })
  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
  return (
    <div>
      <div className="mb-6">
        <h1 className="page-heading">Find Doctors</h1>
        <p className="page-subtext">Browse available specialists and book a visit</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or specialty..."
            className="input-field pl-9 py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="input-field py-2 w-auto min-w-[160px]" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
          <option value="">All departments</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>
      {filtered.length === 0 ? (
        <div className="card">
          <EmptyState icon={Stethoscope} title="No doctors found" description="Try a different search or department filter." />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((d) => (
            <div key={d.id} className="card p-5 flex flex-col">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full bg-medical-100 text-medical-700 flex items-center justify-center font-semibold text-sm shrink-0">
                  {d.fullName.replace('Dr. ', '').split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm truncate">{d.fullName}</h3>
                  <p className="text-xs text-medical-600 font-medium">{d.specialization}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{d.departmentName}</p>
                </div>
              </div>
              {d.bio && <p className="text-xs text-gray-500 mt-3 line-clamp-2">{d.bio}</p>}
              <p className="text-xs text-gray-400 mt-2">{d.experienceYears} years experience</p>
              <Link
                to="/patient/book"
                state={{ doctorId: d.id }}
                className="btn-primary text-xs mt-4 w-full text-center"
              >
                Book appointment
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
