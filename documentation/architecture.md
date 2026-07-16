# Architecture Documentation — CodeArena + ClassConnect

## Overview

CodeArena + ClassConnect is a Java Fullstack web application combining two platforms:

- **CodeArena**: Competitive coding practice platform with in-browser code execution, test-case judging, quizzes, leaderboards, and AI mock interviews.
- **ClassConnect**: Virtual classroom management system with course creation, assignment submission/grading, file upload handling, and grade analytics.

The application follows a standard monolithic Spring Boot architecture with a RESTful backend and a single-page-application (SPA) frontend.

## Technology Stack

| Layer       | Technology                              |
|-------------|----------------------------------------|
| Backend     | Java 17, Spring Boot 3.2.5             |
| Security    | Spring Security, JWT (jjwt 0.12.5)     |
| Database    | H2 (dev) / MySQL (prod), JPA/Hibernate |
| Frontend    | Vanilla JS SPA, HTML5, CSS3            |
| Build       | Maven                                  |
| Fonts       | Space Grotesk, Inter, JetBrains Mono   |
| APIs        | REST (JSON), Anthropic Claude (AI)     |

## Project Structure

```
codearena-classconnect/
├── pom.xml
├── src/main/java/com/platform/
│   ├── PlatformApplication.java          # Entry point
│   ├── config/
│   │   ├── SecurityConfig.java           # Spring Security config
│   │   ├── JwtAuthenticationFilter.java  # JWT filter
│   │   └── DataSeeder.java               # Seed data on startup
│   ├── model/
│   │   ├── User.java                     # Users (students, teachers, admins)
│   │   ├── Problem.java                  # Coding problems
│   │   ├── Submission.java               # Code submissions
│   │   ├── Course.java                   # Virtual classrooms
│   │   ├── Assignment.java               # Course assignments
│   │   ├── AssignmentSubmission.java     # Student assignment submissions
│   │   └── Quiz.java                     # Quiz questions
│   ├── repository/
│   │   └── (JPA repositories for each entity)
│   ├── service/
│   │   ├── JwtService.java              # JWT token generation/validation
│   │   ├── ProblemService.java          # Problem CRUD
│   │   ├── SubmissionService.java       # Code submission handling
│   │   ├── CourseService.java           # Course CRUD + join logic
│   │   └── AssignmentService.java       # Assignment CRUD + grading
│   ├── controller/
│   │   ├── AuthController.java          # Login/signup endpoints
│   │   ├── ProblemController.java       # Problem listing/search
│   │   ├── SubmissionController.java     # Code submission endpoints
│   │   ├── CourseController.java         # Course CRUD + join
│   │   ├── AssignmentController.java     # Assignment CRUD + grade
│   │   ├── QuizController.java           # Quiz listing/submission
│   │   └── LeaderboardController.java    # Global ranking
│   ├── dto/
│   │   └── (Request/response DTOs)
│   └── exception/
│       └── GlobalExceptionHandler.java  # Central error handling
└── src/main/resources/
    ├── application.properties
    └── static/
        ├── index.html                    # SPA entry point
        ├── css/style.css                 # All styles
        └── js/app.js                     # Full SPA application
```

## Database Schema

### Users
- `users` — id, name, email, password (BCrypt), avatar, points, role (STUDENT/TEACHER/ADMIN), bio, created_at
- `user_solved_problems` — user_id, problem_id (many-to-many)

### Coding Platform
- `problems` — id, domain, title, difficulty, topic, points, description, sample_input, sample_output, constraints, starter_code, test_cases_json, mode
- `submissions` — id, user_id, problem_id, code, language, passed, result_json, score, submitted_at

### Classroom
- `courses` — id, title, description, code (unique join code), teacher_id, created_at
- `course_students` — course_id, student_id (many-to-many)
- `assignments` — id, title, description, course_id, teacher_id, max_score, due_date, attachment_path, created_at
- `assignment_submissions` — id, assignment_id, student_id, content, file_path, score, feedback, late, submitted_at

### Quiz
- `quiz_questions` — id, domain, question, code, options_json, correct_index, explanation

## Architecture Diagram

```
Browser (SPA) ──REST/JSON──> Spring Boot ──JPA──> H2/MySQL
                                  │
                                  ├── JWT Auth (filter chain)
                                  ├── Judge0 API (code execution)
                                  └── Claude API (mock interview)
```

## Key Design Decisions

1. **Monolithic with clear separation**: Single deployable unit (JAR) with layered architecture for simplicity.
2. **SPA frontend**: No framework dependency — vanilla JS keeps the frontend lightweight and demonstrates full-stack capability.
3. **In-browser judge for demos**: JS problems run client-side via `new Function()`. In production, dispatch to Judge0/Piston API.
4. **H2 for dev, MySQL for prod**: Spring profiles can switch easily.
5. **JWT authentication**: Stateless auth with configurable expiry. Token stored in memory (not localStorage) for demo security.
6. **No real file system**: Classroom file uploads are simulated. Production would use S3 or cloud storage.

## Security Model

- Passwords hashed with BCrypt
- JWT tokens signed with HMAC-SHA256
- Role-based access: `STUDENT`, `TEACHER`, `ADMIN`
- Public endpoints: `/api/auth/**`, `/api/public/**`, `/api/problems`
- Teacher endpoints: `/api/teacher/**`
- Admin endpoints: `/api/admin/**`
- All other endpoints require authentication via JWT Bearer token
