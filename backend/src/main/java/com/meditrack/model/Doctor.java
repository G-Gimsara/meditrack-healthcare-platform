package com.meditrack.model;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "doctors")
public class Doctor {
    @Id
    private String id;
    @Indexed(unique = true)
    private String userId;
    private String fullName;
    private String email;
    private String phone;
    private String specialization;
    private String departmentId;
    private String departmentName;
    private int experienceYears;
    private String bio;
    private boolean available;

    // time slots shown on booking page
    private List<String> availableSlots;
}
