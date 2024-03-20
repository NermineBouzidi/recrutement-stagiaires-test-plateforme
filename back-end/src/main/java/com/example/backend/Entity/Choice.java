package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Choice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String choice;
    private boolean isCorrect;

    @ManyToOne// Enforce mandatory association with Quiz
    private Quiz quiz;

    // Constructors, getters, and setters
}