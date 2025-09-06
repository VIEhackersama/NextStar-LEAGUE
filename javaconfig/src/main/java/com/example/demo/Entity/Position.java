package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "positions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "position_id")
    private Integer id;

    @Column(name = "position_code", nullable = false, unique = true, length = 10)
    private String code;

    @Column(name = "position_name", nullable = false, length = 50)
    private String name;
}
