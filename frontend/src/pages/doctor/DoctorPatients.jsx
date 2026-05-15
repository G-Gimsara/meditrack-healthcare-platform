import { useEffect, useState } from 'react'
import api from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import EmptyState from '../../components/EmptyState'
import { Users } from 'lucide-react'
export default function DoctorPatients() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // built patient list from appointments for now
    api.get('/doctor/appointments')
      .then(({ data }) => {
        if (data.success) {
          const seen = new Map()
          data.data.forEach((a) => {
            if (!seen.has(a.patientId)) {
              seen.set(a.patientId, { id: a.patientId, name: a.patientName, lastVisit: a.appointmentDate, reason: a.reason })
            }
          })
          setPatients([...seen.values()])
        }
      })
      .finally(() => setLoading(false))
  }, [])
  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
  return (
    <div>
      <div className="mb-6">
        <h1 className="page-heading">My Patients</h1>
        <p className="page-subtext">Patients you've seen or have upcoming appointments with</p>
      </div>
      {patients.length === 0 ? (
        <div className="card">
          <EmptyState icon={Users} title="No patients yet" description="Patients will appear here once you have appointments." />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.map((p) => (
            <div key={p.id} className="card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-medical-100 text-medical-700 flex items-center justify-center text-sm font-semibold">
                  {p.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{p.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Last visit: {p.lastVisit}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 border-t border-gray-50 pt-3">{p.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
