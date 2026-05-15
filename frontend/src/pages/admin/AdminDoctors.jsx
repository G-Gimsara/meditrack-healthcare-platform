import { useEffect, useState } from 'react'
import api from '../../services/api'
import DataTable from '../../components/DataTable'
import LoadingSpinner from '../../components/LoadingSpinner'
import toast from 'react-hot-toast'
export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const fetchDoctors = () => {
    api.get('/admin/doctors')
      .then(({ data }) => { if (data.success) setDoctors(data.data) })
      .catch(() => toast.error('Failed to load doctors'))
      .finally(() => setLoading(false))
  }
  useEffect(() => { fetchDoctors() }, [])
  const handleToggle = async (doctor) => {
    try {
      await api.put(`/admin/doctors/${doctor.id}`, { available: !doctor.available })
      toast.success(`Doctor ${doctor.available ? 'marked unavailable' : 'marked available'}`)
      fetchDoctors()
    } catch {
      toast.error('Update failed')
    }
  }
  const columns = [
    { key: 'fullName', label: 'Name' },
    { key: 'specialization', label: 'Specialization' },
    { key: 'departmentName', label: 'Department' },
    { key: 'phone', label: 'Phone' },
    { key: 'experienceYears', label: 'Exp (yrs)' },
    {
      key: 'available',
      label: 'Status',
      render: (row) => (
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${row.available ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
          {row.available ? 'Available' : 'Unavailable'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: '',
      render: (row) => (
        <button onClick={() => handleToggle(row)} className="text-xs text-medical-600 hover:underline">
          Toggle availability
        </button>
      ),
    },
  ]
  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
  return (
    <div>
      <div className="mb-6">
        <h1 className="page-heading">Doctors</h1>
        <p className="page-subtext">Manage hospital medical staff</p>
      </div>
      <DataTable
        columns={columns}
        data={doctors}
        searchKeys={['fullName', 'specialization', 'departmentName', 'email']}
      />
    </div>
  )
}
