package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Club;

import java.util.Optional;

public interface ClubRepository extends JpaRepository<Club, Integer> {
    Optional<Club> findByName(String name);
}