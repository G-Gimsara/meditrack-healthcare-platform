package com.meditrack.controller;

import com.meditrack.dto.ApiResponse;
import com.meditrack.dto.DashboardStats;
import com.meditrack.model.Appointment;
import com.meditrack.model.Doctor;
import com.meditrack.model.Patient;
import com.meditrack.model.User;
import com.meditrack.service.AdminService;
import com.meditrack.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final AppointmentService appointmentService;

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<DashboardStats>> dashboard() {
        return ResponseEntity.ok(ApiResponse.ok(adminService.getDashboardStats()));
    }

    @GetMapping("/doctors")
    public ResponseEntity<ApiResponse<List<Doctor>>> doctors() {
        return ResponseEntity.ok(ApiResponse.ok(adminService.getAllDoctors()));
    }

    @GetMapping("/patients")
    public ResponseEntity<ApiResponse<List<Patient>>> patients() {
        return ResponseEntity.ok(ApiResponse.ok(adminService.getAllPatients()));
    }

    @GetMapping("/appointments")
    public ResponseEntity<ApiResponse<List<Appointment>>> appointments() {
        return ResponseEntity.ok(ApiResponse.ok(appointmentService.getAll()));
    }

    @PutMapping("/doctors/{id}")
    public ResponseEntity<ApiResponse<Doctor>> updateDoctor(@PathVariable String id, @RequestBody Doctor updates) {
        return ResponseEntity.ok(ApiResponse.ok(adminService.updateDoctor(id, updates)));
    }

    @DeleteMapping("/doctors/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDoctor(@PathVariable String id) {
        adminService.deleteDoctor(id);
        return ResponseEntity.ok(ApiResponse.ok("Doctor removed", null));
    }

    @DeleteMapping("/patients/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePatient(@PathVariable String id) {
        adminService.deletePatient(id);
        return ResponseEntity.ok(ApiResponse.ok("Patient removed", null));
    }

    @PatchMapping("/users/{id}/toggle-active")
    public ResponseEntity<ApiResponse<User>> toggleUser(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.ok(adminService.toggleUserActive(id)));
    }
}
