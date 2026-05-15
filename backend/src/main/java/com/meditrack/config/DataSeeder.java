package com.meditrack.config;
import com.meditrack.model.*;
import com.meditrack.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public void run(String... args) {
        // skip if data already exists
        if (userRepository.count() > 0) {
            log.info("Database already seeded, skipping...");
            return;
        }
        log.info("Seeding sample data for MediTrack...");
        Department cardiology = departmentRepository.save(Department.builder()
                .name("Cardiology").description("Heart and cardiovascular care").floor("2nd Floor").doctorCount(0).build());
        Department pediatrics = departmentRepository.save(Department.builder()
                .name("Pediatrics").description("Child healthcare services").floor("1st Floor").doctorCount(0).build());
        Department orthopedics = departmentRepository.save(Department.builder()
                .name("Orthopedics").description("Bone and joint treatment").floor("3rd Floor").doctorCount(0).build());
        Department general = departmentRepository.save(Department.builder()
                .name("General Medicine").description("Primary care and checkups").floor("Ground Floor").doctorCount(0).build());
        List<String> slots = Arrays.asList("09:00", "10:00", "11:00", "14:00", "15:00", "16:00");
        User admin = userRepository.save(User.builder()
                .email("admin@meditrack.com")
                .password(passwordEncoder.encode("admin123"))
                .fullName("Sarah Mitchell")
                .role(Role.ADMIN)
                .active(true)
                .createdAt(Instant.now())
                .build());
        User drUser1 = userRepository.save(User.builder()
                .email("dr.sharma@meditrack.com")
                .password(passwordEncoder.encode("doctor123"))
                .fullName("Dr. Rajesh Sharma")
                .role(Role.DOCTOR)
                .active(true)
                .createdAt(Instant.now())
                .build());
        Doctor dr1 = doctorRepository.save(Doctor.builder()
                .userId(drUser1.getId())
                .fullName("Dr. Rajesh Sharma")
                .email(drUser1.getEmail())
                .phone("+1 555-0101")
                .specialization("Cardiologist")
                .departmentId(cardiology.getId())
                .departmentName(cardiology.getName())
                .experienceYears(12)
                .bio("Specializes in preventive cardiology and heart disease management.")
                .available(true)
                .availableSlots(slots)
                .build());
        User drUser2 = userRepository.save(User.builder()
                .email("dr.patel@meditrack.com")
                .password(passwordEncoder.encode("doctor123"))
                .fullName("Dr. Ananya Patel")
                .role(Role.DOCTOR)
                .active(true)
                .createdAt(Instant.now())
                .build());
        Doctor dr2 = doctorRepository.save(Doctor.builder()
                .userId(drUser2.getId())
                .fullName("Dr. Ananya Patel")
                .email(drUser2.getEmail())
                .phone("+1 555-0102")
                .specialization("Pediatrician")
                .departmentId(pediatrics.getId())
                .departmentName(pediatrics.getName())
                .experienceYears(8)
                .available(true)
                .availableSlots(slots)
                .build());
        User drUser3 = userRepository.save(User.builder()
                .email("dr.kim@meditrack.com")
                .password(passwordEncoder.encode("doctor123"))
                .fullName("Dr. James Kim")
                .role(Role.DOCTOR)
                .active(true)
                .createdAt(Instant.now())
                .build());
        Doctor dr3 = doctorRepository.save(Doctor.builder()
                .userId(drUser3.getId())
                .fullName("Dr. James Kim")
                .email(drUser3.getEmail())
                .phone("+1 555-0103")
                .specialization("Orthopedic Surgeon")
                .departmentId(orthopedics.getId())
                .departmentName(orthopedics.getName())
                .experienceYears(15)
                .available(true)
                .availableSlots(slots)
                .build());
        User ptUser1 = userRepository.save(User.builder()
                .email("john.doe@email.com")
                .password(passwordEncoder.encode("patient123"))
                .fullName("John Doe")
                .role(Role.PATIENT)
                .active(true)
                .createdAt(Instant.now())
                .build());
        Patient pt1 = patientRepository.save(Patient.builder()
                .userId(ptUser1.getId())
                .fullName("John Doe")
                .email(ptUser1.getEmail())
                .phone("+1 555-0201")
                .dateOfBirth(LocalDate.of(1990, 5, 15))
                .bloodGroup("O+")
                .address("42 Oak Street, Springfield")
                .emergencyContact("+1 555-0299")
                .build());
        User ptUser2 = userRepository.save(User.builder()
                .email("emma.wilson@email.com")
                .password(passwordEncoder.encode("patient123"))
                .fullName("Emma Wilson")
                .role(Role.PATIENT)
                .active(true)
                .createdAt(Instant.now())
                .build());
        Patient pt2 = patientRepository.save(Patient.builder()
                .userId(ptUser2.getId())
                .fullName("Emma Wilson")
                .email(ptUser2.getEmail())
                .phone("+1 555-0202")
                .dateOfBirth(LocalDate.of(1985, 11, 3))
                .bloodGroup("A+")
                .address("18 Maple Ave, Springfield")
                .build());
        appointmentRepository.save(Appointment.builder()
                .patientId(pt1.getId()).patientName(pt1.getFullName())
                .doctorId(dr1.getId()).doctorName(dr1.getFullName())
                .departmentId(cardiology.getId()).departmentName(cardiology.getName())
                .appointmentDate(LocalDate.now().plusDays(2))
                .appointmentTime(LocalTime.of(10, 0))
                .reason("Routine heart checkup")
                .status(AppointmentStatus.CONFIRMED)
                .createdAt(Instant.now())
                .build());
        appointmentRepository.save(Appointment.builder()
                .patientId(pt2.getId()).patientName(pt2.getFullName())
                .doctorId(dr2.getId()).doctorName(dr2.getFullName())
                .departmentId(pediatrics.getId()).departmentName(pediatrics.getName())
                .appointmentDate(LocalDate.now().plusDays(1))
                .appointmentTime(LocalTime.of(14, 0))
                .reason("Child vaccination follow-up")
                .status(AppointmentStatus.PENDING)
                .createdAt(Instant.now())
                .build());
        appointmentRepository.save(Appointment.builder()
                .patientId(pt1.getId()).patientName(pt1.getFullName())
                .doctorId(dr3.getId()).doctorName(dr3.getFullName())
                .departmentId(orthopedics.getId()).departmentName(orthopedics.getName())
                .appointmentDate(LocalDate.now().minusDays(5))
                .appointmentTime(LocalTime.of(11, 0))
                .reason("Knee pain consultation")
                .status(AppointmentStatus.COMPLETED)
                .notes("Prescribed physiotherapy for 4 weeks")
                .createdAt(Instant.now())
                .build());
        log.info("Seed complete. Demo accounts:");
        log.info("  Admin:   admin@meditrack.com / admin123");
        log.info("  Doctor:  dr.sharma@meditrack.com / doctor123");
        log.info("  Patient: john.doe@email.com / patient123");
    }
}
