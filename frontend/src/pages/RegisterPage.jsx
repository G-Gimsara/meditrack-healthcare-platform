import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import toast from 'react-hot-toast'
import LoadingSpinner from '../components/LoadingSpinner'
import { Activity } from 'lucide-react'
export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    fullName: '', email: '', password: '', confirmPassword: '',
    role: 'PATIENT', phone: '', dateOfBirth: '', bloodGroup: '',
    address: '', specialization: '', departmentId: '', experienceYears: '',
  })
  const [errors, setErrors] = useState({})
  useEffect(() => {
    api.get('/departments').then(({ data }) => {
      if (data.success) setDepartments(data.data)
    }).catch(() => {})
  }, [])
  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Name is required'
    if (!form.email) e.email = 'Email is required'
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    if (form.role === 'PATIENT' && !form.phone) e.phone = 'Phone number is required'
    if (form.role === 'DOCTOR' && !form.specialization) e.specialization = 'Specialization is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const payload = {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        role: form.role,
        phone: form.phone || undefined,
        dateOfBirth: form.dateOfBirth || undefined,
        bloodGroup: form.bloodGroup || undefined,
        address: form.address || undefined,
        specialization: form.specialization || undefined,
        departmentId: form.departmentId || undefined,
        experienceYears: form.experienceYears ? parseInt(form.experienceYears) : undefined,
      }
      const user = await register(payload)
      toast.success('Account created successfully!')
      const routes = { DOCTOR: '/doctor', PATIENT: '/patient' }
      navigate(routes[user.role] || '/login')
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <Link to="/" className="flex items-center gap-2 mb-8 justify-center">
          <Activity className="text-medical-600" size={24} />
          <span className="font-semibold text-lg">MediTrack</span>
        </Link>
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900">Create account</h2>
          <p className="text-sm text-gray-500 mt-1 mb-5">
            Already registered? <Link to="/login" className="text-medical-600 hover:underline font-medium">Sign in</Link>
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <label className="col-span-2 sm:col-span-1">
                <span className="text-sm font-medium text-gray-700">Register as</span>
                <select className="input-field mt-1" value={form.role} onChange={update('role')}>
                  <option value="PATIENT">Patient</option>
                  <option value="DOCTOR">Doctor</option>
                </select>
              </label>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Full name</label>
              <input className={`input-field mt-1 ${errors.fullName ? 'border-red-300' : ''}`}
                value={form.fullName} onChange={update('fullName')} placeholder="John Doe" />
              {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input type="email" className={`input-field mt-1 ${errors.email ? 'border-red-300' : ''}`}
                value={form.email} onChange={update('email')} />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700">Password</label>
                <input type="password" className={`input-field mt-1 ${errors.password ? 'border-red-300' : ''}`}
                  value={form.password} onChange={update('password')} />
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Confirm</label>
                <input type="password" className={`input-field mt-1 ${errors.confirmPassword ? 'border-red-300' : ''}`}
                  value={form.confirmPassword} onChange={update('confirmPassword')} />
                {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input className={`input-field mt-1 ${errors.phone ? 'border-red-300' : ''}`}
                value={form.phone} onChange={update('phone')} placeholder="+1 555-0000" />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>
            {form.role === 'PATIENT' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Date of birth</label>
                  <input type="date" className="input-field mt-1" value={form.dateOfBirth} onChange={update('dateOfBirth')} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Blood group</label>
                  <select className="input-field mt-1" value={form.bloodGroup} onChange={update('bloodGroup')}>
                    <option value="">Select</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            {form.role === 'DOCTOR' && (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-700">Specialization</label>
                  <input className={`input-field mt-1 ${errors.specialization ? 'border-red-300' : ''}`}
                    value={form.specialization} onChange={update('specialization')} placeholder="e.g. Cardiologist" />
                  {errors.specialization && <p className="text-xs text-red-500 mt-1">{errors.specialization}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Department</label>
                    <select className="input-field mt-1" value={form.departmentId} onChange={update('departmentId')}>
                      <option value="">Select department</option>
                      {departments.map((d) => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Experience (years)</label>
                    <input type="number" min="0" className="input-field mt-1"
                      value={form.experienceYears} onChange={update('experienceYears')} />
                  </div>
                </div>
              </>
            )}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? <LoadingSpinner size="sm" /> : 'Create account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
