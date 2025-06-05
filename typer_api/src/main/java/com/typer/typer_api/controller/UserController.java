package com.typer.typer_api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.typer.typer_api.entity.User;
import com.typer.typer_api.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
  private UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping()
  public User create(@RequestBody User user) {
    return userService.createUser(user);
  }

  @GetMapping("/{id}")
  public User get(@PathVariable Integer id) {
    return userService.getUser(id);
  }

  @GetMapping
  public List<User> getAll() {
    return userService.getAllUsers();
  }


  @PutMapping("/{id}")
  public User put(@PathVariable Integer id, @RequestBody Integer highScore) {
    return userService.updateUserHighscore(id, highScore);
  }
}
