# Setup Guide — CodeArena + ClassConnect

## Prerequisites

- Java 17 or later
- Maven 3.8+
- (Optional) MySQL 8+ for production

## Quick Start (Development)

```bash
# 1. Build the project
cd codearena-classconnect
mvn clean package -DskipTests

# 2. Run the application
java -jar target/codearena-classconnect-1.0.0.jar

# Or using Maven directly:
mvn spring-boot:run
```

The application starts on `http://localhost:8080`.

## Access the Application

Open your browser:

- **Main app**: `http://localhost:8080`
- **H2 Console** (dev): `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:platformdb`
  - User: `sa`
  - Password: *(empty)*

## Demo Credentials

| Role    | Email                     | Password    |
|---------|---------------------------|-------------|
| Student | demo@codearena.io         | demo123     |
| Teacher | teacher@codearena.io      | teacher123  |

## Switching to MySQL (Production)

Edit `src/main/resources/application.properties`:

```properties
# Comment out H2 settings
# spring.datasource.url=jdbc:h2:mem:platformdb
# spring.h2.console.enabled=true

# Uncomment and configure MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/platformdb?useSSL=false&serverTimezone=UTC
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=yourpassword

# Use MySQL dialect
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

Create the database:
```sql
CREATE DATABASE platformdb;
```

## Building for Production

```bash
mvn clean package -DskipTests
# Output: target/codearena-classconnect-1.0.0.jar

# Run with production profile
java -jar target/codearena-classconnect-1.0.0.jar \
  --spring.profiles.active=prod \
  --app.jwt.secret=<your-256-bit-secret> \
  --spring.datasource.url=jdbc:mysql://<host>:3306/platformdb
```

## Configure Judge0 (Code Execution Sandbox)

For production code execution, integrate with Judge0 API:

```properties
app.judge0.url=https://api.judge0.com
app.judge0.api-key=your-api-key-here
```

## Configure Claude API (Mock Interview)

The mock interview feature calls the Anthropic Claude API. No configuration is needed for the demo (uses a simulated response if the API call fails). For production:

```properties
# Add your API key to environment variable or application.properties
# The frontend calls the API directly — in production, proxy through your backend
```

## Frontend Architecture

The frontend is a single-page application served as static files from Spring Boot:

- `src/main/resources/static/index.html` — Entry point
- `src/main/resources/static/css/style.css` — All styles (dark theme)
- `src/main/resources/static/js/app.js` — Full SPA logic

The JS file handles:
- Client-side routing (view switching)
- State management (in-memory)
- Auth (mock in-memory user store with login/signup)
- Code judging (in-browser JS execution, MongoDB mini-engine, SQL pattern-checker)
- Interactive UI (leaderboard, quizzes, assignments, mock interviews)

## Project Features

### CodeArena (Coding Platform)
- 5 domains: Java, Python, C, MongoDB, SQL
- 3 difficulty levels: easy, medium, hard
- Live in-browser code judging for JavaScript problems
- MongoDB query engine (mini in-memory evaluator)
- SQL keyword-pattern checker
- Global leaderboard
- Technical quizzes

### ClassConnect (Classroom)
- Course creation with unique join codes
- Join courses by code
- Assignment creation with due dates
- Student assignment submission
- Teacher grading with feedback
- Submission analytics (count, average, graded ratio)
- Late submission detection

### Additional Features
- AI mock HR interview (powered by Claude)
- Personal dashboard with progress tracking
- User profile settings with avatar selection
- Pricing page (demo)
- Responsive dark-theme UI

## Troubleshooting

**Q: The app doesn't start — port 8080 is in use.**
```bash
# Find and kill the process
netstat -ano | findstr :8080
taskkill /PID <PID> /F
# Or change port in application.properties
```

**Q: H2 console shows blank or error.**
Make sure you're accessing `http://localhost:8080/h2-console` with the correct JDBC URL `jdbc:h2:mem:platformdb`.

**Q: Mock interview shows "API request failed".**
The demo calls the Anthropic Claude API directly from the browser. If you don't have network access to `api.anthropic.com`, the feature gracefully degrades with a fallback set of questions.

**Q: Database tables not created.**
Ensure `spring.jpa.hibernate.ddl-auto=update` is set in application.properties. If using MySQL, ensure the database exists first.

## Running Tests

```bash
mvn test
```

Tests use H2 in-memory database automatically.
