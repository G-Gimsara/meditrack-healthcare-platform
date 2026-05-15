package com.meditrack.service;
import com.meditrack.dto.DashboardStats;
import com.meditrack.exception.BadRequestException;
import com.meditrack.exception.ResourceNotFoundException;
import com.meditrack.model.*;
import com.meditrack.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;
    private final DepartmentRepository departmentRepository;
    public DashboardStats getDashboardStats() {
        long todayCount = appointmentRepository.findByAppointmentDate(LocalDate.now()).size();
        Map<String, Long> byStatus = Arrays.stream(AppointmentStatus.values())
                .collect(Collectors.toMap(
                        Enum::name,
                        s -> appointmentRepository.countByStatus(s)
                ));
        Map<String, Long> byDept = appointmentRepository.findAll().stream()
                .filter(a -> a.getDepartmentName() != null)
                .collect(Collectors.groupingBy(Appointment::getDepartmentName, Collectors.counting()));
        return DashboardStats.builder()
                .totalPatients(patientRepository.count())
                .totalDoctors(doctorRepository.count())
                .totalAppointments(appointmentRepository.count())
                .pendingAppointments(appointmentRepository.countByStatus(AppointmentStatus.PENDING))
                .todayAppointments(todayCount)
                .appointmentsByStatus(byStatus)
                .appointmentsByDepartment(byDept)
                .build();
    }
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }
    public Doctor updateDoctor(String id, Doctor updates) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
        if (updates.getSpecialization() != null) doctor.setSpecialization(updates.getSpecialization());
        if (updates.getDepartmentId() != null) {
            doctor.setDepartmentId(updates.getDepartmentId());
            departmentRepository.findById(updates.getDepartmentId())
                    .ifPresent(d -> doctor.setDepartmentName(d.getName()));
        }
        if (updates.getPhone() != null) doctor.setPhone(updates.getPhone());
        doctor.setAvailable(updates.isAvailable());
        return doctorRepository.save(doctor);
    }
    public void deleteDoctor(String id) {
        doctorRepository.deleteById(id);
    }
    public void deletePatient(String id) {
        patientRepository.deleteById(id);
    }
    public User toggleUserActive(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setActive(!user.isActive());
        return userRepository.save(user);
    }
}
