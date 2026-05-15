import { useEffect, useState } from 'react'
import api from '../../services/api'
import DataTable from '../../components/DataTable'
import LoadingSpinner from '../../components/LoadingSpinner'
import StatusBadge from '../../components/StatusBadge'
import Modal from '../../components/Modal'
import { formatDate, formatTime } from '../../utils/helpers'
import toast from 'react-hot-toast'
export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [cancelTarget, setCancelTarget] = useState(null)
  const [cancelling, setCancelling] = useState(false)
  const fetchAppts = () => {
    api.get('/patient/appointments')
      .then(({ data }) => { if (data.success) setAppointments(data.data) })
      .finally(() => setLoading(false))
  }
  useEffect(() => { fetchAppts() }, [])
  const handleCancel = async () => {
    setCancelling(true)
    try {
      await api.patch(`/patient/appointments/${cancelTarget.id}/cancel`)
      toast.success('Appointment cancelled')
      setCancelTarget(null)
      fetchAppts()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not cancel')
    } finally {
      setCancelling(false)
    }
  }
  const columns = [
    { key: 'doctorName', label: 'Doctor' },
    { key: 'departmentName', label: 'Department' },
    {
      key: 'date',
      label: 'Date & Time',
      render: (r) => `${formatDate(r.appointmentDate)} at ${formatTime(r.appointmentTime)}`,
    },
    { key: 'reason', label: 'Reason' },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'actions',
      label: '',
      render: (r) => (
        ['PENDING', 'CONFIRMED'].includes(r.status) ? (
          <button onClick={() => setCancelTarget(r)} className="text-xs text-red-600 hover:underline">
            Cancel
          </button>
        ) : null
      ),
    },
  ]
  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
  return (
    <div>
      <div className="mb-6">
        <h1 className="page-heading">My Appointments</h1>
        <p className="page-subtext">Track and manage your visits</p>
      </div>
      <DataTable
        columns={columns}
        data={appointments}
        searchKeys={['doctorName', 'departmentName', 'reason']}
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
      <Modal isOpen={!!cancelTarget} onClose={() => setCancelTarget(null)} title="Cancel appointment" size="sm">
        <p className="text-sm text-gray-600 mb-4">
          Are you sure you want to cancel your appointment with <strong>{cancelTarget?.doctorName}</strong> on {formatDate(cancelTarget?.appointmentDate)}?
        </p>
        <div className="flex gap-3">
          <button onClick={() => setCancelTarget(null)} className="btn-secondary flex-1">Keep it</button>
          <button onClick={handleCancel} disabled={cancelling} className="btn-danger flex-1">
            {cancelling ? 'Cancelling...' : 'Yes, cancel'}
          </button>
        </div>
      </Modal>
    </div>
  )
}
