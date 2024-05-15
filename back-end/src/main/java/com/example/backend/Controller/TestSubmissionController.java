package com.example.backend.Controller;

import com.example.backend.DTO.ProblemAnswerDTO;
import com.example.backend.DTO.TestAnswersRequest;
import com.example.backend.Entity.*;
import com.example.backend.Repository.TestRepository;
import com.example.backend.Repository.TestSubmissionRepository;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Security.JwtUtils;
import com.example.backend.Service.TestSubmissionService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Secured("hasRole('EVALUATOR')")
@RequestMapping("/api/test-submission")
public class TestSubmissionController {
    @Autowired
    TestSubmissionRepository testSubmissionRepository;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    UserRepository userRepository;
    @Autowired
    TestSubmissionService testSubmissionService;
    @Autowired
    TestRepository testRepository;
    @PostMapping("/assign-test")
    public ResponseEntity<String> assignTest(@RequestBody Map<String, Long> requestBody) {
        Long testId = requestBody.get("testId");
        Long userId = requestBody.get("userId");

        if (testId != null && userId != null) {
            // Fetch the Test and User objects from their respective repositories
            Test test = testRepository.findById(testId).orElse(null);
            User user = userRepository.findById(userId).orElse(null);

            if (test != null && user != null) {
                // Assign the test to the user
                testSubmissionService.assignTestToUser(test, user);
                return ResponseEntity.ok("Test assigned successfully.");
            } else {
                return ResponseEntity.badRequest().body("Invalid test or user ID.");
            }
        } else {
            return ResponseEntity.badRequest().body("Missing testId or userId in the request.");
        }
    }

    @GetMapping("/getAllTestSubmission")
    public ResponseEntity<List<TestSubmission>> getAllTestSubmissions() {
        List<TestSubmission>testSubmissions = testSubmissionRepository.findAll();
        return new ResponseEntity<>(testSubmissions, HttpStatus.OK);
    }

    @GetMapping("/getAnswers/{testSubmissionId}")
    public ResponseEntity<?> getAnswersByTestSubmission(@PathVariable Long testSubmissionId) {
        TestSubmission testSubmission = testSubmissionRepository.findById(testSubmissionId)
                .orElseThrow(() -> new IllegalArgumentException("TestSubmission not found with id: " + testSubmissionId));

        List<ProblemAnswer> problemAnswers = testSubmission.getProblemAnswers();
        List<QuizAnswer> quizAnswers = testSubmission.getQuizAnswers();

        Map<String, Object> response = new HashMap<>();
        response.put("problemAnswers", problemAnswers);
        response.put("quizAnswers", quizAnswers);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PutMapping("/problemAnswers-points/{id}")
    public ResponseEntity<TestSubmission> updateProblemAnswerPoints(@PathVariable Long id, @RequestBody Map<Long, Integer> updatedPoints) {
        Optional<TestSubmission> testSubmissionOptional = testSubmissionRepository.findById(id);
        if (testSubmissionOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        TestSubmission testSubmission = testSubmissionOptional.get();
        boolean anyUpdates = false; // Flag to track if any updates happened

        for (ProblemAnswer problemAnswer : testSubmission.getProblemAnswers()) {
            Long problemAnswerId = problemAnswer.getId();
            Integer newPoints = updatedPoints.get(problemAnswerId);
            if (newPoints != null) {
                problemAnswer.setPoints(newPoints);
                anyUpdates = true; // Update flag if a point is updated
            }
        }

        if (!anyUpdates) {
            return ResponseEntity.noContent().build(); // No updates, return 204 No Content
        }

        testSubmission = testSubmissionRepository.save(testSubmission);
        return ResponseEntity.ok(testSubmission);
    }


    @PutMapping("/accept/{id}")
    public ResponseEntity<Void> accept(@PathVariable long id) {
        if (id == 0 || id <= 0) {
            return ResponseEntity.badRequest().build();
        }
        String s = testSubmissionService.acceptUser(id);
        if (s.equals("email send successfully")) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/reject/{id}")
    public ResponseEntity<Void> reject(@PathVariable long id) {
        if (id == 0 || id <= 0) {
            return ResponseEntity.badRequest().build();
        }
        String s = testSubmissionService.rejectUser(id);
        if (s.equals("email send successfully")) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    //////////////
    @PostMapping("/problem-answers/{id}")
    public ResponseEntity<?> setProblemAnswer(@PathVariable long id ,@RequestBody TestSubmission testSubmission) {
        TestSubmission savedAnswer = testSubmissionService.addAnswers(id,testSubmission);
        return ResponseEntity.ok(savedAnswer);
    }
    @PutMapping("/problem-answers/{id}")
    public ResponseEntity<TestSubmission> setProblemAnswers(@PathVariable Long id, @RequestBody List<ProblemAnswer> problemAnswers) {
        TestSubmission testSubmission = testSubmissionService.setProblemAnswers(id, problemAnswers);
        return ResponseEntity.ok(testSubmission);
    }
    @PutMapping("/quiz-answers/{id}")
    public ResponseEntity<TestSubmission> setQuizAnswers(@PathVariable Long id, @RequestBody List<QuizAnswer> quizAnswers) {
        TestSubmission testSubmission = testSubmissionService.setQuizAnswers(id, quizAnswers);
        return ResponseEntity.ok(testSubmission);
    }








}
