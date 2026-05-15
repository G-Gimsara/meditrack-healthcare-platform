package com.meditrack.controller;

import com.meditrack.dto.ApiResponse;
import com.meditrack.dto.AppointmentStatusUpdate;
import com.meditrack.exception.ResourceNotFoundException;
import com.meditrack.model.Appointment;
import com.meditrack.model.Doctor;
import com.meditrack.repository.DoctorRepository;
import com.meditrack.security.UserPrincipal;
import com.meditrack.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctor")
@RequiredArgsConstructor
public class DoctorController {

    private final AppointmentService appointmentService;
    private final DoctorRepository doctorRepository;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<Doctor>> profile(@AuthenticationPrincipal UserPrincipal principal) {
        Doctor doctor = doctorRepository.findByUserId(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor profile not found"));
        return ResponseEntity.ok(ApiResponse.ok(doctor));
    }

    @GetMapping("/appointments")
    public ResponseEntity<ApiResponse<List<Appointment>>> myAppointments(@AuthenticationPrincipal UserPrincipal principal) {
        Doctor doctor = doctorRepository.findByUserId(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor profile not found"));
        return ResponseEntity.ok(ApiResponse.ok(appointmentService.getByDoctor(doctor.getId())));
    }

    @PatchMapping("/appointments/{id}/status")
    public ResponseEntity<ApiResponse<Appointment>> updateStatus(
            @PathVariable String id,
            @Valid @RequestBody AppointmentStatusUpdate update) {
        return ResponseEntity.ok(ApiResponse.ok(appointmentService.updateStatus(id, update)));
    }
}
