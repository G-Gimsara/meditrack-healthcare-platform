import { useEffect, useState } from 'react'
import api from '../../services/api'
import DataTable from '../../components/DataTable'
import LoadingSpinner from '../../components/LoadingSpinner'
import StatusBadge from '../../components/StatusBadge'
import { formatDate, formatTime } from '../../utils/helpers'
import toast from 'react-hot-toast'

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/appointments')
      .then(({ data }) => { if (data.success) setAppointments(data.data) })
      .catch(() => toast.error('Failed to load appointments'))
      .finally(() => setLoading(false))
  }, [])

  const columns = [
    { key: 'patientName', label: 'Patient' },
    { key: 'doctorName', label: 'Doctor' },
    { key: 'departmentName', label: 'Department' },
    {
      key: 'date',
      label: 'Date & Time',
      render: (r) => `${formatDate(r.appointmentDate)} · ${formatTime(r.appointmentTime)}`,
    },
    { key: 'reason', label: 'Reason' },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ]

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>

  return (
    <div>
      <div className="mb-6">
        <h1 className="page-heading">Appointments</h1>
        <p className="page-subtext">All scheduled hospital visits</p>
      </div>
      <DataTable
        columns={columns}
        data={appointments}
        searchKeys={['patientName', 'doctorName', 'departmentName', 'reason']}
        filterOptions={{
          label: 'status',
          key: 'status',
          options: [
            { value: 'PENDING', label: 'Pending' },
            { value: 'CONFIRMED', label: 'Confirmed' },
            { value: 'COMPLETED', label: 'Completed' },
            { value: 'CANCELLED', label: 'Cancelled' },
          ],
        }}
      />
    </div>
  )
}
