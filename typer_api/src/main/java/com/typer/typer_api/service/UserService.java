package com.typer.typer_api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.typer.typer_api.entity.User;
import com.typer.typer_api.repository.user.UserRepository;

@Service
public class UserService {
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public User create(User user) {
    return userRepository.create(user);
  }

  public User get(Integer id) {
    return userRepository.get(id);
  }

  public User update(Integer id, Integer highscore) {
    return userRepository.update(id, highscore);
  }

  public List<User> getAll() {
    return userRepository.getAll();
  }
}
