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
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Quiz> quizzes = new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
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


}
