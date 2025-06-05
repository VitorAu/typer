package com.typer.typer_api.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import com.typer.typer_api.entity.User;

@Service
public class UserService {
  private final JdbcTemplate jdbcTemplate;

  public UserService(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  public User createUser(User user) {
    user.setCreatedAt(LocalDateTime.now());
    user.setUpdatedAt(LocalDateTime.now());
    user.setHighscore(Float.valueOf(0));

    String sql = "insert into user (name, email, password, highscore, created_at, updated_at) values (?, ?, ?, ?, ?, ?)";

    try {
      jdbcTemplate.update(sql, user.getName(), user.getEmail(), user.getPassword(), user.getHighscore(),
          user.getCreatedAt(), user.getUpdatedAt());
    } catch (Exception e) {
      System.err.println("Failed to create user: " + e.getMessage());
      throw new RuntimeException("Could not create user");
    }

    return user;
  }

  public User getUser(Integer id) {
    String sql = "select * from user where id = ?";

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
      return jdbcTemplate.queryForObject(sql, rowMapper, id);
    } catch (EmptyResultDataAccessException e) {
      System.err.println("Failed to find user with this id: " + e.getMessage());
      throw new RuntimeException("Could not find user");
    } catch (Exception e) {
      System.err.println("Error retrieving user: " + e.getMessage());
      throw new RuntimeException("Could not retrieve user");
    }
  }

  public User updateUserHighscore(Integer id, Integer newHighscore) {
    String sql = "update user set highscore = ? where id = ?";
    User user = getUser(id);
    user.setUpdatedAt(LocalDateTime.now());

    try {
      jdbcTemplate.update(sql, newHighscore, id);
      return getUser(id);
    } catch (Exception e) {
      System.err.println("Failed to find update user highscore: " + e.getMessage());
      throw new RuntimeException("Could not update user highscore");
    }
  }

  public List<User> getAllUsers() {
    String sql = "select * from user";

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
      return jdbcTemplate.query(sql, rowMapper);
    } catch (Exception e) {
      System.err.println("Error retrieving users: " + e.getMessage());
      throw new RuntimeException("Could not retrieve users");
    }
  }
}
