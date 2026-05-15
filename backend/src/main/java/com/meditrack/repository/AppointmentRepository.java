package com.meditrack.repository;

import com.meditrack.model.Appointment;
import com.meditrack.model.AppointmentStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentRepository extends MongoRepository<Appointment, String> {
    List<Appointment> findByPatientId(String patientId);
    List<Appointment> findByDoctorId(String doctorId);
    List<Appointment> findByStatus(AppointmentStatus status);
    List<Appointment> findByAppointmentDate(LocalDate date);
    long countByStatus(AppointmentStatus status);
    List<Appointment> findByDoctorIdAndAppointmentDate(String doctorId, LocalDate date);
}
