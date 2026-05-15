import { useEffect, useState } from 'react'
import api from '../../services/api'
import StatCard from '../../components/StatCard'
import LoadingSpinner from '../../components/LoadingSpinner'
import StatusBadge from '../../components/StatusBadge'
import { Users, Stethoscope, Calendar, Clock } from 'lucide-react'
import { formatDate, formatTime } from '../../utils/helpers'
export default function AdminOverview() {
  const [stats, setStats] = useState(null)
  const [recentAppts, setRecentAppts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    Promise.all([
      api.get('/admin/dashboard'),
      api.get('/admin/appointments'),
    ]).then(([statsRes, apptsRes]) => {
      if (statsRes.data.success) setStats(statsRes.data.data)
      if (apptsRes.data.success) {
        setRecentAppts(apptsRes.data.data.slice(0, 5))
      }
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])
  if (loading) {
    return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
  }
  return (
    <div>
      <div className="mb-6">
        <h1 className="page-heading">Admin Dashboard</h1>
        <p className="page-subtext">Hospital overview and quick stats</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Patients" value={stats?.totalPatients} icon={Users} color="blue" />
        <StatCard title="Doctors" value={stats?.totalDoctors} icon={Stethoscope} color="teal" />
        <StatCard title="Appointments" value={stats?.totalAppointments} icon={Calendar} color="green" />
        <StatCard title="Pending" value={stats?.pendingAppointments} icon={Clock} color="gray" trend={`${stats?.todayAppointments || 0} scheduled today`} />
      </div>
      <div className="grid lg:grid-cols-3 gap-5">
        {/* simple bars instead of a chart library */}
        <div className="card p-5 lg:col-span-1">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Appointments by status</h3>
          {stats?.appointmentsByStatus ? (
            <div className="space-y-3">
              {Object.entries(stats.appointmentsByStatus).map(([status, count]) => {
                const total = stats.totalAppointments || 1
                const pct = Math.round((count / total) * 100)
                return (
                  <div key={status}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600 capitalize">{status.toLowerCase()}</span>
                      <span className="font-medium text-gray-800">{count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-medical-500 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No data yet</p>
          )}
        </div>
        <div className="card lg:col-span-2 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800">Recent appointments</h3>
          </div>
          {recentAppts.length === 0 ? (
            <p className="text-sm text-gray-400 p-5">No appointments recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/80 text-gray-600">
                    <th className="text-left px-4 py-2.5 font-medium">Patient</th>
                    <th className="text-left px-4 py-2.5 font-medium">Doctor</th>
                    <th className="text-left px-4 py-2.5 font-medium">Date</th>
                    <th className="text-left px-4 py-2.5 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentAppts.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3">{a.patientName}</td>
                      <td className="px-4 py-3 text-gray-600">{a.doctorName}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {formatDate(a.appointmentDate)} at {formatTime(a.appointmentTime)}
                      </td>
                      <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
