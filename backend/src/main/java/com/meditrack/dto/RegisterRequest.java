package com.meditrack.dto;

import com.meditrack.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class RegisterRequest {

    @NotBlank @Email
    private String email;

    @NotBlank @Size(min = 6, max = 100)
    private String password;

    @NotBlank
    private String fullName;

    @NotNull
    private Role role;

    private String phone;
    private LocalDate dateOfBirth;
    private String bloodGroup;
    private String address;

    private String specialization;
    private String departmentId;
    private Integer experienceYears;
}
