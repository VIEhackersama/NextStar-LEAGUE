package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import com.example.demo.Entity.User;

public interface UserService {
    List<User> getAll();

    Optional<User> getById(Integer id);

    User save(User user);

    void delete(Integer id);
}