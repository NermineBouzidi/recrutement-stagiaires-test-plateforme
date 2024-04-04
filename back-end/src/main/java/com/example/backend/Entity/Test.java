package com.example.backend.Entity;

import com.example.backend.Entity.Enum.TestCategory;
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
    @Enumerated(EnumType.STRING)
    private TestCategory category;
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
    @OneToMany(mappedBy = "test") // Many Tests can have Many TestSubmissions
    private List<TestSubmission> submissions;

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
    public String getDifficultyLevel(){
        int totalPoints = getTotalPoints();
        int totalDuration = getTotalDuration();

        // Logic to determine difficulty level based on totalPoints and totalDuration
        if (totalPoints < 50 && totalDuration < 60) {
            return "Easy";
        } else if (totalPoints >= 50 && totalDuration >= 60 && totalPoints < 100 && totalDuration < 120) {
            return "Intermediate";
        } else {
            return "Advanced";
        }
    }


}



