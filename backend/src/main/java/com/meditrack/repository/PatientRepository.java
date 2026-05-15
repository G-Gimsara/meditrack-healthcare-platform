package com.meditrack.repository;

import com.meditrack.model.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface PatientRepository extends MongoRepository<Patient, String> {
    Optional<Patient> findByUserId(String userId);
    List<Patient> findByFullNameContainingIgnoreCase(String name);
}
