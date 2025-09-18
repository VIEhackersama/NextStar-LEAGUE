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
    private JwtUtil jwtUtil;    
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
        User user = new User();
        user.setUsername(request.getUsername());
        user = userRepository.save(user);

        Account account = new Account();
        account.setUser(user);
        account.setEmail(request.getEmail());
        account.setPasswordHash(passwordEncoder.encode(request.getPassword())); 
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
    
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        // Tìm account theo email
        Account account = accountRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        // Kiểm tra password
        if (!passwordEncoder.matches(request.getPassword(), account.getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }

        if (!account.getIsActive()) {
            throw new RuntimeException("Account is inactive");
        }

        // Cập nhật last login
        account.setLastLogin(LocalDateTime.now());
        accountRepository.save(account);

        // Tạo JWT token
        String token = jwtUtil.generateToken(account.getEmail());

        return new LoginResponse(
                token,
                account.getEmail(),
                account.getUser().getUsername());
    }

}
