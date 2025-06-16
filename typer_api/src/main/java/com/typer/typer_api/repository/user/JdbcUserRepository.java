package com.typer.typer_api.repository.user;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.typer.typer_api.entity.User;

@Repository
public class JdbcUserRepository implements UserRepository {
  private final JdbcTemplate jdbcTemplate;

  public JdbcUserRepository(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  public Map<Integer, String> aux;


  private final RowMapper<User> rowMapper = (rs, rowNum) -> {
    User user = new User();
    user.setId(rs.getInt("id"));
    user.setName(rs.getString("name"));
    user.setEmail(rs.getString("email"));
    user.setPassword(rs.getString("password"));
    user.setHighscore(rs.getFloat("highscore"));
    user.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
    user.setUpdatedAt(rs.getTimestamp("updated_at").toLocalDateTime());
    return user;
  };

  @Override
  public User create(User user) {
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

  @Override
  public User get(Integer id) {
    String sql = "select * from user where id = ?";

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

  @Override
  public User update(Integer id, Integer newHighscore) {
    String sql = "update user set highscore = ? where id = ?";
    User user = get(id);
    user.setUpdatedAt(LocalDateTime.now());

    try {
      jdbcTemplate.update(sql, newHighscore, id);
      return get(id);
    } catch (Exception e) {
      System.err.println("Failed to find update user highscore: " + e.getMessage());
      throw new RuntimeException("Could not update user highscore");
    }
  }

  @Override
  public List<User> getAll() {
    String sql = "select * from user";

    try {
      return jdbcTemplate.query(sql, rowMapper);
    } catch (Exception e) {
      System.err.println("Error retrieving users: " + e.getMessage());
      throw new RuntimeException("Could not retrieve users");
    }
  }
}
