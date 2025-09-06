package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "player_stats")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlayerStat {
    @EmbeddedId
    private PlayerStatId id;

    @ManyToOne
    @MapsId("playerId")
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;

    @ManyToOne
    @MapsId("statTypeId")
    @JoinColumn(name = "stat_type_id", nullable = false)
    private StatType statType;

    @Column(name = "stat_value", nullable = false)
    private Byte value;
}