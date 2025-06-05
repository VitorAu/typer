package com.typer.typer_api.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "round")
public class Round extends Base {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  private Float score;
  private Integer totalTime;

  public Round() {}
  public Round(Float score, Integer totalTime, LocalDateTime createdAt, LocalDateTime updatedAt) {
    super(LocalDateTime.now(), LocalDateTime.now());
    this.score = score;
    this.totalTime = totalTime;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer newId) {
    this.id = newId;
  }

  public Float getScore() {
    return score;
  }

  public void setScore(Float newScore) {
    this.score = newScore;
  }

  public Integer getTotalTime() {
    return totalTime;
  }

  public void setTotalTime(Integer newTotalTime) {
    this.totalTime = newTotalTime;
  }
}
