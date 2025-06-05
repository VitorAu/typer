package com.typer.typer_api.dto;

public class AuthResponse {
  private Integer userId;

  public AuthResponse(Integer userId) {
      this.userId = userId;
  }

  public Integer getUserId() {
      return userId;
  }

  public void setUserId(Integer userId) {
      this.userId = userId;
  }
}

