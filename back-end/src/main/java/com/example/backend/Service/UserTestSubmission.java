package com.example.backend.Service;

import com.example.backend.Entity.ProblemAnswer;
import com.example.backend.Entity.QuizAnswer;
import com.example.backend.Entity.TestSubmission;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserTestSubmission {
     ResponseEntity<?> getAssignedTest(String token);
    TestSubmission setAnswers(long id, List<QuizAnswer> quizAnswers, List<ProblemAnswer> problemAnswers);

}
