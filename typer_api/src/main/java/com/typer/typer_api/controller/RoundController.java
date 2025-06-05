package com.typer.typer_api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.typer.typer_api.entity.Round;
import com.typer.typer_api.service.RoundService;

@CrossOrigin
@RestController
@RequestMapping("/round")
public class RoundController {
  private RoundService roundService;

  public RoundController(RoundService roundService) {
    this.roundService = roundService;
  }

  @PostMapping("/{id}")
  public Round create(@PathVariable Integer id,  @RequestBody Round round) {
    return roundService.createRound(id, round);
  }

  @GetMapping("/{id}")
  public List<Round> get(@PathVariable Integer id) {
    return roundService.getRound(id);
  }
}
