package com.typer.typer_api.repository.round;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.typer.typer_api.entity.Round;

@Repository
public class JdbcRoundRepository implements RoundRepository {
  private final JdbcTemplate jdbcTemplate;

  public JdbcRoundRepository(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  @Override
  public Round create(Integer userId, Round round) {
    round.setCreatedAt(LocalDateTime.now());
    round.setUpdatedAt(LocalDateTime.now());

    String sql = "insert into round (score, total_time, created_at, updated_at) values (?, ?, ?, ?)";
    String getLastIdSql = "select LAST_INSERT_ID()";
    String insertUserRoundSql = "insert into user_round (user_id, round_id) values (?, ?)";

    try {
      jdbcTemplate.update(sql, round.getScore(), round.getTotalTime(), round.getCreatedAt(), round.getUpdatedAt());
      Integer roundId = jdbcTemplate.queryForObject(getLastIdSql, Integer.class);
      jdbcTemplate.update(insertUserRoundSql, userId, roundId);

      round.setId(roundId);
      return round;
    } catch (Exception e) {
      System.err.println("Failed to create round and junction with user: " + e.getMessage());
      throw new RuntimeException("Could not create round and junction with user");
    }
  }

  @Override
  public List<Round> get(Integer userId) {
    String sql = "select * from round inner join user_round on round.id = user_round.round_id where user_round.user_id = ? order by round.created_at";

    RowMapper<Round> rowMapper = (rs, rowNum) -> {
      Round round = new Round();
      round.setId(rs.getInt("id"));
      round.setScore(rs.getFloat("score"));
      round.setTotalTime(rs.getInt("total_time"));
      round.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
      round.setUpdatedAt(rs.getTimestamp("updated_at").toLocalDateTime());
      return round;
    };

    try {
      return jdbcTemplate.query(sql, rowMapper, userId);
    } catch (EmptyResultDataAccessException e) {
      System.err.println("Failed to find rounds from this user: " + e.getMessage());
      throw new RuntimeException("Could not find rounds");
    } catch (Exception e) {
      System.err.println("Error retrieving rounds: " + e.getMessage());
      throw new RuntimeException("Could not retrieve rounds");
    }
  }
}
