package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import com.example.demo.Entity.Club;

public interface ClubService {
    List<Club> getAll();

    Optional<Club> getById(Integer id);

    Club save(Club club);

    void delete(Integer id);
}