package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import com.example.demo.Entity.PlayerStat;
import com.example.demo.Entity.PlayerStatId;

public interface PlayerStatService {
    List<PlayerStat> getAll();

    Optional<PlayerStat> getById(PlayerStatId id);

    PlayerStat save(PlayerStat playerStat);

    void delete(PlayerStatId id);
}