package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import com.example.demo.Entity.Player;

public interface PlayerService {
    List<Player> getAll();

    Optional<Player> getById(Integer id);

    Player save(Player player);

    void delete(Integer id);
}
