package com.platform.dto;

public class AuthResponse {
    private String token;
    private String email;
    private String name;
    private String avatar;
    private String role;

    public AuthResponse(String token, String email, String name, String avatar, String role) {
        this.token = token;
        this.email = email;
        this.name = name;
        this.avatar = avatar;
        this.role = role;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
