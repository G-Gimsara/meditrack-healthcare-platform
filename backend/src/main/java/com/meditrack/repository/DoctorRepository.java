package com.meditrack.repository;

import com.meditrack.model.Doctor;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends MongoRepository<Doctor, String> {
    Optional<Doctor> findByUserId(String userId);
    List<Doctor> findByDepartmentId(String departmentId);
    List<Doctor> findByAvailableTrue();
    List<Doctor> findByFullNameContainingIgnoreCase(String name);
}
