package com.example.backend.Service;

import com.example.backend.DTO.ProblemAnswerDTO;
import com.example.backend.DTO.QuizAnswerDTO;
import com.example.backend.Entity.*;

import java.util.List;

public interface TestSubmissionService {
    void assignTestToUser(Test test, User user);
    TestSubmission addAnswers(long id ,TestSubmission testSubmission);
    List<TestSubmission> getAllTestSubmissions();

    TestSubmission setProblemAnswers(long id ,List<ProblemAnswer> problemAnswers);
    TestSubmission setQuizAnswers(long id , List<QuizAnswer> quizAnswers);
    TestSubmission setAnswers(long id,List<QuizAnswer> quizAnswers,List<ProblemAnswer> problemAnswers);

}
