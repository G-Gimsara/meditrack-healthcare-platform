package com.meditrack.controller;

import com.meditrack.dto.ApiResponse;
import com.meditrack.dto.AppointmentRequest;
import com.meditrack.dto.AppointmentStatusUpdate;
import com.meditrack.model.Appointment;
import com.meditrack.security.UserPrincipal;
import com.meditrack.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Appointment>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(appointmentService.getAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Appointment>> getById(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.ok(appointmentService.getById(id)));
    }
}
