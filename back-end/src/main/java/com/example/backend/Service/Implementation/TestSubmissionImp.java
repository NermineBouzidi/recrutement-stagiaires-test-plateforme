package com.example.backend.Service.Implementation;

import com.example.backend.DTO.ProblemAnswerDTO;
import com.example.backend.DTO.QuizAnswerDTO;
import com.example.backend.DTO.TestAnswersRequest;
import com.example.backend.Entity.*;
import com.example.backend.Repository.*;
import com.example.backend.Service.TestSubmissionService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
        testSubmission.setAcceptedDate(LocalDateTime.now());
        testSubmission.setStatus("Pending");
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
        return testSubmissionRepository.save(existingTestSubmission);
    }

    @Override
    public List<TestSubmission> getAllTestSubmissions() {
        return testSubmissionRepository.findAll();
    }

    @Override
    public TestSubmission setProblemAnswers(long id, List<ProblemAnswer> problemAnswers) {
        TestSubmission testSubmission = testSubmissionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("testSubmission not found with id: " + id));

// Clear existing problem answers (optional)
        //  testSubmission.getProblemAnswers().clear();

        // Set new problem answers with association
        for (ProblemAnswer answer : problemAnswers) {
            answer.setTestSubmission(testSubmission); // Set association
        }

        testSubmission.setProblemAnswers(problemAnswers); // Update list
        return testSubmissionRepository.save(testSubmission);
    }

    @Override
    public TestSubmission setQuizAnswers(long id, List<QuizAnswer> quizAnswers) {
        TestSubmission testSubmission = testSubmissionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("testSubmission not found with id: " + id));

// Clear existing problem answers (optional)
        //  testSubmission.getProblemAnswers().clear();

        // Set new problem answers with association
        testSubmission.getQuizAnswers().clear();

        // Set new quiz answers with association and potentially calculate points
        for (QuizAnswer answer : quizAnswers) {
            answer.setTestSubmission(testSubmission); // Set association

            // Handle Multiple Choice questions with potential duplicates:
            if (answer.getQuiz().getQuestionType().equals("MultipleChoiceQuestion") && answer.getMultipleChoiceAnswers() != null) {
                Set<Choice> chosenChoices = new HashSet<>(answer.getMultipleChoiceAnswers()); // Use Set to avoid duplicates
                answer.setMultipleChoiceAnswers(new ArrayList<>(chosenChoices)); // Update with de-duplicated list
            }

        }

        testSubmission.setQuizAnswers(new ArrayList<>(quizAnswers)); // Update list (avoid modification issues)
        return testSubmissionRepository.save(testSubmission);
    }

    @Override
    public TestSubmission setAnswers(long id, List<QuizAnswer> quizAnswers, List<ProblemAnswer> problemAnswers) {
        TestSubmission testSubmission = testSubmissionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("testSubmission not found with id: " + id));

// Clear existing problem answers (optional)
        //  testSubmission.getProblemAnswers().clear();

        // Set new problem answers with association
        testSubmission.getQuizAnswers().clear();
        testSubmission.getProblemAnswers().clear();

        // Set new quiz answers with association and potentially calculate points
        for (QuizAnswer answer : quizAnswers) {
            answer.setTestSubmission(testSubmission); // Set association

            // Handle Multiple Choice questions with potential duplicates:
            if (answer.getQuiz().getQuestionType().equals("MultipleChoiceQuestion") && answer.getMultipleChoiceAnswers() != null) {
                Set<Choice> chosenChoices = new HashSet<>(answer.getMultipleChoiceAnswers()); // Use Set to avoid duplicates
                answer.setMultipleChoiceAnswers(new ArrayList<>(chosenChoices)); // Update with de-duplicated list
            }

        }

        testSubmission.setQuizAnswers(new ArrayList<>(quizAnswers)); // Update list (avoid modification issues)    }
        for (ProblemAnswer answer : problemAnswers) {
            answer.setTestSubmission(testSubmission); // Set association
        }
        testSubmission.setTestSubmissionDate(LocalDateTime.now());
        testSubmission.setStatus("Submitted");
        testSubmission.setProblemAnswers(problemAnswers); // Update list
        return testSubmissionRepository.save(testSubmission);
    }



}
