package com.example.demo.Configuration;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}

@Data
class LoginResponse {
    private String message;
    private String username;
    private String email;
    private String role;

    public LoginResponse(String message, String username, String email, String role) {
        this.message = message;
        this.username = username;
        this.email = email;
        this.role = role;
    }
}