package com.example.backend.DTO;

import lombok.Data;

@Data
public class ProblemAnswerDTO {
    private Long problemId;
    private String answerText;
    private Long testSubmissionId;
}
