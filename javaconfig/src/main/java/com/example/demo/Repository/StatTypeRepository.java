package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.StatType;

import java.util.Optional;

public interface StatTypeRepository extends JpaRepository<StatType, Integer> {
    Optional<StatType> findByCode(String code);
}
