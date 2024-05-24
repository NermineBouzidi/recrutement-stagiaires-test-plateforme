package com.example.backend.Service;

import com.example.backend.DTO.ProblemAnswerDTO;
import com.example.backend.DTO.QuizAnswerDTO;
import com.example.backend.Entity.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TestSubmissionService {
    void assignTestToUser(Test test, User user);
    TestSubmission addAnswers(long id ,TestSubmission testSubmission);
    List<TestSubmission> getAllTestSubmissions();

    TestSubmission setProblemAnswers(long id ,List<ProblemAnswer> problemAnswers);
    TestSubmission setQuizAnswers(long id , List<QuizAnswer> quizAnswers);
    TestSubmission setAnswers(long id,List<QuizAnswer> quizAnswers,List<ProblemAnswer> problemAnswers);
    void analyzeProblemAnswer(ProblemAnswer answer) ;

    String acceptUser (long id );
     String rejectUser (long id );
     String CreateFile (ProblemAnswer answer);
    ResponseEntity<String > acceptAndAssign(Long userId);



    }
