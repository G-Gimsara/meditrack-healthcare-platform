package com.meditrack.controller;

import com.meditrack.dto.ApiResponse;
import com.meditrack.dto.AppointmentRequest;
import com.meditrack.exception.ResourceNotFoundException;
import com.meditrack.model.Appointment;
import com.meditrack.model.Patient;
import com.meditrack.repository.PatientRepository;
import com.meditrack.security.UserPrincipal;
import com.meditrack.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patient")
@RequiredArgsConstructor
public class PatientController {

    private final AppointmentService appointmentService;
    private final PatientRepository patientRepository;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<Patient>> profile(@AuthenticationPrincipal UserPrincipal principal) {
        Patient patient = patientRepository.findByUserId(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile not found"));
        return ResponseEntity.ok(ApiResponse.ok(patient));
    }

    @GetMapping("/appointments")
    public ResponseEntity<ApiResponse<List<Appointment>>> myAppointments(@AuthenticationPrincipal UserPrincipal principal) {
        Patient patient = patientRepository.findByUserId(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile not found"));
        return ResponseEntity.ok(ApiResponse.ok(appointmentService.getByPatient(patient.getId())));
    }

    @PostMapping("/appointments")
    public ResponseEntity<ApiResponse<Appointment>> book(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody AppointmentRequest request) {
        Patient patient = patientRepository.findByUserId(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile not found"));
        Appointment booked = appointmentService.book(patient.getId(), request);
        return ResponseEntity.ok(ApiResponse.ok("Appointment booked", booked));
    }

    @PatchMapping("/appointments/{id}/cancel")
    public ResponseEntity<ApiResponse<Appointment>> cancel(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable String id) {
        Patient patient = patientRepository.findByUserId(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile not found"));
        return ResponseEntity.ok(ApiResponse.ok(appointmentService.cancel(id, patient.getId())));
    }
}
