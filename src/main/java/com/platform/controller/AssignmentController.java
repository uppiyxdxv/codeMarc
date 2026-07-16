package com.platform.controller;

import com.platform.dto.ApiResponse;
import com.platform.model.*;
import com.platform.repository.UserRepository;
import com.platform.service.AssignmentService;
import com.platform.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    private final AssignmentService assignmentService;
    private final CourseService courseService;
    private final UserRepository userRepository;

    public AssignmentController(AssignmentService assignmentService, CourseService courseService,
                                UserRepository userRepository) {
        this.assignmentService = assignmentService;
        this.courseService = courseService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Assignment>> create(
            @RequestBody Map<String, Object> body,
            @RequestAttribute(value = "email") String email) {
        User teacher = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Course course = courseService.getById(Long.valueOf(body.get("courseId").toString()));
        Assignment assignment = new Assignment();
        assignment.setTitle((String) body.get("title"));
        assignment.setDescription((String) body.get("description"));
        assignment.setCourse(course);
        assignment.setTeacher(teacher);
        assignment.setMaxScore(Integer.parseInt(body.getOrDefault("maxScore", "100").toString()));
        if (body.containsKey("dueDate") && body.get("dueDate") != null) {
            assignment.setDueDate(LocalDateTime.parse((String) body.get("dueDate")));
        }
        return ResponseEntity.ok(ApiResponse.ok("Assignment created", assignmentService.create(assignment)));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<ApiResponse<List<Assignment>>> getByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(ApiResponse.ok("OK", assignmentService.getByCourse(courseId)));
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<ApiResponse<AssignmentSubmission>> submit(
            @PathVariable Long id,
            @RequestBody Map<String, String> body,
            @RequestAttribute(value = "email") String email) {
        User student = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        AssignmentSubmission sub = assignmentService.submit(id, student, body.get("content"), body.get("filePath"));
        return ResponseEntity.ok(ApiResponse.ok("Submitted", sub));
    }

    @PostMapping("/grade/{submissionId}")
    public ResponseEntity<ApiResponse<AssignmentSubmission>> grade(
            @PathVariable Long submissionId,
            @RequestBody Map<String, Object> body) {
        int score = Integer.parseInt(body.get("score").toString());
        String feedback = (String) body.get("feedback");
        return ResponseEntity.ok(ApiResponse.ok("Graded", assignmentService.grade(submissionId, score, feedback)));
    }

    @GetMapping("/{id}/submissions")
    public ResponseEntity<ApiResponse<List<AssignmentSubmission>>> getSubmissions(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("OK", assignmentService.getSubmissionsForAssignment(id)));
    }

    @GetMapping("/{id}/analytics")
    public ResponseEntity<ApiResponse<Map<String, Object>>> analytics(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("OK", assignmentService.getAssignmentAnalytics(id)));
    }
}
