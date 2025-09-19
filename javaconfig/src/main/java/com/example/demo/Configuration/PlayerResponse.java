package com.example.demo.Configuration;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlayerResponse {
    private Integer playerId;
    private String fullName;
    private int rating;
    private String positionCode;
    private String positionName;
    private String countryName;
    private String countryFlag;
    private String clubName;
    private String clubIcon;
    private String imageUrl;
    private Long price;
    private List<Map<String, Object>> stats; // [{ "code": "PAC", "name": "Pace", "value": 85 }, ...]

    // getters & setters
}
