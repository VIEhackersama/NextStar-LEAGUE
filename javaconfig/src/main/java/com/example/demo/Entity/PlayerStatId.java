package com.example.demo.Entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlayerStatId implements Serializable {
    private Integer playerId;
    private Integer statTypeId;
}