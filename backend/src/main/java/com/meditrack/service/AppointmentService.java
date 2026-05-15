package com.meditrack.service;
import com.meditrack.dto.AppointmentRequest;
import com.meditrack.dto.AppointmentStatusUpdate;
import com.meditrack.exception.BadRequestException;
import com.meditrack.exception.ResourceNotFoundException;
import com.meditrack.model.*;
import com.meditrack.repository.AppointmentRepository;
import com.meditrack.repository.DoctorRepository;
import com.meditrack.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    public List<Appointment> getAll() {
        return appointmentRepository.findAll();
    }
    public List<Appointment> getByPatient(String patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }
    public List<Appointment> getByDoctor(String doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }
    public Appointment getById(String id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));
    }
    public Appointment book(String patientId, AppointmentRequest request) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile not found"));
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
        if (!doctor.isAvailable()) {
            throw new BadRequestException("Doctor is not available for bookings");
        }
        if (request.getAppointmentDate().isBefore(LocalDate.now())) {
            throw new BadRequestException("Cannot book appointments in the past");
        }
        // keeping this check here for now
        boolean slotTaken = appointmentRepository.findByDoctorIdAndAppointmentDate(
                doctor.getId(), request.getAppointmentDate()).stream()
                .anyMatch(a -> a.getAppointmentTime().equals(request.getAppointmentTime())
                        && a.getStatus() != AppointmentStatus.CANCELLED);
        if (slotTaken) {
            throw new BadRequestException("This time slot is already booked");
        }
        Appointment appointment = Appointment.builder()
                .patientId(patient.getId())
                .patientName(patient.getFullName())
                .doctorId(doctor.getId())
                .doctorName(doctor.getFullName())
                .departmentId(doctor.getDepartmentId())
                .departmentName(doctor.getDepartmentName())
                .appointmentDate(request.getAppointmentDate())
                .appointmentTime(request.getAppointmentTime())
                .reason(request.getReason())
                .status(AppointmentStatus.PENDING)
                .createdAt(Instant.now())
                .build();
        return appointmentRepository.save(appointment);
    }
    public Appointment updateStatus(String id, AppointmentStatusUpdate update) {
        Appointment appointment = getById(id);
        appointment.setStatus(update.getStatus());
        if (update.getNotes() != null) {
            appointment.setNotes(update.getNotes());
        }
        return appointmentRepository.save(appointment);
    }
    public Appointment cancel(String id, String patientId) {
        Appointment appointment = getById(id);
        if (!appointment.getPatientId().equals(patientId)) {
            throw new BadRequestException("You can only cancel your own appointments");
        }
        if (appointment.getStatus() == AppointmentStatus.COMPLETED) {
            throw new BadRequestException("Completed appointments cannot be cancelled");
        }
        appointment.setStatus(AppointmentStatus.CANCELLED);
        return appointmentRepository.save(appointment);
    }
    public void delete(String id) {
        if (!appointmentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Appointment not found");
        }
        appointmentRepository.deleteById(id);
    }
}
