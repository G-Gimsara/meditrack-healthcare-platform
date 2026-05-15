import { useEffect, useState } from 'react'
import api from '../../services/api'
import StatCard from '../../components/StatCard'
import LoadingSpinner from '../../components/LoadingSpinner'
import StatusBadge from '../../components/StatusBadge'
import { Calendar, Clock, CheckCircle, Users } from 'lucide-react'
import { formatDate, formatTime } from '../../utils/helpers'
import { useAuth } from '../../context/AuthContext'
export default function DoctorOverview() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    Promise.all([
      api.get('/doctor/profile'),
      api.get('/doctor/appointments'),
    ]).then(([profRes, apptRes]) => {
      if (profRes.data.success) setProfile(profRes.data.data)
      if (apptRes.data.success) setAppointments(apptRes.data.data)
    }).finally(() => setLoading(false))
  }, [])
  const pending = appointments.filter((a) => a.status === 'PENDING').length
  const today = appointments.filter((a) => a.appointmentDate === new Date().toISOString().split('T')[0]).length
  const completed = appointments.filter((a) => a.status === 'COMPLETED').length
  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
  const upcoming = appointments
    .filter((a) => a.status !== 'CANCELLED' && a.status !== 'COMPLETED')
    .slice(0, 5)
  return (
    <div>
      <div className="mb-6">
        <h1 className="page-heading">Welcome, {user?.fullName?.replace('Dr. ', '') || 'Doctor'}</h1>
        <p className="page-subtext">
          {profile?.specialization}, {profile?.departmentName || 'General'}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Appointments" value={appointments.length} icon={Calendar} color="blue" />
        <StatCard title="Pending" value={pending} icon={Clock} color="gray" />
        <StatCard title="Today" value={today} icon={Users} color="teal" />
        <StatCard title="Completed" value={completed} icon={CheckCircle} color="green" />
      </div>
      <div className="card">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Upcoming appointments</h3>
        </div>
        {upcoming.length === 0 ? (
          <p className="text-sm text-gray-400 p-5">No upcoming appointments.</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {upcoming.map((a) => (
              <div key={a.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50/50">
                <div>
                  <p className="text-sm font-medium text-gray-800">{a.patientName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {formatDate(a.appointmentDate)} at {formatTime(a.appointmentTime)}, {a.reason}
                  </p>
                </div>
                <StatusBadge status={a.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
