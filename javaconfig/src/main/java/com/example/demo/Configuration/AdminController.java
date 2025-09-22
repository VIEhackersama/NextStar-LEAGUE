package com.example.demo.Configuration;

import com.example.demo.Entity.Account;
import com.example.demo.Repository.AccountRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AccountRepository accountRepository;

    public AdminController(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    private void ensureAdmin() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = (auth != null) ? auth.getName() : null; // userDetailsService username = email
        Account me = accountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        if (me.getIsAdmin() == null || !me.getIsAdmin()) {
            throw new RuntimeException("Forbidden: admin only");
        }
    }

    // ======== READ ALL ========
    @GetMapping("/accounts")
    public List<Account> listAccounts() {
        ensureAdmin();
        return accountRepository.findAll();
    }

    // ======== READ ONE ========
    @GetMapping("/accounts/{id}")
    public Account getAccount(@PathVariable Integer id) {
        ensureAdmin();
        return accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
    }

    // ======== CREATE ========
    @PostMapping("/accounts")
    public ResponseEntity<Account> createAccount(@RequestBody Account body) {
        ensureAdmin();
        // tối thiểu: yêu cầu email & passwordHash đã mã hoá sẵn nếu tạo thẳng
        Account saved = accountRepository.save(body);
        return ResponseEntity.created(URI.create("/api/admin/accounts/" + saved.getAccountId()))
                .body(saved);
    }

    // ======== UPDATE ========
    @PutMapping("/accounts/{id}")
    public Account updateAccount(@PathVariable Integer id, @RequestBody Account body) {
        ensureAdmin();
        Account exist = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
        // cập nhật các field cho phép
        exist.setEmail(body.getEmail());
        exist.setIsActive(body.getIsActive());
        exist.setIsAdmin(body.getIsAdmin());
        exist.setUser(body.getUser());
        exist.setPasswordHash(body.getPasswordHash()); // chỉ dùng nếu đã hash từ client
        exist.setUpdatedAt(java.time.LocalDateTime.now());
        return accountRepository.save(exist);
    }

    // ======== DELETE ========
    @DeleteMapping("/accounts/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Integer id) {
        ensureAdmin();
        if (!accountRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        accountRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
