package com.meditrack.dto;

import com.meditrack.model.AppointmentStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AppointmentStatusUpdate {

    @NotNull
    private AppointmentStatus status;

    private String notes;
}
