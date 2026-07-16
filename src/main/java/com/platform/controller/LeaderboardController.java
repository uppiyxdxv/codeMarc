package com.platform.controller;

import com.platform.dto.ApiResponse;
import com.platform.model.User;
import com.platform.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/public/leaderboard")
public class LeaderboardController {

    private final UserRepository userRepository;

    public LeaderboardController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<LeaderboardEntry>>> getLeaderboard() {
        List<User> users = userRepository.findAll();
        List<LeaderboardEntry> entries = users.stream()
                .map(u -> new LeaderboardEntry(u.getName(), u.getAvatar(), u.getPoints(), u.getSolvedProblems().size()))
                .sorted((a, b) -> b.points - a.points)
                .limit(50)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.ok("OK", entries));
    }

    public record LeaderboardEntry(String name, String avatar, int points, int solved) {}
}
