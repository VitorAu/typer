package com.typer.typer_api.repository.user;

import java.util.List;

import com.typer.typer_api.entity.User;

public interface UserRepository {
  User create(User user);
  User get(Integer Id);
  List<User> getAll();
  User update(Integer id, Integer highscore);
}
