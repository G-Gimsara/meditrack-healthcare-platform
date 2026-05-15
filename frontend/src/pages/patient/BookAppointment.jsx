import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import toast from 'react-hot-toast'
export default function BookAppointment() {
  const navigate = useNavigate()
  const location = useLocation()
  const preselectedDoctorId = location.state?.doctorId || ''
  const [doctors, setDoctors] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    doctorId: '', appointmentDate: '', appointmentTime: '', reason: '',
  })
  const [errors, setErrors] = useState({})
  useEffect(() => {
    api.get('/doctors')
      .then(({ data }) => {
        if (data.success) {
          setDoctors(data.data)
          if (preselectedDoctorId) {
            const doc = data.data.find((d) => d.id === preselectedDoctorId)
            if (doc) {
              setSelectedDoctor(doc)
              setForm((f) => ({ ...f, doctorId: doc.id }))
            }
          }
        }
      })
      .finally(() => setLoading(false))
  }, [preselectedDoctorId])
  const onDoctorChange = (id) => {
    const doc = doctors.find((d) => d.id === id)
    setSelectedDoctor(doc)
    setForm({ ...form, doctorId: id, appointmentTime: '' }) // reset time when doctor changes
  }
  // added extra validation because form was submitting empty values
  const validate = () => {
    const e = {}
    if (!form.doctorId) e.doctorId = 'Select a doctor'
    if (!form.appointmentDate) e.appointmentDate = 'Pick a date'
    if (!form.appointmentTime) e.appointmentTime = 'Pick a time slot'
    if (!form.reason.trim()) e.reason = 'Reason is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      const timeParts = form.appointmentTime.split(':')
      const payload = {
        doctorId: form.doctorId,
        appointmentDate: form.appointmentDate,
        appointmentTime: `${timeParts[0].padStart(2,'0')}:${timeParts[1] || '00'}:00`,
        reason: form.reason,
      }
      await api.post('/patient/appointments', payload)
      toast.success('Appointment booked successfully!')
      navigate('/patient/appointments')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed')
    } finally {
      setSubmitting(false)
    }
  }
  const minDate = new Date().toISOString().split('T')[0]
  const slots = selectedDoctor?.availableSlots || []
  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <h1 className="page-heading">Book Appointment</h1>
        <p className="page-subtext">Choose a doctor and available time slot</p>
      </div>
      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div>
          <label className="text-sm font-medium text-gray-700">Select Doctor</label>
          <select
            className={`input-field mt-1 ${errors.doctorId ? 'border-red-300' : ''}`}
            value={form.doctorId}
            onChange={(e) => onDoctorChange(e.target.value)}
          >
            <option value="">Choose a doctor...</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.fullName}, {d.specialization} ({d.departmentName})
              </option>
            ))}
          </select>
          {errors.doctorId && <p className="text-xs text-red-500 mt-1">{errors.doctorId}</p>}
        </div>
        {selectedDoctor && (
          <div className="p-3 bg-medical-50 rounded-lg text-sm text-medical-800 border border-medical-100">
            <p className="font-medium">{selectedDoctor.fullName}</p>
            <p className="text-xs mt-0.5 text-medical-600">{selectedDoctor.specialization}, {selectedDoctor.departmentName}</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              min={minDate}
              className={`input-field mt-1 ${errors.appointmentDate ? 'border-red-300' : ''}`}
              value={form.appointmentDate}
              onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
            />
            {errors.appointmentDate && <p className="text-xs text-red-500 mt-1">{errors.appointmentDate}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Time slot</label>
            <select
              className={`input-field mt-1 ${errors.appointmentTime ? 'border-red-300' : ''}`}
              value={form.appointmentTime}
              onChange={(e) => setForm({ ...form, appointmentTime: e.target.value })}
              disabled={!form.doctorId}
            >
              <option value="">Select time</option>
              {slots.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.appointmentTime && <p className="text-xs text-red-500 mt-1">{errors.appointmentTime}</p>}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Reason for visit</label>
          <textarea
            className={`input-field mt-1 ${errors.reason ? 'border-red-300' : ''}`}
            rows={3}
            placeholder="Describe your symptoms or reason..."
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
          />
          {errors.reason && <p className="text-xs text-red-500 mt-1">{errors.reason}</p>}
        </div>
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? <LoadingSpinner size="sm" /> : 'Confirm booking'}
        </button>
      </form>
    </div>
  )
}
