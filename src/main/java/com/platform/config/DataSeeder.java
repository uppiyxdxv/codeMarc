package com.platform.config;

import com.platform.model.Problem;
import com.platform.model.Quiz;
import com.platform.model.User;
import com.platform.repository.ProblemRepository;
import com.platform.repository.QuizRepository;
import com.platform.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ProblemRepository problemRepository;
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(ProblemRepository problemRepository, QuizRepository quizRepository,
                      UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.problemRepository = problemRepository;
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedDemoUser();
        seedProblems();
        seedQuizzes();
    }

    private void seedDemoUser() {
        if (!userRepository.existsByEmail("demo@codearena.io")) {
            User user = new User("Demo Learner", "demo@codearena.io", passwordEncoder.encode("demo123"));
            user.setAvatar("🧑‍💻");
            user.setRole(User.Role.STUDENT);
            userRepository.save(user);
        }
        if (!userRepository.existsByEmail("teacher@codearena.io")) {
            User teacher = new User("Professor Smith", "teacher@codearena.io", passwordEncoder.encode("teacher123"));
            teacher.setAvatar("👩‍🏫");
            teacher.setRole(User.Role.TEACHER);
            userRepository.save(teacher);
        }
        if (!userRepository.existsByEmail("pallolla.upendra@gmail.com")) {
            User admin = new User("Upendra Admin", "pallolla.upendra@gmail.com", passwordEncoder.encode("Uppiyxdxv@2004"));
            admin.setAvatar("👨‍💼");
            admin.setRole(User.Role.ADMIN);
            userRepository.save(admin);
        }
    }

    private void seedProblems() {
        if (problemRepository.count() > 0) return;

        String[][] raw = {
            {"j1","java","Two Sum","easy","Arrays","10","js","Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.","[2,7,11,15], target = 9","[0,1]","2 <= nums.length <= 10^4","function solve(nums, target) {\n  \n}"},
            {"j2","java","Reverse a String","easy","Strings","10","js","Reverse a string without using the built-in reverse method.","\"hello\"","\"olleh\"","1 <= s.length <= 10^5","function solve(s) {\n  \n}"},
            {"j3","java","Valid Palindrome","medium","Strings","20","js","Determine if a string is a palindrome considering only alphanumeric characters.","\"A man, a plan, a canal: Panama\"","true","1 <= s.length <= 2*10^5","function solve(s) {\n  \n}"},
            {"j4","java","Longest Substring Without Repeating Characters","hard","Strings","35","js","Find the length of the longest substring without repeating characters.","\"abcabcbb\"","3","0 <= s.length <= 5*10^4","function solve(s) {\n  \n}"},
            {"p1","python","FizzBuzz","easy","Logic","10","js","Return an array of strings for numbers 1..n. Multiples of 3 -> Fizz, of 5 -> Buzz.","n = 5","[\"1\",\"2\",\"Fizz\",\"4\",\"Buzz\"]","1 <= n <= 10^4","function solve(n) {\n  \n}"},
            {"p2","python","Count Vowels","easy","Strings","10","js","Count the number of vowels (a,e,i,o,u) in a string.","\"Hello World\"","3","1 <= s.length <= 10^5","function solve(s) {\n  \n}"},
            {"p3","python","Anagram Check","medium","Strings","20","js","Determine whether two strings are anagrams.","\"listen\", \"silent\"","true","1 <= length <= 10^4","function solve(a, b) {\n  \n}"},
            {"p4","python","Longest Common Prefix","hard","Strings","35","js","Find the longest common prefix string amongst an array of strings.","[\"flower\",\"flow\",\"flight\"]","\"fl\"","1 <= strs.length <= 200","function solve(strs) {\n  \n}"},
            {"c1","c","Sum of Array Elements","easy","Arrays","10","js","Return the sum of all elements in an integer array.","[1,2,3,4]","10","0 <= arr.length <= 10^5","function solve(arr) {\n  \n}"},
            {"c2","c","Find Duplicate in Array","medium","Arrays","20","js","Given an array containing n+1 integers in [1,n], find the duplicate.","[1,3,4,2,2]","2","2 <= arr.length <= 10^5","function solve(arr) {\n  \n}"},
            {"c3","c","Matrix Transpose","hard","Arrays","35","js","Given a 2D matrix, return its transpose.","[[1,2,3],[4,5,6]]","[[1,4],[2,5],[3,6]]","1 <= rows, cols <= 100","function solve(matrix) {\n  \n}"},
            {"m1","mongodb","Employees Earning Above 50000","easy","Query","12","mongo","Find all employees with salary greater than 50000.","db.employees.find({...})","Docs where salary > 50000","Fields: name, department, salary, age","{ salary: { $gt: 50000 } }"},
            {"m2","mongodb","Engineering Department","easy","Query","12","mongo","Find employees in the Engineering department.","db.employees.find({...})","Docs where department == Engineering","Fields: name, department, salary, age","{ department: \"Engineering\" }"},
            {"m3","mongodb","Employees Aged 25-35","medium","Query","20","mongo","Find employees aged 25-35 (inclusive).","db.employees.find({...})","Docs where 25 <= age <= 35","Fields: name, department, salary, age","{ age: { $gte: 25, $lte: 35 } }"},
            {"s1","sql","Select High Earners","easy","Query","12","sql","Select all columns for employees with salary > 50000.","Table: employees(id, name, ...)","Rows where salary > 50000","Table: employees","SELECT * FROM employees WHERE salary > 50000;"},
            {"s2","sql","Count Per Department","medium","Aggregation","22","sql","Count the number of employees in each department.","Table: employees(id, name, ...)","department, count","Table: employees","SELECT department, COUNT(*) FROM employees GROUP BY department;"},
            {"s3","sql","Top 3 Highest Paid","medium","Sorting","22","sql","Select the top 3 highest paid employees.","Table: employees(id, name, ...)","3 rows, highest first","Table: employees","SELECT * FROM employees ORDER BY salary DESC LIMIT 3;"},
            {"s4","sql","Names Starting With A","hard","Pattern Matching","32","sql","Find employees whose name starts with 'A' using LIKE.","Table: employees(id, name, ...)","Rows where name LIKE 'A%'","Table: employees","SELECT * FROM employees WHERE name LIKE 'A%';"},
        };

        for (String[] r : raw) {
            Problem p = new Problem();
            p.setId(r[0]); p.setDomain(r[1]); p.setTitle(r[2]); p.setDifficulty(r[3]);
            p.setTopic(r[4]); p.setPoints(Integer.parseInt(r[5])); p.setMode(r[6]);
            p.setDescription(r[7]); p.setSampleInput(r[8]); p.setSampleOutput(r[9]);
            p.setConstraints(r[10]); p.setStarterCode(r[11]);
            p.setTestCasesJson("[]");
            problemRepository.save(p);
        }
    }

    private void seedQuizzes() {
        if (quizRepository.count() > 0) return;

        Quiz q1 = new Quiz(); q1.setId("q1"); q1.setDomain("java");
        q1.setQuestion("What is the output of: int x = 5; int y = x++ + ++x; System.out.println(y);");
        q1.setCode("int x = 5;\nint y = x++ + ++x;\nSystem.out.println(y);");
        q1.setOptionsJson("[\"10\",\"11\",\"12\",\"9\"]"); q1.setCorrectIndex(2);
        q1.setExplanation("x++ uses 5 then increments to 6; ++x increments to 7 then uses 7. 5 + 7 = 12.");
        quizRepository.save(q1);

        Quiz q2 = new Quiz(); q2.setId("q2"); q2.setDomain("python");
        q2.setQuestion("Which data structure does Python use to implement a dictionary internally?");
        q2.setCode("d = {\"a\": 1, \"b\": 2}");
        q2.setOptionsJson("[\"Linked List\",\"Hash Table\",\"Binary Tree\",\"Array\"]"); q2.setCorrectIndex(1);
        q2.setExplanation("Python dicts are implemented as hash tables, giving O(1) average lookup.");
        quizRepository.save(q2);

        Quiz q3 = new Quiz(); q3.setId("q3"); q3.setDomain("sql");
        q3.setQuestion("Which clause filters rows AFTER aggregation (e.g. after GROUP BY)?");
        q3.setCode("SELECT department, COUNT(*) FROM employees GROUP BY department ___ COUNT(*) > 5;");
        q3.setOptionsJson("[\"WHERE\",\"HAVING\",\"FILTER\",\"ON\"]"); q3.setCorrectIndex(1);
        q3.setExplanation("HAVING filters aggregated groups; WHERE filters rows before aggregation.");
        quizRepository.save(q3);

        Quiz q4 = new Quiz(); q4.setId("q4"); q4.setDomain("mongodb");
        q4.setQuestion("Which operator matches documents where a field value is >= a given value?");
        q4.setCode("db.employees.find({ salary: { ___: 50000 } })");
        q4.setOptionsJson("[\"$gt\",\"$gte\",\"$eq\",\"$in\"]"); q4.setCorrectIndex(1);
        q4.setExplanation("$gte means greater than or equal to.");
        quizRepository.save(q4);

        Quiz q5 = new Quiz(); q5.setId("q5"); q5.setDomain("c");
        q5.setQuestion("What does this C expression evaluate to? int a = 7, b = 2; printf(\"%d\", a / b);");
        q5.setCode("int a = 7, b = 2;\nprintf(\"%d\", a / b);");
        q5.setOptionsJson("[\"3.5\",\"3\",\"4\",\"Error\"]"); q5.setCorrectIndex(1);
        q5.setExplanation("Integer division truncates toward zero: 7/2 = 3.");
        quizRepository.save(q5);

        Quiz q6 = new Quiz(); q6.setId("q6"); q6.setDomain("java");
        q6.setQuestion("Which keyword prevents a class from being subclassed in Java?");
        q6.setCode("___ class Vehicle { }");
        q6.setOptionsJson("[\"static\",\"const\",\"final\",\"sealed\"]"); q6.setCorrectIndex(2);
        q6.setExplanation("\"final\" on a class prevents inheritance.");
        quizRepository.save(q6);
    }
}
