package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class QuizAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private  Quiz quiz;
    private String answerText;
    private Integer points;
    @ManyToOne(optional = false) // Enforce mandatory association
    @JoinColumn(name = "test-submission_id")
    private TestSubmission testSubmission;
}
