package com.platform.controller;

import com.platform.dto.ApiResponse;
import com.platform.dto.CodeSubmitRequest;
import com.platform.model.Submission;
import com.platform.model.User;
import com.platform.repository.UserRepository;
import com.platform.service.SubmissionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    private final SubmissionService submissionService;
    private final UserRepository userRepository;

    public SubmissionController(SubmissionService submissionService, UserRepository userRepository) {
        this.submissionService = submissionService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Submission>> submit(
            @Valid @RequestBody CodeSubmitRequest req,
            @RequestAttribute(value = "email") String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Submission submission = submissionService.submit(user, req.getProblemId(), req.getCode(), req.getLanguage());
        return ResponseEntity.ok(ApiResponse.ok("Submitted", submission));
    }

    @GetMapping("/mine")
    public ResponseEntity<ApiResponse<List<Submission>>> mySubmissions(
            @RequestAttribute(value = "email") String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(ApiResponse.ok("OK", submissionService.getUserSubmissions(user.getId())));
    }
}
