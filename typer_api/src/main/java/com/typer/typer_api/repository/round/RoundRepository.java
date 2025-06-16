package com.typer.typer_api.repository.round;

import java.util.List;

import com.typer.typer_api.entity.Round;

public interface RoundRepository {
  Round create(Integer userId, Round round);
  List<Round> get(Integer userId);
}
