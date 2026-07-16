package com.platform.controller;

import com.platform.dto.ApiResponse;
import com.platform.model.Quiz;
import com.platform.repository.QuizRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    private final QuizRepository quizRepository;

    public QuizController(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Quiz>>> getAll(@RequestParam(required = false) String domain) {
        List<Quiz> quizzes;
        if (domain != null) {
            quizzes = quizRepository.findByDomain(domain);
        } else {
            quizzes = quizRepository.findAll();
        }
        return ResponseEntity.ok(ApiResponse.ok("OK", quizzes));
    }

    @PostMapping("/submit")
    public ResponseEntity<ApiResponse<Map<String, Object>>> submit(@RequestBody Map<String, Integer> answers) {
        int correct = 0;
        int total = answers.size();
        Map<String, Object> details = new HashMap<>();
        for (Map.Entry<String, Integer> entry : answers.entrySet()) {
            Quiz quiz = quizRepository.findById(entry.getKey()).orElse(null);
            boolean isCorrect = quiz != null && quiz.getCorrectIndex() == entry.getValue();
            if (isCorrect) correct++;
            details.put(entry.getKey(), Map.of("correct", isCorrect, "correctIndex", quiz != null ? quiz.getCorrectIndex() : -1));
        }
        Map<String, Object> result = new HashMap<>();
        result.put("score", correct);
        result.put("total", total);
        result.put("percentage", total > 0 ? Math.round((double) correct / total * 100) : 0);
        result.put("details", details);
        return ResponseEntity.ok(ApiResponse.ok("Quiz submitted", result));
    }
}
