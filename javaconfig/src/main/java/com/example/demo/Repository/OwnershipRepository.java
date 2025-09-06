package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Ownership;
import com.example.demo.Entity.OwnershipId;

import java.util.List;

public interface OwnershipRepository extends JpaRepository<Ownership, OwnershipId> {
    List<Ownership> findByUser_Id(Integer userId);

    List<Ownership> findByPlayer_Id(Integer playerId);
}