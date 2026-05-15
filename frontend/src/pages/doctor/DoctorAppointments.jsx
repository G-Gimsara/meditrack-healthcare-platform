import { useEffect, useState } from 'react'
import api from '../../services/api'
import DataTable from '../../components/DataTable'
import LoadingSpinner from '../../components/LoadingSpinner'
import StatusBadge from '../../components/StatusBadge'
import Modal from '../../components/Modal'
import { formatDate, formatTime } from '../../utils/helpers'
import toast from 'react-hot-toast'
export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [newStatus, setNewStatus] = useState('CONFIRMED')
  const [notes, setNotes] = useState('')
  const fetchAppts = () => {
    api.get('/doctor/appointments')
      .then(({ data }) => { if (data.success) setAppointments(data.data) })
      .finally(() => setLoading(false))
  }
  useEffect(() => { fetchAppts() }, [])
  const handleUpdate = async () => {
    try {
      await api.patch(`/doctor/appointments/${selected.id}/status`, {
        status: newStatus,
        notes: notes || undefined,
      })
      toast.success('Status updated')
      setSelected(null)
      fetchAppts()
    } catch {
      toast.error('Failed to update status')
    }
  }
  const columns = [
    { key: 'patientName', label: 'Patient' },
    {
      key: 'date',
      label: 'Date & Time',
      render: (r) => `${formatDate(r.appointmentDate)} · ${formatTime(r.appointmentTime)}`,
    },
    { key: 'reason', label: 'Reason' },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'actions',
      label: 'Action',
      render: (r) => (
        <button
          onClick={() => { setSelected(r); setNewStatus(r.status === 'PENDING' ? 'CONFIRMED' : r.status) }}
          className="text-xs text-medical-600 hover:underline"
          disabled={r.status === 'CANCELLED'}
        >
          Update status
        </button>
      ),
    },
  ]
  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
  return (
    <div>
      <div className="mb-6">
        <h1 className="page-heading">My Appointments</h1>
        <p className="page-subtext">View and manage your patient visits</p>
      </div>
      <DataTable
        columns={columns}
        data={appointments}
        searchKeys={['patientName', 'reason']}
        filterOptions={{
          label: 'status',
          key: 'status',
          options: [
            { value: 'PENDING', label: 'Pending' },
            { value: 'CONFIRMED', label: 'Confirmed' },
            { value: 'COMPLETED', label: 'Completed' },
          ],
        }}
      />
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Update appointment status">
        {selected && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Patient: <strong>{selected.patientName}</strong> — {formatDate(selected.appointmentDate)}
            </p>
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select className="input-field mt-1" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Notes (optional)</label>
              <textarea className="input-field mt-1" rows={2} value={notes}
                onChange={(e) => setNotes(e.target.value)} placeholder="Add visit notes..." />
            </div>
            <button onClick={handleUpdate} className="btn-primary w-full">Save changes</button>
          </div>
        )}
      </Modal>
    </div>
  )
}
