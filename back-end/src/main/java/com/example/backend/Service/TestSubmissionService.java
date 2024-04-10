package com.example.backend.Service;

import com.example.backend.DTO.ProblemAnswerDTO;
import com.example.backend.DTO.QuizAnswerDTO;
import com.example.backend.Entity.*;

public interface TestSubmissionService {
    void assignTestToUser(Test test, User user);
    TestSubmission addAnswers(long id ,TestSubmission testSubmission);

}
