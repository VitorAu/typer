package com.typer.typer_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.typer.typer_api.entity.Round;

public interface RoundRepository extends JpaRepository<Round, Integer> {}
