package com.example.backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class QuizAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Quiz quiz;

    private Boolean trueFalseAnswer;

    @ManyToMany
    private List<Choice> multipleChoiceAnswers = new ArrayList<>();

    private Integer points;

    @ManyToOne(optional = false) // Enforce mandatory association
    @JoinColumn(name = "test-submission_id")
    @JsonBackReference
    private TestSubmission testSubmission;

}
