package com.meditrack.dto;

import com.meditrack.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String userId;
    private String email;
    private String fullName;
    private Role role;
    private String profileId;
}
