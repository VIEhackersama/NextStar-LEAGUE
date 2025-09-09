package com.example.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Account;
import com.example.demo.Entity.AccountRole;

public interface AccountRoleRepository extends JpaRepository<AccountRole, Integer> {
    Optional<AccountRole> findByAccount(Account account);
}