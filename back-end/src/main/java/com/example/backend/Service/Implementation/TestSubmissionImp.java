package com.example.backend.Service.Implementation;

import com.example.backend.DTO.ProblemAnswerDTO;
import com.example.backend.DTO.QuizAnswerDTO;
import com.example.backend.Entity.*;
import com.example.backend.Repository.*;
import com.example.backend.Service.TestSubmissionService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestSubmissionImp implements TestSubmissionService {
    @Autowired
    TestSubmissionRepository testSubmissionRepository;
    @Autowired
    ProblemAnswerRepository problemAnswerRepository;
    @Autowired
    QuizAnswerRepository quizAnswerRepository;
    @Autowired
    ProblemRepository problemRepository;
    @Autowired
    QuizRepository quizRepository;
    public void assignTestToUser(Test test, User user) {
        TestSubmission testSubmission = new TestSubmission();
        testSubmission.setTest(test);
        testSubmission.setUser(user);
        // You can set other attributes such as score and isPassed as needed
        testSubmissionRepository.save(testSubmission);
    }

    @Override
    public TestSubmission addAnswers(long id, TestSubmission testSubmission) {
        TestSubmission existingTestSubmission = testSubmissionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Problem not found with id: " + id));
        List<ProblemAnswer> answers = testSubmission.getProblemAnswers();
        if (answers != null) {
            for (ProblemAnswer answer : answers) {
                answer.setTestSubmission(existingTestSubmission);
            }
        }
        return  testSubmissionRepository.save(existingTestSubmission);
    }


}
