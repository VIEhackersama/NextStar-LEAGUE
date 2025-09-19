package com.example.demo.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.demo.Configuration.PlayerResponse;
import com.example.demo.Entity.Player;
import com.example.demo.Entity.PlayerStat;
import com.example.demo.Repository.PlayerRepository;
import com.example.demo.Repository.PlayerStatRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlayerService {
    private final PlayerRepository playerRepository;
    private final PlayerStatRepository playerStatRepository;

    // Lấy tất cả cầu thủ
    public List<PlayerResponse> getAllPlayers() {
        List<Player> players = playerRepository.findAll();
        return players.stream().map(this::mapToResponse).toList();
    }

    // Lấy cầu thủ theo ID
    public PlayerResponse getPlayerById(Integer id) {
        Player player = playerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Player not found with id: " + id));
        return mapToResponse(player);
    }

    // Hàm convert Player -> PlayerResponse
    private PlayerResponse mapToResponse(Player player) {
        PlayerResponse dto = new PlayerResponse();
        dto.setPlayerId(player.getPlayerid());
        dto.setFullName(player.getFullName());
        dto.setRating(player.getRating());
        dto.setPositionCode(player.getPosition().getPositioncode());
        dto.setPositionName(player.getPosition().getPositionname());
        dto.setCountryName(player.getCountry().getCountryname());
        dto.setCountryFlag(player.getCountry().getCountryflag());
        dto.setClubName(player.getClub() != null ? player.getClub().getClubname() : null);
        dto.setClubIcon(player.getClub() != null ? player.getClub().getClubicon() : null);
        dto.setImageUrl(player.getImageUrl());
        dto.setPrice(player.getPrice());

        // Lấy stats
        List<PlayerStat> stats = playerStatRepository.findByPlayer(player);
        List<Map<String, Object>> statList = stats.stream().map(stat -> {
            Map<String, Object> m = new HashMap<>();
            m.put("statCode", stat.getStatType().getStatcode());
            m.put("statName", stat.getStatType().getStatname());
            m.put("statValue", stat.getStatvalue());
            return m;
        }).toList();

        dto.setStats(statList);
        return dto;
    }
}
