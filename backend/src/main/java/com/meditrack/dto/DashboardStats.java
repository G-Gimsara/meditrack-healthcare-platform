package com.meditrack.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStats {
    private long totalPatients;
    private long totalDoctors;
    private long totalAppointments;
    private long pendingAppointments;
    private long todayAppointments;
    private Map<String, Long> appointmentsByStatus;
    private Map<String, Long> appointmentsByDepartment;
}
