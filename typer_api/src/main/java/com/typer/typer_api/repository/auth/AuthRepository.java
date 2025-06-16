package com.typer.typer_api.repository.auth;

import com.typer.typer_api.entity.User;

public interface AuthRepository {
  User login(String email, String password);
}
