package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.AccountRole;

public interface AccountRoleRepository extends JpaRepository<AccountRole, Integer> {
}