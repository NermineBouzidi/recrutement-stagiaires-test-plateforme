package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProblemAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private  Problem problem;
    @Lob
    private String answerText;
    @ManyToOne(optional = false) // Enforce mandatory association
    @JoinColumn(name = "test-submission_id")
    private TestSubmission testSubmission;
}
