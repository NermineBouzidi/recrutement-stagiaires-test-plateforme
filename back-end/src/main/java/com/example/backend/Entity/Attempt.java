package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Attempt {
      @Id
      int id;

      @OneToOne
      User user;

      @OneToMany
      List<Quiz> quiz;
      @OneToMany
      List<Problem >problem;
      int score ;





}
