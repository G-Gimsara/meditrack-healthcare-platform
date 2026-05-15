import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import StatCard from '../../components/StatCard'
import LoadingSpinner from '../../components/LoadingSpinner'
import StatusBadge from '../../components/StatusBadge'
import { Calendar, Clock, CheckCircle, Plus } from 'lucide-react'
import { formatDate, formatTime } from '../../utils/helpers'
import { useAuth } from '../../context/AuthContext'
export default function PatientOverview() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    api.get('/patient/appointments')
      .then(({ data }) => { if (data.success) setAppointments(data.data) })
      .finally(() => setLoading(false))
  }, [])
  const upcoming = appointments.filter((a) => ['PENDING', 'CONFIRMED'].includes(a.status))
  const completed = appointments.filter((a) => a.status === 'COMPLETED').length
  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="page-heading">Hello, {user?.fullName?.split(' ')[0]}</h1>
          <p className="page-subtext">Here's your health visit summary</p>
        </div>
        <Link to="/patient/book" className="btn-primary text-sm hidden sm:inline-flex">
          <Plus size={16} /> Book appointment
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Visits" value={appointments.length} icon={Calendar} color="blue" />
        <StatCard title="Upcoming" value={upcoming.length} icon={Clock} color="teal" />
        <StatCard title="Completed" value={completed} icon={CheckCircle} color="green" />
      </div>
      <div className="card">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">Upcoming appointments</h3>
          <Link to="/patient/book" className="text-xs text-medical-600 hover:underline sm:hidden">Book new</Link>
        </div>
        {upcoming.length === 0 ? (
          <div className="p-5 text-center">
            <p className="text-sm text-gray-400">No upcoming appointments.</p>
            <Link to="/patient/book" className="btn-primary text-sm mt-3 inline-flex">Book your first visit</Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {upcoming.map((a) => (
              <div key={a.id} className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <p className="text-sm font-medium text-gray-800">{a.doctorName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {a.departmentName} · {formatDate(a.appointmentDate)} at {formatTime(a.appointmentTime)}
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
