package com.example.demo.Entity;

import jakarta.persistence.Embeddable;
import lombok.*;
import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OwnershipId implements Serializable {
    private Integer userId;
    private Integer playerId;
}