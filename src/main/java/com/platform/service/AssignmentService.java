package com.platform.service;

import com.platform.model.*;
import com.platform.repository.AssignmentRepository;
import com.platform.repository.AssignmentSubmissionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final AssignmentSubmissionRepository submissionRepository;

    public AssignmentService(AssignmentRepository assignmentRepository,
                             AssignmentSubmissionRepository submissionRepository) {
        this.assignmentRepository = assignmentRepository;
        this.submissionRepository = submissionRepository;
    }

    public Assignment create(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    public List<Assignment> getByCourse(Long courseId) {
        return assignmentRepository.findByCourseIdOrderByDueDateAsc(courseId);
    }

    public Assignment getById(Long id) {
        return assignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found: " + id));
    }

    public AssignmentSubmission submit(Long assignmentId, User student, String content, String filePath) {
        Assignment assignment = getById(assignmentId);
        AssignmentSubmission submission = new AssignmentSubmission();
        submission.setAssignment(assignment);
        submission.setStudent(student);
        submission.setContent(content);
        submission.setFilePath(filePath);
        if (assignment.getDueDate() != null && LocalDateTime.now().isAfter(assignment.getDueDate())) {
            submission.setLate(true);
        }
        return submissionRepository.save(submission);
    }

    public AssignmentSubmission grade(Long submissionId, int score, String feedback) {
        AssignmentSubmission sub = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new RuntimeException("Submission not found: " + submissionId));
        sub.setScore(score);
        sub.setFeedback(feedback);
        return submissionRepository.save(sub);
    }

    public List<AssignmentSubmission> getSubmissionsForAssignment(Long assignmentId) {
        return submissionRepository.findByAssignmentId(assignmentId);
    }

    public Map<String, Object> getAssignmentAnalytics(Long assignmentId) {
        List<AssignmentSubmission> subs = submissionRepository.findByAssignmentId(assignmentId);
        Assignment assignment = getById(assignmentId);
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalSubmissions", subs.size());
        analytics.put("maxScore", assignment.getMaxScore());
        double avg = subs.stream()
                .filter(s -> s.getScore() != null)
                .mapToInt(AssignmentSubmission::getScore)
                .average().orElse(0);
        analytics.put("averageScore", Math.round(avg * 10.0) / 10.0);
        analytics.put("gradedCount", subs.stream().filter(s -> s.getScore() != null).count());
        return analytics;
    }
}
