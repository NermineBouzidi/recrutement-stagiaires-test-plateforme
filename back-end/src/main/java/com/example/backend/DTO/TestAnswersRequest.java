package com.example.backend.DTO;

import com.example.backend.Entity.ProblemAnswer;
import com.example.backend.Entity.QuizAnswer;
import lombok.Data;

import java.util.List;

@Data
public class TestAnswersRequest {
    private List<ProblemAnswer> problemAnswers;
    private List<QuizAnswer> quizAnswers;
}
