package com.platform.controller;

import com.platform.dto.ApiResponse;
import com.platform.model.Problem;
import com.platform.repository.ProblemRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/problems")
public class AdminProblemController {

    private final ProblemRepository problemRepository;

    public AdminProblemController(ProblemRepository problemRepository) {
        this.problemRepository = problemRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Problem>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok("OK", problemRepository.findAll()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Problem>> create(@RequestBody Map<String, Object> body) {
        Problem p = new Problem();
        p.setId((String) body.get("id"));
        p.setDomain((String) body.get("domain"));
        p.setTitle((String) body.get("title"));
        p.setDifficulty((String) body.get("difficulty"));
        p.setTopic((String) body.getOrDefault("topic", ""));
        p.setPoints(Integer.parseInt(body.getOrDefault("points", "10").toString()));
        p.setMode((String) body.getOrDefault("mode", "js"));
        p.setDescription((String) body.getOrDefault("description", ""));
        p.setSampleInput((String) body.getOrDefault("sampleInput", ""));
        p.setSampleOutput((String) body.getOrDefault("sampleOutput", ""));
        p.setConstraints((String) body.getOrDefault("constraints", ""));
        p.setStarterCode((String) body.getOrDefault("starterCode", ""));
        p.setTestCasesJson((String) body.getOrDefault("testCasesJson", "[]"));
        Problem saved = problemRepository.save(p);
        return ResponseEntity.ok(ApiResponse.ok("Problem created", saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody Map<String, Object> body) {
        Problem p = problemRepository.findById(id).orElse(null);
        if (p == null) return ResponseEntity.status(404).body(Map.of("error", "Problem not found"));
        if (body.containsKey("title")) p.setTitle((String) body.get("title"));
        if (body.containsKey("domain")) p.setDomain((String) body.get("domain"));
        if (body.containsKey("difficulty")) p.setDifficulty((String) body.get("difficulty"));
        if (body.containsKey("topic")) p.setTopic((String) body.get("topic"));
        if (body.containsKey("points")) p.setPoints(Integer.parseInt(body.get("points").toString()));
        if (body.containsKey("mode")) p.setMode((String) body.get("mode"));
        if (body.containsKey("description")) p.setDescription((String) body.get("description"));
        if (body.containsKey("sampleInput")) p.setSampleInput((String) body.get("sampleInput"));
        if (body.containsKey("sampleOutput")) p.setSampleOutput((String) body.get("sampleOutput"));
        if (body.containsKey("constraints")) p.setConstraints((String) body.get("constraints"));
        if (body.containsKey("starterCode")) p.setStarterCode((String) body.get("starterCode"));
        if (body.containsKey("testCasesJson")) p.setTestCasesJson((String) body.get("testCasesJson"));
        Problem saved = problemRepository.save(p);
        return ResponseEntity.ok(ApiResponse.ok("Problem updated", saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        if (!problemRepository.existsById(id))
            return ResponseEntity.status(404).body(Map.of("error", "Problem not found"));
        problemRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.ok("Problem deleted", null));
    }
}
