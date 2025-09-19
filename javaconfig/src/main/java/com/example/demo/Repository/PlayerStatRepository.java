package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Player;
import com.example.demo.Entity.PlayerStat;
import com.example.demo.Entity.PlayerStatId;

import java.util.List;

public interface PlayerStatRepository extends JpaRepository<PlayerStat, PlayerStatId> {
    List<PlayerStat> findByPlayer(Player player);

    List<PlayerStat> findById_PlayerId(Integer playerId);
}