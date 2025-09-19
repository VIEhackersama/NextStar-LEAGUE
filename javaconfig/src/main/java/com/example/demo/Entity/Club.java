package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "clubs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Club {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "club_id")
    private Integer clubid;

    @Column(name = "club_name", nullable = false, unique = true, length = 100)
    private String clubname;

    @Column(name = "club_icon")
    private String clubicon; 
}