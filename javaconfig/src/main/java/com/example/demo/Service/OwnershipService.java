package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import com.example.demo.Entity.Ownership;
import com.example.demo.Entity.OwnershipId;

public interface OwnershipService {
    List<Ownership> getAll();

    Optional<Ownership> getById(OwnershipId id);

    Ownership save(Ownership ownership);

    void delete(OwnershipId id);
}