package com.platform.repository;

import com.platform.model.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProblemRepository extends JpaRepository<Problem, String> {
    List<Problem> findByDomain(String domain);
    List<Problem> findByDomainAndDifficulty(String domain, String difficulty);
    List<Problem> findByDifficulty(String difficulty);
}
