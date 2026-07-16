# API Documentation — CodeArena + ClassConnect

Base URL: `http://localhost:8080`

## Authentication

All endpoints except `/api/auth/**` and `/api/public/**` require a JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

### Signup
```
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response 200:
{
  "success": true,
  "message": "Account created",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "email": "john@example.com",
    "name": "John Doe",
    "avatar": "🙂",
    "role": "STUDENT"
  }
}
```

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response 200:
{
  "success": true,
  "message": "Logged in",
  "data": { "token": "...", "email": "...", "name": "...", "avatar": "...", "role": "STUDENT" }
}
```

### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "message": "OK",
  "data": { "email": "...", "name": "...", "avatar": "...", "role": "STUDENT" }
}
```

## Coding Problems

### List Problems
```
GET /api/problems?domain=java&difficulty=easy

Response 200:
{
  "success": true,
  "message": "OK",
  "data": [
    {
      "id": "j1",
      "domain": "java",
      "title": "Two Sum",
      "difficulty": "easy",
      "topic": "Arrays",
      "points": 10,
      "description": "...",
      "sampleInput": "...",
      "sampleOutput": "...",
      "starterCode": "function solve(nums, target) { ... }",
      "mode": "js"
    }
  ]
}
```

### Get Problem by ID
```
GET /api/problems/{id}

Response 200: { "success": true, "message": "OK", "data": { ... } }
```

### Create Problem (Admin)
```
POST /api/problems
Authorization: Bearer <admin-token>
Content-Type: application/json

{ "id": "j5", "domain": "java", "title": "...", "difficulty": "medium", ... }
```

## Submissions

### Submit Code
```
POST /api/submissions
Authorization: Bearer <token>
Content-Type: application/json

{
  "problemId": "j1",
  "code": "function solve(nums, target) { ... }",
  "language": "javascript"
}

Response 200: { "success": true, "message": "Submitted", "data": { ... } }
```

### Get My Submissions
```
GET /api/submissions/mine
Authorization: Bearer <token>

Response 200: { "success": true, "message": "OK", "data": [ ... ] }
```

## Courses

### Create Course (Teacher)
```
POST /api/courses
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Data Structures",
  "description": "Learn arrays, trees, graphs"
}

Response 200:
{
  "success": true,
  "message": "Course created",
  "data": {
    "id": 1,
    "title": "Data Structures",
    "description": "Learn arrays, trees, graphs",
    "code": "ABC123",
    "teacher": { ... },
    "students": [],
    "createdAt": "2026-07-17T00:00:00"
  }
}
```

### List All Courses
```
GET /api/courses
Authorization: Bearer <token>

Response 200: { "success": true, "message": "OK", "data": [ ... ] }
```

### Get Course by ID
```
GET /api/courses/{id}
Authorization: Bearer <token>
```

### Join Course
```
POST /api/courses/join
Authorization: Bearer <token>
Content-Type: application/json

{ "code": "ABC123" }

Response 200: { "success": true, "message": "Joined course", "data": { ... } }
```

## Assignments

### Create Assignment (Teacher)
```
POST /api/assignments
Authorization: Bearer <token>
Content-Type: application/json

{
  "courseId": 1,
  "title": "Binary Trees Exercise",
  "description": "Implement inorder traversal",
  "maxScore": 100,
  "dueDate": "2026-08-15T23:59:00"
}
```

### Get Assignments by Course
```
GET /api/assignments/course/{courseId}
Authorization: Bearer <token>
```

### Submit Assignment
```
POST /api/assignments/{id}/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "My solution for this assignment...",
  "filePath": null
}
```

### Grade Submission (Teacher)
```
POST /api/assignments/grade/{submissionId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "score": 85,
  "feedback": "Good work on recursion but missing base case."
}
```

### Get Assignment Submissions
```
GET /api/assignments/{id}/submissions
Authorization: Bearer <token>
```

### Get Assignment Analytics
```
GET /api/assignments/{id}/analytics
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "message": "OK",
  "data": {
    "totalSubmissions": 12,
    "maxScore": 100,
    "averageScore": 78.5,
    "gradedCount": 10
  }
}
```

## Quiz

### List Quiz Questions
```
GET /api/quiz?domain=java
Authorization: Bearer <token>
```

### Submit Quiz Answers
```
POST /api/quiz/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "q1": 2,
  "q2": 1,
  "q3": 1
}

Response 200:
{
  "success": true,
  "message": "Quiz submitted",
  "data": {
    "score": 3,
    "total": 3,
    "percentage": 100,
    "details": { ... }
  }
}
```

## Leaderboard

### Get Global Leaderboard (Public)
```
GET /api/public/leaderboard

Response 200:
{
  "success": true,
  "message": "OK",
  "data": [
    { "name": "Ishaan Verma", "avatar": "🧑‍🚀", "points": 2840, "solved": 118 },
    { "name": "Priya Nair", "avatar": "👩‍💻", "points": 2615, "solved": 104 }
  ]
}
```

## Error Responses

All errors return:
```json
{
  "success": false,
  "message": "Human-readable error description",
  "data": null
}
```

HTTP status codes:
- `200` — Success
- `400` — Bad request / validation error
- `401` — Unauthorized (no or invalid token)
- `403` — Forbidden (insufficient role)
- `500` — Internal server error

## Data Seeder

On first startup, the app seeds:
- 2 demo users: `demo@codearena.io` / `demo123` (student), `teacher@codearena.io` / `teacher123` (teacher)
- 18 coding problems across Java, Python, C, MongoDB, SQL
- 6 quiz questions across all domains
