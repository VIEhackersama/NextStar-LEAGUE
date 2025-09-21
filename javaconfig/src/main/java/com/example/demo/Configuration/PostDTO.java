package com.example.demo.Configuration;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDTO {
    private Integer postId;
    private String title;
    private String fullText;
    private String imageUrl;
    private String username; 
    private LocalDateTime createdAt;
}
