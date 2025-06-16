package com.typer.typer_api.service;

import org.springframework.stereotype.Service;

import com.typer.typer_api.entity.User;
import com.typer.typer_api.repository.auth.AuthRepository;

@Service
public class AuthService {
  private final AuthRepository authRepository;

  public AuthService(AuthRepository authRepository) {
    this.authRepository = authRepository;
  }

  public User login(String email, String password) {
    return authRepository.login(email, password);
  }
}
