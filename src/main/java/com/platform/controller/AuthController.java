package com.platform.controller;

import com.platform.dto.*;
import com.platform.model.User;
import com.platform.repository.UserRepository;
import com.platform.service.JwtService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<AuthResponse>> signup(@Valid @RequestBody SignupRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Email already registered"));
        }
        User user = new User(req.getName(), req.getEmail(), passwordEncoder.encode(req.getPassword()));
        userRepository.save(user);
        String token = jwtService.generateToken(user.getEmail());
        return ResponseEntity.ok(ApiResponse.ok("Account created", new AuthResponse(token, user.getEmail(),
                user.getName(), user.getAvatar(), user.getRole().name())));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElse(null);
        if (user == null || !passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Invalid email or password"));
        }
        String token = jwtService.generateToken(user.getEmail());
        return ResponseEntity.ok(ApiResponse.ok("Logged in", new AuthResponse(token, user.getEmail(),
                user.getName(), user.getAvatar(), user.getRole().name())));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<AuthResponse>> me(@RequestAttribute(value = "email", required = false) String email) {
        if (email == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Not authenticated"));
        }
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("User not found"));
        }
        return ResponseEntity.ok(ApiResponse.ok("OK", new AuthResponse(null, user.getEmail(),
                user.getName(), user.getAvatar(), user.getRole().name())));
    }
}
