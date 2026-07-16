package com.platform.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String avatar = "🙂";

    private int points = 0;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_solved_problems", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "problem_id")
    private Set<String> solvedProblems = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private Role role = Role.STUDENT;

    private String bio;

    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Role {
        STUDENT, TEACHER, ADMIN
    }

    public User() {}

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
    public int getPoints() { return points; }
    public void setPoints(int points) { this.points = points; }
    public Set<String> getSolvedProblems() { return solvedProblems; }
    public void setSolvedProblems(Set<String> solvedProblems) { this.solvedProblems = solvedProblems; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
