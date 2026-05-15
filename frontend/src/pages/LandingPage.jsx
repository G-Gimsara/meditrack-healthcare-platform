import { Link } from 'react-router-dom'
import {
  Activity, Calendar, Shield, Users, Stethoscope, Heart,
  Building2, ArrowRight, CheckCircle,
} from 'lucide-react'
import HeroWave from '../components/landing/HeroWave'

const shell = 'w-full max-w-7xl 2xl:max-w-[1360px] mx-auto px-5 sm:px-6 lg:px-8'

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

const previewAppointments = [
  { name: 'Emma Wilson', dept: 'Pediatrics', time: '2:00 PM', status: 'Confirmed', statusClass: 'bg-medical-50 text-medical-700 border-medical-200' },
  { name: 'John Doe', dept: 'Orthopedics', time: '11:00 AM', status: 'Completed', statusClass: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
]

function StatusPill({ label, className }) {
  return (
    <span className={`inline-flex px-2 py-0.5 text-[11px] font-medium rounded-full border ${className}`}>
      {label}
    </span>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 bg-gradient-to-r from-medical-600 via-medical-600 to-teal-600 text-white shadow-md shadow-medical-900/10">
        <div className={shell}>
        <div className="h-16 sm:h-[4.25rem] flex items-center justify-between gap-3 sm:gap-4">
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 ring-1 ring-white/25 flex items-center justify-center group-hover:bg-white/20 transition-colors shrink-0">
              <Activity className="text-white" size={22} />
            </div>
            <div className="min-w-0">
              <span className="block font-semibold text-white text-lg sm:text-xl tracking-tight leading-none truncate">
                MediTrack
              </span>
              <span className="hidden sm:block text-[11px] text-white/75 mt-0.5 font-medium">
                Healthcare platform
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/90">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#departments" className="hover:text-white transition-colors">Departments</a>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <Link
              to="/login"
              className="text-sm font-medium text-white/90 hover:text-white px-2 sm:px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center text-sm font-medium py-2 px-3 sm:px-4 rounded-lg bg-white text-medical-700 hover:bg-medical-50 shadow-sm transition-colors whitespace-nowrap"
            >
              Get started
            </Link>
          </div>
        </div>
        <nav className="flex md:hidden justify-center gap-8 pb-3 text-xs font-medium text-white/90 border-t border-white/10 -mt-px">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#departments" className="hover:text-white transition-colors">Departments</a>
        </nav>
        </div>
      </header>

      {/* hero */}
      <section className="relative overflow-hidden pb-16 sm:pb-20 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/90 via-white to-medical-50/30" />
        <div className="absolute top-20 -left-32 w-72 h-72 bg-medical-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl" />

        <div className={`relative ${shell} pt-12 md:pt-16 lg:pt-20 pb-8 lg:pb-12`}>
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 xl:gap-16 items-center">
            <div className="max-w-xl lg:max-w-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-medical-700 text-xs font-medium border border-medical-100 shadow-sm mb-5">
                <Heart size={12} className="text-medical-500" />
                Healthcare Management System
              </span>
              <h1 className="text-[2rem] sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight">
                Manage hospital appointments without the paperwork.
              </h1>
              <p className="mt-5 text-gray-600 text-base sm:text-lg leading-relaxed max-w-lg">
                MediTrack connects patients, doctors, and administrators on one platform so you can book visits, track statuses, and keep records organized.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register" className="btn-primary shadow-md shadow-medical-600/15">
                  Book an appointment <ArrowRight size={16} />
                </Link>
                <Link to="/login" className="btn-secondary bg-white/80 hover:bg-white">
                  Sign in to dashboard
                </Link>
              </div>
              <ul className="mt-9 space-y-2.5">
                {['Online appointment booking', 'Role-based dashboards', 'Real-time status updates'].map((t) => (
                  <li key={t} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <CheckCircle size={17} className="text-teal-500 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative hidden lg:block">
              <div className="rounded-2xl border border-gray-100/90 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgba(2,132,199,0.08),0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-white">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Upcoming visits</p>
                </div>
                <div className="p-6 pt-5">
                  <div className="flex items-center gap-3 pb-5 mb-5 border-b border-gray-100">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-medical-100 to-medical-50 flex items-center justify-center ring-2 ring-white shadow-sm">
                      <Stethoscope size={18} className="text-medical-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">Dr. Rajesh Sharma</p>
                      <p className="text-xs text-gray-500 mt-0.5">Cardiology, tomorrow 10:00 AM</p>
                    </div>
                    <StatusPill label="Pending" className="bg-amber-50 text-amber-700 border-amber-200" />
                  </div>
                  <div className="space-y-3">
                    {previewAppointments.map((apt) => (
                      <div
                        key={apt.name}
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50/80 border border-gray-100/80 hover:bg-white hover:border-medical-100 hover:shadow-sm transition-all duration-200"
                      >
                        <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-semibold text-medical-700 shadow-sm">
                          {apt.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{apt.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{apt.dept}, {apt.time}</p>
                        </div>
                        <StatusPill label={apt.status} className={apt.statusClass} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <HeroWave />
      </section>

      <section id="features" className="py-16 bg-gray-50/50 border-y border-gray-100">
        <div className={`${shell}`}>
          <h2 className="text-2xl font-semibold text-gray-900 text-center">What MediTrack offers</h2>
          <p className="text-sm text-gray-500 text-center mt-2 mb-10">A full-stack practice project that covers the core hospital workflow</p>
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
        <div className={`${shell}`}>
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
        <div className={`${shell} text-center text-white`}>
          <h2 className="text-2xl font-semibold">Ready to manage your health visits?</h2>
          <p className="text-medical-100 mt-2 text-sm">Register as a patient and book your first appointment today.</p>
          <Link to="/register" className="inline-flex mt-6 px-6 py-2.5 bg-white text-medical-700 font-medium rounded-lg text-sm hover:bg-medical-50 transition-colors">
            Create free account
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8">
        <div className={`${shell} flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500`}>
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-medical-600" />
            <span>MediTrack © 2026</span>
          </div>
          <p>Personal project: Hospital Management System</p>
        </div>
      </footer>
    </div>
  )
}
