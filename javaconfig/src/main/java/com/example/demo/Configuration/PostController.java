package com.example.demo.Configuration;

import com.example.demo.Entity.Account;
import com.example.demo.Entity.Post;
import com.example.demo.Repository.PostRepository;
import com.example.demo.Service.PostService;
import com.example.demo.Repository.AccountRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") 
public class PostController {

    private final PostRepository postRepository;
    private final AccountRepository accountRepository;
        private final PostService postService;
    public PostDTO convertToDTO(Post post) {
        return new PostDTO(
                post.getPostId(),
                post.getTitle(),
                post.getFullText(),
                post.getImageUrl(),
                post.getAccount().getUser().getUsername(), 
                post.getCreatedAt());
    }

    @GetMapping("/posts")
    public List<PostDTO> getAllPosts() {
        return postService.getAllPosts()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @PostMapping("/post")
    public ResponseEntity<Post> createPost(@RequestBody PostRequest postRequest, Authentication authentication) {
        String email = authentication.getName();
        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        Post post = Post.builder()
                .title(postRequest.getTitle())
                .fullText(postRequest.getFullText())
                .imageUrl(postRequest.getImageUrl())
                .account(account)
                .build();

        return ResponseEntity.ok(postRepository.save(post));
    }

}