package com.example.demo.Configuration;

import com.example.demo.Entity.Account;
import com.example.demo.Entity.Post;
import com.example.demo.Repository.AccountRepository;
import com.example.demo.Repository.PostRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/admin/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminPostController {

    private final PostRepository postRepository;
    private final AccountRepository accountRepository;

    public AdminPostController(PostRepository postRepository, AccountRepository accountRepository) {
        this.postRepository = postRepository;
        this.accountRepository = accountRepository;
    }

    private Account me() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = (auth != null) ? auth.getName() : null;
        return accountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

    private void ensureAdmin() {
        Account me = me();
        if (me.getIsAdmin() == null || !me.getIsAdmin()) {
            throw new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.FORBIDDEN, "Admin only");
        }
    }

    // ===== READ ALL =====
    @GetMapping
    public List<Post> listAll() {
        ensureAdmin();
        return postRepository.findAll();
    }

    // ===== READ ONE =====
    @GetMapping("/{id}")
    public Post getById(@PathVariable Integer id) {
        ensureAdmin();
        return postRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
    }

    // ===== CREATE =====
    @PostMapping
    public ResponseEntity<Post> create(@RequestBody PostAdminRequest body) {
        ensureAdmin();
        Account owner = (body.getAccountId() != null)
                ? accountRepository.findById(body.getAccountId())
                        .orElseThrow(() -> new RuntimeException("Owner account not found"))
                : me(); // mặc định gán cho admin tạo

        Post p = Post.builder()
                .title(body.getTitle())
                .fullText(body.getFullText())
                .imageUrl(body.getImageUrl())
                .account(owner)
                .createdAt(LocalDateTime.now())
                .build();
        Post saved = postRepository.save(p);
        return ResponseEntity.created(URI.create("/api/admin/posts/" + saved.getPostId())).body(saved);
    }

    // ===== UPDATE =====
    @PutMapping("/{id}")
    public Post update(@PathVariable Integer id, @RequestBody PostAdminRequest body) {
        ensureAdmin();
        Post p = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        p.setTitle(body.getTitle());
        p.setFullText(body.getFullText());
        p.setImageUrl(body.getImageUrl());
        if (body.getAccountId() != null) {
            Account owner = accountRepository.findById(body.getAccountId())
                    .orElseThrow(() -> new RuntimeException("Owner account not found"));
            p.setAccount(owner);
        }
        return postRepository.save(p);
    }

    // ===== DELETE =====
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        ensureAdmin();
        if (!postRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        postRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // DTO tối giản cho admin CRUD
    public static class PostAdminRequest {
        private String title;
        private String fullText;
        private String imageUrl;
        private Integer accountId; // optional: chuyển quyền sở hữu

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getFullText() {
            return fullText;
        }

        public void setFullText(String fullText) {
            this.fullText = fullText;
        }

        public String getImageUrl() {
            return imageUrl;
        }

        public void setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
        }

        public Integer getAccountId() {
            return accountId;
        }

        public void setAccountId(Integer accountId) {
            this.accountId = accountId;
        }
    }
}