package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import com.example.demo.Entity.StatType;

public interface StatTypeService {
    List<StatType> getAll();

    Optional<StatType> getById(Integer id);

    StatType save(StatType statType);

    void delete(Integer id);
}