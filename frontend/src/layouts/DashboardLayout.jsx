import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, Stethoscope, Calendar, Building2,
  LogOut, Menu, X, Bell, ChevronDown, UserCircle,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getInitials } from '../utils/helpers'

const navByRole = {
  ADMIN: [
    { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/admin/doctors', label: 'Doctors', icon: Stethoscope },
    { to: '/admin/patients', label: 'Patients', icon: Users },
    { to: '/admin/appointments', label: 'Appointments', icon: Calendar },
    { to: '/admin/departments', label: 'Departments', icon: Building2 },
  ],
  DOCTOR: [
    { to: '/doctor', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/doctor/appointments', label: 'Appointments', icon: Calendar },
    { to: '/doctor/patients', label: 'Patients', icon: Users },
  ],
  PATIENT: [
    { to: '/patient', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/patient/book', label: 'Book Appointment', icon: Calendar },
    { to: '/patient/appointments', label: 'My Appointments', icon: Calendar },
    { to: '/patient/doctors', label: 'Find Doctors', icon: Stethoscope },
  ],
}

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const navItems = navByRole[user?.role] || []

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-medical-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="font-semibold text-gray-900">MediTrack</span>
          <button className="lg:hidden ml-auto p-1" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive ? 'bg-medical-50 text-medical-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>

      {/* mobile view needed small spacing fix */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 h-16 flex items-center px-4 lg:px-6 gap-4">
          <button className="lg:hidden p-2 -ml-1 rounded-lg hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>

          <div className="flex-1" />

          <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-medical-500 rounded-full" />
          </button>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-50"
            >
              <div className="w-8 h-8 rounded-full bg-medical-100 text-medical-700 flex items-center justify-center text-xs font-semibold">
                {getInitials(user?.fullName)}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-800 leading-tight">{user?.fullName}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role?.toLowerCase()}</p>
              </div>
              <ChevronDown size={16} className="text-gray-400 hidden sm:block" />
            </button>

            {profileOpen && (
              <>
                <div className="fixed inset-0" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-100 shadow-soft py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-50">
                    <p className="text-sm font-medium text-gray-800">{user?.fullName}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut size={14} /> Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
