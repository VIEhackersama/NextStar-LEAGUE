package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "countries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "country_id")
    private Integer countryid;

    @Column(name = "country_name", nullable = false, unique = true, length = 100)
    private String countryname;

    @Column(name = "country_flag")
    private String countryflag;  
}