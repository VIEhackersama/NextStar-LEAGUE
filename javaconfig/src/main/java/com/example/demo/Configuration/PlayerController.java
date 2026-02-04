package com.example.demo.Configuration;

import com.example.demo.Configuration.PlayerResponse;
import com.example.demo.Service.PlayerService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<PlayerResponse>> getAllPlayers() {
        return ResponseEntity.ok(playerService.getAllPlayers());
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<PlayerResponse> getPlayerById(@PathVariable Integer id) {
        return ResponseEntity.ok(playerService.getPlayerById(id));
    }

    @RestController
    @RequestMapping("/api/clubs")
    @RequiredArgsConstructor
    public class ClubController {
        private final PlayerService playerService;

        @GetMapping("/{clubId}/players")
        @PreAuthorize("isAuthenticated()")
        public ResponseEntity<List<PlayerResponse>> getPlayersByClub(@PathVariable Integer clubId) {
            return ResponseEntity.ok(playerService.getPlayersByClubId(clubId));
        }
    }

}