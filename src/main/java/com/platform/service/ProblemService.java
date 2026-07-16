package com.platform.service;

import com.platform.model.Problem;
import com.platform.repository.ProblemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProblemService {

    private final ProblemRepository problemRepository;

    public ProblemService(ProblemRepository problemRepository) {
        this.problemRepository = problemRepository;
    }

    public List<Problem> getAllProblems() {
        return problemRepository.findAll();
    }

    public List<Problem> getByDomain(String domain) {
        return problemRepository.findByDomain(domain);
    }

    public List<Problem> getByDomainAndDifficulty(String domain, String difficulty) {
        return problemRepository.findByDomainAndDifficulty(domain, difficulty);
    }

    public Problem getById(String id) {
        return problemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Problem not found: " + id));
    }

    public Problem save(Problem problem) {
        return problemRepository.save(problem);
    }
}
