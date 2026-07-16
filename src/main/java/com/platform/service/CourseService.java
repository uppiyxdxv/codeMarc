package com.platform.service;

import com.platform.model.Course;
import com.platform.model.User;
import com.platform.repository.CourseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Course createCourse(String title, String description, User teacher) {
        Course course = new Course();
        course.setTitle(title);
        course.setDescription(description);
        course.setTeacher(teacher);
        course.setCode(generateCode());
        return courseRepository.save(course);
    }

    public Course getById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found: " + id));
    }

    public List<Course> getByTeacher(Long teacherId) {
        return courseRepository.findByTeacherId(teacherId);
    }

    @Transactional
    public Course joinCourse(String code, User student) {
        List<Course> courses = courseRepository.findByCode(code.trim().toUpperCase());
        if (courses.isEmpty()) {
            throw new RuntimeException("No course found with code: " + code);
        }
        Course course = courses.get(0);
        course.getStudents().add(student);
        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    private String generateCode() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            code.append(chars.charAt((int) (Math.random() * chars.length())));
        }
        return code.toString();
    }
}
