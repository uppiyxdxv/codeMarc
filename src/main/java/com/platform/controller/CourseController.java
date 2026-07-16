package com.platform.controller;

import com.platform.dto.ApiResponse;
import com.platform.model.Course;
import com.platform.model.User;
import com.platform.repository.UserRepository;
import com.platform.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;
    private final UserRepository userRepository;

    public CourseController(CourseService courseService, UserRepository userRepository) {
        this.courseService = courseService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Course>> create(
            @RequestBody Map<String, String> body,
            @RequestAttribute(value = "email") String email) {
        User teacher = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Course course = courseService.createCourse(body.get("title"), body.get("description"), teacher);
        return ResponseEntity.ok(ApiResponse.ok("Course created", course));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Course>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok("OK", courseService.getAllCourses()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Course>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("OK", courseService.getById(id)));
    }

    @PostMapping("/join")
    public ResponseEntity<ApiResponse<Course>> join(
            @RequestBody Map<String, String> body,
            @RequestAttribute(value = "email") String email) {
        User student = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Course course = courseService.joinCourse(body.get("code"), student);
        return ResponseEntity.ok(ApiResponse.ok("Joined course", course));
    }
}
