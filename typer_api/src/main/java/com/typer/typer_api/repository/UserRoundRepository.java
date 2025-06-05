package com.typer.typer_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.typer.typer_api.entity.UserRound;

public interface UserRoundRepository extends JpaRepository<UserRound, Integer> {
  List<UserRound> findByUserId(Integer userId);
  List<UserRound> findByRoundId(Integer roundId);
}
