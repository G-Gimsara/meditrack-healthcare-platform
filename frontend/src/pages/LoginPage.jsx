import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import LoadingSpinner from '../components/LoadingSpinner'
import { Activity } from 'lucide-react'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      const user = await login(form.email, form.password)
      toast.success(`Welcome back, ${user.fullName.split(' ')[0]}!`)

      const routes = { ADMIN: '/admin', DOCTOR: '/doctor', PATIENT: '/patient' }
      navigate(routes[user.role] || '/')
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-medical-600 to-teal-600 p-12 flex-col justify-between text-white">
        <Link to="/" className="flex items-center gap-2">
          <Activity size={28} />
          <span className="text-xl font-semibold">MediTrack</span>
        </Link>
        <div>
          <h1 className="text-3xl font-bold leading-tight">Hospital management,<br />made simpler.</h1>
          <p className="mt-4 text-medical-100 text-base max-w-md">
            Book appointments, manage patient records, and coordinate care from one dashboard.
          </p>
        </div>
        <p className="text-sm text-medical-200">Full-stack upskilling project</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Activity className="text-medical-600" size={24} />
            <span className="font-semibold text-lg">MediTrack</span>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900">Sign in</h2>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            Don't have an account? <Link to="/register" className="text-medical-600 hover:underline font-medium">Register</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className={`input-field ${errors.email ? 'border-red-300' : ''}`}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@email.com"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className={`input-field ${errors.password ? 'border-red-300' : ''}`}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
              />
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
              {loading ? <LoadingSpinner size="sm" /> : 'Sign in'}
            </button>
          </form>

          {/* test logins for demo */}
          <div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-100 text-xs text-gray-500">
            <p className="font-medium text-gray-600 mb-1">Demo accounts:</p>
            <p>Admin: admin@meditrack.com / admin123</p>
            <p>Doctor: dr.sharma@meditrack.com / doctor123</p>
            <p>Patient: john.doe@email.com / patient123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
