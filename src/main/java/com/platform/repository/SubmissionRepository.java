package com.platform.repository;

import com.platform.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByUserIdOrderBySubmittedAtDesc(Long userId);
    List<Submission> findByProblemIdAndUserIdAndPassedTrue(String problemId, Long userId);
    long countByUserId(Long userId);
    long countByUserIdAndPassedTrue(Long userId);
}
