import { Link } from 'react-router-dom'
import {
  Activity, Calendar, Shield, Users, Stethoscope, Heart,
  Building2, ArrowRight, CheckCircle,
} from 'lucide-react'

const features = [
  { icon: Calendar, title: 'Easy Booking', desc: 'Patients can book appointments online and pick available time slots.' },
  { icon: Stethoscope, title: 'Doctor Dashboard', desc: 'Doctors manage their schedule, update statuses, and view patient info.' },
  { icon: Shield, title: 'Secure Access', desc: 'JWT-based authentication with role-based permissions for each user type.' },
  { icon: Users, title: 'Admin Control', desc: 'Hospital admins manage departments, staff, and overall appointment flow.' },
]

const departments = [
  { name: 'Cardiology', desc: 'Heart & vascular care', color: 'bg-red-50 text-red-600' },
  { name: 'Pediatrics', desc: 'Child healthcare', color: 'bg-amber-50 text-amber-600' },
  { name: 'Orthopedics', desc: 'Bone & joint treatment', color: 'bg-blue-50 text-blue-600' },
  { name: 'General Medicine', desc: 'Primary care checkups', color: 'bg-teal-50 text-teal-600' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Activity className="text-medical-600" size={26} />
            <span className="font-semibold text-gray-900 text-lg">MediTrack</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#features" className="hover:text-medical-600 transition-colors">Features</a>
            <a href="#departments" className="hover:text-medical-600 transition-colors">Departments</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2">Sign in</Link>
            <Link to="/register" className="btn-primary text-sm py-2">Get started</Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-medical-50 via-white to-teal-50/40" />
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-medical-50 text-medical-700 text-xs font-medium border border-medical-100 mb-4">
              <Heart size={12} /> Healthcare Management System
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-gray-900 leading-tight">
              Manage hospital appointments without the paperwork.
            </h1>
            <p className="mt-4 text-gray-600 text-base leading-relaxed max-w-lg">
              MediTrack connects patients, doctors, and administrators on one platform —
              book visits, track statuses, and keep records organized.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/register" className="btn-primary">
                Book an appointment <ArrowRight size={16} />
              </Link>
              <Link to="/login" className="btn-secondary">Sign in to dashboard</Link>
            </div>
            <ul className="mt-8 space-y-2">
              {['Online appointment booking', 'Role-based dashboards', 'Real-time status updates'].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-teal-500 shrink-0" /> {t}
                </li>
              ))}
            </ul>
          </div>

          {/* tried keeping this layout simple */}
          <div className="relative hidden md:block">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5 max-w-md ml-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-medical-100 flex items-center justify-center">
                  <Stethoscope size={18} className="text-medical-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Dr. Rajesh Sharma</p>
                  <p className="text-xs text-gray-500">Cardiology Â· Tomorrow 10:00 AM</p>
                </div>
                <span className="ml-auto text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">Pending</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { name: 'Emma Wilson', dept: 'Pediatrics', time: '2:00 PM', status: 'Confirmed' },
                  { name: 'John Doe', dept: 'Orthopedics', time: '11:00 AM', status: 'Completed' },
                ].map((apt) => (
                  <div key={apt.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                      {apt.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{apt.name}</p>
                      <p className="text-xs text-gray-500">{apt.dept} Â· {apt.time}</p>
                    </div>
                    <span className="text-xs text-gray-500">{apt.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">What MediTrack offers</h2>
          <p className="text-sm text-gray-500 text-center mt-2 mb-10">A full-stack practice project — covers the core hospital workflow</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div key={f.title} className="card p-5 hover:shadow-soft transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-medical-50 flex items-center justify-center mb-3">
                  <f.icon size={20} className="text-medical-600" />
                </div>
                <h3 className="font-medium text-gray-900">{f.title}</h3>
                <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="departments" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900">Our departments</h2>
          <p className="text-sm text-gray-500 mt-1 mb-8">Specialized care across multiple units</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((d) => (
              <div key={d.name} className="card p-4 flex items-start gap-3">
                <div className={`p-2 rounded-lg ${d.color}`}>
                  <Building2 size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">{d.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-gradient-to-r from-medical-600 to-teal-600">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl font-semibold">Ready to manage your health visits?</h2>
          <p className="text-medical-100 mt-2 text-sm">Register as a patient and book your first appointment today.</p>
          <Link to="/register" className="inline-flex mt-6 px-6 py-2.5 bg-white text-medical-700 font-medium rounded-lg text-sm hover:bg-medical-50 transition-colors">
            Create free account
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-medical-600" />
            <span>MediTrack © 2025</span>
          </div>
          <p>Personal project — Hospital Management System</p>
        </div>
      </footer>
    </div>
  )
}
