package com.example.demo.Configuration;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Account;
import com.example.demo.Entity.AccountRole;
import com.example.demo.Entity.Role;
import com.example.demo.Entity.User;
import com.example.demo.Repository.AccountRepository;
import com.example.demo.Repository.AccountRoleRepository;
import com.example.demo.Repository.RoleRepository;
import com.example.demo.Repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AccountRepository accountRepository;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AccountRoleRepository accountRoleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        // 1. Tạo user
        User user = new User();
        user.setUsername(request.getUsername());
        user = userRepository.save(user);

        // 2. Tạo account
        Account account = new Account();
        account.setUser(user);
        account.setEmail(request.getEmail());
        account.setPasswordHash(passwordEncoder.encode(request.getPassword())); // hash tại đây
        account.setCreatedAt(LocalDateTime.now());
        account.setIsActive(true);
        account.setIsAdmin(false);
        account = accountRepository.save(account);

        Role userRole = roleRepository.findByRoleName("USER")
                .orElseThrow(() -> new RuntimeException("Role USER not found"));

        AccountRole accountRole = new AccountRole(account, userRole);
        accountRoleRepository.save(accountRole);

        return "User registered successfully with role USER";
    }
}
