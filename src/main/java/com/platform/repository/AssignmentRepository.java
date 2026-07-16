package com.platform.repository;

import com.platform.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByCourseIdOrderByDueDateAsc(Long courseId);
    List<Assignment> findByTeacherId(Long teacherId);
}
