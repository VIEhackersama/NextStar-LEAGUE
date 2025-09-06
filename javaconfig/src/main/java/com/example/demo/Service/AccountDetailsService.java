package com.example.demo.Service;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Account;
import org.springframework.security.core.userdetails.User;
import com.example.demo.Repository.AccountRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountDetailsService implements UserDetailsService {

        private final AccountRepository accountRepository;

        @Override
        public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
                Account account = accountRepository.findByEmail(email)
                                .orElseThrow(() -> new UsernameNotFoundException(
                                                "User not found with email: " + email));

                Set<GrantedAuthority> authorities = account.getRoles().stream()
                                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getRoleName()))
                                .collect(Collectors.toSet());

                return User.builder()
                                .username(account.getEmail())
                                .password(account.getPasswordHash()) 
                                .disabled(!account.getIsActive())
                                .authorities(authorities)
                                .build();
        }
}