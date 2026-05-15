package com.meditrack.controller;
import com.meditrack.dto.ApiResponse;
import com.meditrack.model.Doctor;
import com.meditrack.repository.DoctorRepository;
import com.meditrack.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorPublicController {
    private final DoctorRepository doctorRepository;
    @GetMapping
    public ResponseEntity<ApiResponse<List<Doctor>>> getAll(
            @RequestParam(required = false) String departmentId,
            @RequestParam(required = false) String search) {
        List<Doctor> doctors;
        if (departmentId != null) {
            doctors = doctorRepository.findByDepartmentId(departmentId);
        } else if (search != null && !search.isBlank()) {
            doctors = doctorRepository.findByFullNameContainingIgnoreCase(search);
        } else {
            doctors = doctorRepository.findByAvailableTrue();
        }
        return ResponseEntity.ok(ApiResponse.ok(doctors));
    }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Doctor>> getById(@PathVariable String id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
        return ResponseEntity.ok(ApiResponse.ok(doctor));
    }
}
