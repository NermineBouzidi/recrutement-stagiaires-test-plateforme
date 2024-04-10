package com.example.backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TestSubmission{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id ;
    @ManyToOne
    @JsonBackReference // Use this annotation to prevent infinite recursion
    private Test test;
    @OneToOne(cascade = CascadeType.ALL ,orphanRemoval = true)// Enable orphan removal
    private User user;
    private Integer score;
    private boolean isPassed;
    private LocalDateTime testSubmissionDate;
    @OneToMany(mappedBy = "testSubmission", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
    @JsonIgnoreProperties("testSubmission") // Prevent infinite recursion
    private List<ProblemAnswer> problemAnswers = new ArrayList<>();
    @OneToMany(mappedBy = "testSubmission", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
    @JsonIgnoreProperties("testSubmission") // Prevent infinite recursion
    private List<QuizAnswer> quizAnswers  = new ArrayList<>();

}
