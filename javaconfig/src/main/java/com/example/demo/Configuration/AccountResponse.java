package com.example.demo.Configuration;

import java.util.List;

import lombok.Data;

@Data
public class AccountResponse {
    private Long accountId;
    private String email;
    private String username;
    private List<String> roles;
}