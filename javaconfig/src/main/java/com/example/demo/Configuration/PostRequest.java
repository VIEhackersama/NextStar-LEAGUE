package com.example.demo.Configuration;

import lombok.Data;

@Data
public class PostRequest {
    private String title;
    private String fullText;
    private String imageUrl;
}
