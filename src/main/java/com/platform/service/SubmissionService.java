package com.platform.service;

import com.platform.model.Problem;
import com.platform.model.Submission;
import com.platform.model.User;
import com.platform.repository.SubmissionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final ProblemService problemService;

    public SubmissionService(SubmissionRepository submissionRepository, ProblemService problemService) {
        this.submissionRepository = submissionRepository;
        this.problemService = problemService;
    }

    public Submission submit(User user, String problemId, String code, String language) {
        Problem problem = problemService.getById(problemId);
        Submission submission = new Submission();
        submission.setUser(user);
        submission.setProblemId(problemId);
        submission.setCode(code);
        submission.setLanguage(language);

        // In production: dispatch to Judge0 and process results
        // For now, mark as pending with placeholder result
        submission.setPassed(false);
        submission.setScore(0);
        submission.setResultJson("{\"status\":\"pending\",\"message\":\"Submitted for evaluation\"}");

        return submissionRepository.save(submission);
    }

    public List<Submission> getUserSubmissions(Long userId) {
        return submissionRepository.findByUserIdOrderBySubmittedAtDesc(userId);
    }

    public long getUserSolvedCount(Long userId) {
        return submissionRepository.countByUserIdAndPassedTrue(userId);
    }
}
