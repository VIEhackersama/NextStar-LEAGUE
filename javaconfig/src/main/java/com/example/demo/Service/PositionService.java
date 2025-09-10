package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import com.example.demo.Entity.Position;

public interface PositionService {
    List<Position> getAll();

    Optional<Position> getById(Integer id);

    Position save(Position position);

    void delete(Integer id);
}