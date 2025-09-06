package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ownership")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ownership {
    @EmbeddedId
    private OwnershipId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @MapsId("playerId")
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;

    @Column(name = "acquired_at", nullable = false)
    private LocalDateTime acquiredAt;
}