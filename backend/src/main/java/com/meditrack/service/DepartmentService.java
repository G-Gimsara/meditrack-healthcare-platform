package com.meditrack.service;
import com.meditrack.exception.BadRequestException;
import com.meditrack.exception.ResourceNotFoundException;
import com.meditrack.model.Department;
import com.meditrack.repository.DepartmentRepository;
import com.meditrack.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
@RequiredArgsConstructor
public class DepartmentService {
    private final DepartmentRepository departmentRepository;
    private final DoctorRepository doctorRepository;
    public List<Department> getAll() {
        return departmentRepository.findAll();
    }
    public Department getById(String id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
    }
    public Department create(Department department) {
        if (departmentRepository.existsByNameIgnoreCase(department.getName())) {
            throw new BadRequestException("Department already exists");
        }
        return departmentRepository.save(department);
    }
    public Department update(String id, Department updates) {
        Department dept = getById(id);
        if (updates.getName() != null) dept.setName(updates.getName());
        if (updates.getDescription() != null) dept.setDescription(updates.getDescription());
        if (updates.getFloor() != null) dept.setFloor(updates.getFloor());
        return departmentRepository.save(dept);
    }
    public void delete(String id) {
        long doctorsInDept = doctorRepository.findByDepartmentId(id).size();
        if (doctorsInDept > 0) {
            throw new BadRequestException("Cannot delete department with assigned doctors");
        }
        departmentRepository.deleteById(id);
    }
}
