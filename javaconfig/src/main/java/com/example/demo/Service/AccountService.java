package com.example.demo.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Account;
import com.example.demo.Repository.AccountRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Account register(Account account, String rawPassword) {
        account.setPasswordHash(passwordEncoder.encode(rawPassword));
        return accountRepository.save(account);
    }

    public Optional<Account> findByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    public boolean login(String email, String rawPassword) {
        Optional<Account> accountOpt = accountRepository.findByEmail(email);
        if (accountOpt.isPresent()) {
            return passwordEncoder.matches(rawPassword, accountOpt.get().getPasswordHash());
        }
        return false;
    }
}
