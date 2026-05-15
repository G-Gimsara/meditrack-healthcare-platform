import { useEffect, useState } from 'react'
import api from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import Modal from '../../components/Modal'
import toast from 'react-hot-toast'
import { Plus, Building2 } from 'lucide-react'
import EmptyState from '../../components/EmptyState'
export default function AdminDepartments() {
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ name: '', description: '', floor: '' })
  const fetchDepts = () => {
    api.get('/departments')
      .then(({ data }) => { if (data.success) setDepartments(data.data) })
      .finally(() => setLoading(false))
  }
  useEffect(() => { fetchDepts() }, [])
  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await api.post('/departments', form)
      toast.success('Department added')
      setModalOpen(false)
      setForm({ name: '', description: '', floor: '' })
      fetchDepts()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create department')
    }
  }
  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="page-heading">Departments</h1>
          <p className="page-subtext">Hospital units and specialties</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn-primary text-sm">
          <Plus size={16} /> Add department
        </button>
      </div>
      {departments.length === 0 ? (
        <div className="card"><EmptyState icon={Building2} title="No departments" description="Add your first department to get started." /></div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((d) => (
            <div key={d.id} className="card p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-medical-50 text-medical-600">
                  <Building2 size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{d.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{d.description}</p>
                  {d.floor && <p className="text-xs text-gray-400 mt-2">{d.floor}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Department">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input className="input-field mt-1" required value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea className="input-field mt-1" rows={2} value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Floor</label>
            <input className="input-field mt-1" placeholder="e.g. 2nd Floor" value={form.floor}
              onChange={(e) => setForm({ ...form, floor: e.target.value })} />
          </div>
          <button type="submit" className="btn-primary w-full">Save</button>
        </form>
      </Modal>
    </div>
  )
}
