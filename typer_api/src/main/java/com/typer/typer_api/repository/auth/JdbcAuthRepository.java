package com.typer.typer_api.repository.auth;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.typer.typer_api.entity.User;

@Repository
public class JdbcAuthRepository implements AuthRepository {
   private final JdbcTemplate jdbcTemplate;

  public JdbcAuthRepository(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  @Override
  public User login(String email, String password) {
    String sql = "select * from user where email = ? and password = ?";

    RowMapper<User> rowMapper = (rs, rowNum) -> {
      User user = new User();
      user.setId(rs.getInt("id"));
      user.setName(rs.getString("name"));
      user.setEmail(rs.getString("email"));
      user.setHighscore(rs.getFloat("highscore"));
      user.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
      user.setUpdatedAt(rs.getTimestamp("updated_at").toLocalDateTime());
      return user;
    };

    try {
      return jdbcTemplate.queryForObject(sql, rowMapper, email, password);
    } catch (EmptyResultDataAccessException e) {
      System.err.println("Invalid credentials for email: " + email);
      throw new RuntimeException("Invalid email or password");
    } catch (Exception e) {
      System.err.println("Authentication error: " + e.getMessage());
      throw new RuntimeException("Authentication failed");
    }
  }
}
