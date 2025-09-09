package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.PlayerStat;
import com.example.demo.Entity.PlayerStatId;

import java.util.List;

public interface PlayerStatRepository extends JpaRepository<PlayerStat, PlayerStatId> {
    List<PlayerStat> findByPlayer_Id(Integer playerId);
}