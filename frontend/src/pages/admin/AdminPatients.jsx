import { useEffect, useState } from 'react'
import api from '../../services/api'
import DataTable from '../../components/DataTable'
import LoadingSpinner from '../../components/LoadingSpinner'
import { formatDate } from '../../utils/helpers'
import toast from 'react-hot-toast'

export default function AdminPatients() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/patients')
      .then(({ data }) => { if (data.success) setPatients(data.data) })
      .catch(() => toast.error('Failed to load patients'))
      .finally(() => setLoading(false))
  }, [])

  const columns = [
    { key: 'fullName', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'bloodGroup', label: 'Blood Group', render: (r) => r.bloodGroup || '-' },
    { key: 'dateOfBirth', label: 'DOB', render: (r) => formatDate(r.dateOfBirth) },
    { key: 'address', label: 'Address', render: (r) => r.address || '-' },
  ]

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>

  return (
    <div>
      <div className="mb-6">
        <h1 className="page-heading">Patients</h1>
        <p className="page-subtext">Registered patient records</p>
      </div>
      <DataTable columns={columns} data={patients} searchKeys={['fullName', 'email', 'phone']} />
    </div>
  )
}
