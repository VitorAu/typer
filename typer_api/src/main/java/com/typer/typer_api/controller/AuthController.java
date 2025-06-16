package com.typer.typer_api.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.typer.typer_api.dto.AuthRequest;
import com.typer.typer_api.dto.AuthResponse;
import com.typer.typer_api.entity.User;
import com.typer.typer_api.service.AuthService;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {
  private AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @CrossOrigin()
  @PostMapping("/login")
  public AuthResponse login(@RequestBody AuthRequest authRequest) {
    User user = authService.login(authRequest.getEmail(), authRequest.getPassword());
    return new AuthResponse(user.getId());
  }
}
