package com.platform.controller;

import com.platform.dto.ApiResponse;
import com.platform.model.Problem;
import com.platform.service.ProblemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/problems")
public class ProblemController {

    private final ProblemService problemService;

    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Problem>>> getAll(
            @RequestParam(required = false) String domain,
            @RequestParam(required = false) String difficulty) {
        List<Problem> problems;
        if (domain != null && difficulty != null) {
            problems = problemService.getByDomainAndDifficulty(domain, difficulty);
        } else if (domain != null) {
            problems = problemService.getByDomain(domain);
        } else {
            problems = problemService.getAllProblems();
        }
        return ResponseEntity.ok(ApiResponse.ok("OK", problems));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Problem>> getById(@PathVariable String id) {
        Problem problem = problemService.getById(id);
        return ResponseEntity.ok(ApiResponse.ok("OK", problem));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Problem>> create(@RequestBody Problem problem) {
        Problem saved = problemService.save(problem);
        return ResponseEntity.ok(ApiResponse.ok("Problem created", saved));
    }
}
