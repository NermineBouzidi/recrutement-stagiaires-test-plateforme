package com.example.backend.Service.Implementation;

import com.example.backend.Entity.*;
import com.example.backend.Repository.TestSubmissionRepository;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Security.JwtUtils;
import com.example.backend.Service.UserTestSubmission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserTestSubmissionImpl implements UserTestSubmission {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestSubmissionRepository testSubmissionRepository;

    @Autowired
    private JwtUtils jwtUtils;


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
            //String language = "java";
            // System.out.println(answer.getProblem());
            // String code = answer.getAnswerText();
            //Problem problem =
            //CreateFile(answer);
            answer.setTestSubmission(testSubmission); // Set association
        }
        testSubmission.setTestSubmissionDate(LocalDateTime.now());
        testSubmission.setStatus("Pending");
        testSubmission.setProblemAnswers(problemAnswers); // Update list
        return testSubmissionRepository.save(testSubmission);
    }

    @Override
    public ResponseEntity<?> getAssignedTest(String token) {
        // Validate token (implement your token validation logic here)
        User user = userRepository.findByEmail(jwtUtils.getUsername(token));

        if (user != null) {
            return handleAssignedTest(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    private ResponseEntity<?> handleAssignedTest(User user) {
        TestSubmission testSubmission = testSubmissionRepository.findByUser(user);

        if (testSubmission != null) {
            String submissionStatus = testSubmission.getStatus();
            if (submissionStatus.equals("Submitted")) {
                // User has already completed the test, return appropriate response
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("completed");
            } else if (submissionStatus.equals("TIMED_OUT")) {
                // User has already started the test, don't allow access again
                // (Optional: You can consider returning a message indicating the test is in progress)
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
            } else {
                return ResponseEntity.ok(testSubmission);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
