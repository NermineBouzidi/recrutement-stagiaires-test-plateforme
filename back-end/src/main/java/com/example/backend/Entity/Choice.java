package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


//@Entity
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
public class Choice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text;
    private boolean isCorrect;

    @ManyToOne(optional = false) // Enforce mandatory association
    @JoinColumn(name = "multiple_choice_question_id")
    private MultipleChoiceQuestion multipleChoiceQuestion;

    // Constructors, getters, and setters
}