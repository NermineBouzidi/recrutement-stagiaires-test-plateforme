package com.example.backend.Entity;

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
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id ;
    private String category;
    private String difficultyLevel;
    @ManyToMany
    @JoinTable(name = "test_quizzes",
            joinColumns = @JoinColumn(name = "test_id"),
            inverseJoinColumns = @JoinColumn(name = "quiz_id"))
    private List<Quiz> quizzes = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "test_problems",
            joinColumns = @JoinColumn(name = "test_id"),
            inverseJoinColumns = @JoinColumn(name = "problem_id"))
    private List<Problem> problems = new ArrayList<>();
    private Integer passingPercentage ;
    public int getTotalPoints() {
        int totalPoints = 0;
        for (Problem problem : problems) {
            totalPoints += problem.getPoints();
        }
        for (Quiz quiz : quizzes) {
            totalPoints += quiz.getPoints();
        }
        return totalPoints;
    }
    public int getTotalDuration() {
        int totalDuration = 0;
        for (Problem problem : problems) {
            totalDuration += problem.getDuration();
        }
        for (Quiz quiz : quizzes) {
            totalDuration += quiz.getDuration();
        }
        return totalDuration;
    }


}
