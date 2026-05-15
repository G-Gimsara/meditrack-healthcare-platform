package com.meditrack.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AppointmentRequest {

    @NotBlank
    private String doctorId;

    @NotNull
    private LocalDate appointmentDate;

    @NotNull
    private LocalTime appointmentTime;

    @NotBlank
    private String reason;
}
