package com.typer.typer_api.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User extends Base {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  private String name;
  private String email;
  private String password;
  private Float highscore;

  public User() {}
  public User(String name, String email, String password, Float highscore) {
    super(LocalDateTime.now(), LocalDateTime.now());
    this.name = name;
    this.email = email;
    this.password = password;
    this.highscore = highscore;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer newId) {
    this.id = newId;
  }

  public String getName() {
    return name;
  }

  public void setName(String newName) {
    this.name = newName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String newEmail) {
    this.email = newEmail;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String newPassword) {
    this.password = newPassword;
  }

  public Float getHighscore() {
    return highscore;
  }

  public void setHighscore(Float newHighscore) {
    this.highscore = newHighscore;
  }

}
