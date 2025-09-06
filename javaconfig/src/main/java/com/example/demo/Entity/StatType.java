package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "stat_types")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stat_type_id")
    private Integer id;

    @Column(name = "stat_code", nullable = false, unique = true, length = 30)
    private String code;

    @Column(name = "stat_name", nullable = false, length = 60)
    private String name;
}