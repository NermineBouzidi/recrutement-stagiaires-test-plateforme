package com.example.backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    private Integer points;

    @ManyToOne(optional = false ,cascade = CascadeType.ALL) // Enforce mandatory association
    @JoinColumn(name = "test-submission_id")
    @JsonBackReference // Use this annotation to prevent infinite recursion
    private TestSubmission testSubmission;
}
