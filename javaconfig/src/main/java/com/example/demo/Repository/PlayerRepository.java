package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Player;

import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Integer> {
    List<Player> findByFullNameContainingIgnoreCase(String keyword);

    List<Player> findByRatingBetween(Byte min, Byte max);
}