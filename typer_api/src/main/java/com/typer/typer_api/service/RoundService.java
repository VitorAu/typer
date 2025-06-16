package com.typer.typer_api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.typer.typer_api.entity.Round;
import com.typer.typer_api.repository.round.RoundRepository;

@Service
public class RoundService {
  private final RoundRepository roundRepository;

  public RoundService(RoundRepository roundRepository) {
    this.roundRepository = roundRepository;
  }

  public Round create(Integer userId, Round round) {
    return roundRepository.create(userId, round);
  }

  public List<Round> get(Integer userId) {
    return roundRepository.get(userId);
  }
}
