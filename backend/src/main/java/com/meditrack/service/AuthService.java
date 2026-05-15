package com.meditrack.service;
import com.meditrack.dto.AuthRequest;
import com.meditrack.dto.AuthResponse;
import com.meditrack.dto.RegisterRequest;
import com.meditrack.exception.BadRequestException;
import com.meditrack.model.*;
import com.meditrack.repository.*;
import com.meditrack.security.JwtTokenProvider;
import com.meditrack.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.Arrays;
import java.util.List;
@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final DepartmentRepository departmentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already registered");
        }
        // admin accounts only from seed data
        if (request.getRole() == Role.ADMIN) {
            throw new BadRequestException("Admin accounts cannot be self-registered");
        }
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .role(request.getRole())
                .active(true)
                .createdAt(Instant.now())
                .build();
        user = userRepository.save(user);
        String profileId = null;
        if (request.getRole() == Role.PATIENT) {
            profileId = createPatientProfile(user, request);
        } else if (request.getRole() == Role.DOCTOR) {
            profileId = createDoctorProfile(user, request);
        }
        UserPrincipal principal = new UserPrincipal(user);
        String token = tokenProvider.generateToken(principal);
        return AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .profileId(profileId)
                .build();
    }
    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("User not found"));
        String profileId = resolveProfileId(user);
        UserPrincipal principal = new UserPrincipal(user);
        String token = tokenProvider.generateToken(principal);
        return AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .profileId(profileId)
                .build();
    }
    private String createPatientProfile(User user, RegisterRequest request) {
        Patient patient = Patient.builder()
                .userId(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(request.getPhone())
                .dateOfBirth(request.getDateOfBirth())
                .bloodGroup(request.getBloodGroup())
                .address(request.getAddress())
                .build();
        return patientRepository.save(patient).getId();
    }
    private String createDoctorProfile(User user, RegisterRequest request) {
        String deptName = "General";
        if (request.getDepartmentId() != null) {
            deptName = departmentRepository.findById(request.getDepartmentId())
                    .map(Department::getName)
                    .orElse("General");
        }
        List<String> defaultSlots = Arrays.asList("09:00", "10:00", "11:00", "14:00", "15:00", "16:00");
        Doctor doctor = Doctor.builder()
                .userId(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(request.getPhone())
                .specialization(request.getSpecialization() != null ? request.getSpecialization() : "General Medicine")
                .departmentId(request.getDepartmentId())
                .departmentName(deptName)
                .experienceYears(request.getExperienceYears() != null ? request.getExperienceYears() : 1)
                .available(true)
                .availableSlots(defaultSlots)
                .build();
        return doctorRepository.save(doctor).getId();
    }
    private String resolveProfileId(User user) {
        if (user.getRole() == Role.DOCTOR) {
            return doctorRepository.findByUserId(user.getId()).map(Doctor::getId).orElse(null);
        }
        if (user.getRole() == Role.PATIENT) {
            return patientRepository.findByUserId(user.getId()).map(Patient::getId).orElse(null);
        }
        return null;
    }
}
