import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './layouts/DashboardLayout'

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

import AdminOverview from './pages/admin/AdminOverview'
import AdminDoctors from './pages/admin/AdminDoctors'
import AdminPatients from './pages/admin/AdminPatients'
import AdminAppointments from './pages/admin/AdminAppointments'
import AdminDepartments from './pages/admin/AdminDepartments'

import DoctorOverview from './pages/doctor/DoctorOverview'
import DoctorAppointments from './pages/doctor/DoctorAppointments'
import DoctorPatients from './pages/doctor/DoctorPatients'

import PatientOverview from './pages/patient/PatientOverview'
import BookAppointment from './pages/patient/BookAppointment'
import PatientAppointments from './pages/patient/PatientAppointments'
import FindDoctors from './pages/patient/FindDoctors'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['ADMIN']}><AdminOverview /></ProtectedRoute>
        } />
        <Route path="/admin/doctors" element={
          <ProtectedRoute allowedRoles={['ADMIN']}><AdminDoctors /></ProtectedRoute>
        } />
        <Route path="/admin/patients" element={
          <ProtectedRoute allowedRoles={['ADMIN']}><AdminPatients /></ProtectedRoute>
        } />
        <Route path="/admin/appointments" element={
          <ProtectedRoute allowedRoles={['ADMIN']}><AdminAppointments /></ProtectedRoute>
        } />
        <Route path="/admin/departments" element={
          <ProtectedRoute allowedRoles={['ADMIN']}><AdminDepartments /></ProtectedRoute>
        } />

        <Route path="/doctor" element={
          <ProtectedRoute allowedRoles={['DOCTOR']}><DoctorOverview /></ProtectedRoute>
        } />
        <Route path="/doctor/appointments" element={
          <ProtectedRoute allowedRoles={['DOCTOR']}><DoctorAppointments /></ProtectedRoute>
        } />
        <Route path="/doctor/patients" element={
          <ProtectedRoute allowedRoles={['DOCTOR']}><DoctorPatients /></ProtectedRoute>
        } />

        <Route path="/patient" element={
          <ProtectedRoute allowedRoles={['PATIENT']}><PatientOverview /></ProtectedRoute>
        } />
        <Route path="/patient/book" element={
          <ProtectedRoute allowedRoles={['PATIENT']}><BookAppointment /></ProtectedRoute>
        } />
        <Route path="/patient/appointments" element={
          <ProtectedRoute allowedRoles={['PATIENT']}><PatientAppointments /></ProtectedRoute>
        } />
        <Route path="/patient/doctors" element={
          <ProtectedRoute allowedRoles={['PATIENT']}><FindDoctors /></ProtectedRoute>
        } />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
