package com.example.backend.DTO;

import lombok.Data;

@Data
public class QuizAnswerDTO {
    private Long quizId;
    private String answerText;
    private Long testSubmissionId;
}
