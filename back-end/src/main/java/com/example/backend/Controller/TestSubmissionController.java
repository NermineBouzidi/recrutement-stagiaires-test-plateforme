package com.example.backend.Controller;

import com.example.backend.DTO.ProblemAnswerDTO;
import com.example.backend.Entity.ProblemAnswer;
import com.example.backend.Entity.Test;
import com.example.backend.Entity.TestSubmission;
import com.example.backend.Entity.User;
import com.example.backend.Repository.TestSubmissionRepository;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Security.JwtUtils;
import com.example.backend.Service.TestSubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/userTest")
public class TestSubmissionController {
    @Autowired
    TestSubmissionRepository testSubmissionRepository;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    UserRepository userRepository;
    @Autowired
    TestSubmissionService testSubmissionService;
    @GetMapping("/assigned-test")
    public ResponseEntity<Test> getAssignedTestForUser(@RequestHeader("Authorization") String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = authorization.substring(7); // Extract token after "Bearer "

        // Validate token (implement your token validation logic here)
        User user = userRepository.findByEmail(jwtUtils.getUsername(token));

        if (user != null) {
            // Fetch the test assigned to the user from the testSubmissionRepository
            TestSubmission testSubmission = testSubmissionRepository.findByUser(user);

            if (testSubmission != null) {
                Test assignedTest = testSubmission.getTest();
                return ResponseEntity.ok(assignedTest);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    @GetMapping("/assigned")
    public ResponseEntity<?> getAssignedTest(@RequestHeader("Authorization") String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = authorization.substring(7); // Extract token after "Bearer "

        // Validate token (implement your token validation logic here)
        User user = userRepository.findByEmail(jwtUtils.getUsername(token));

        if (user != null) {
            // Fetch the test assigned to the user from the testSubmissionRepository
            TestSubmission testSubmission = testSubmissionRepository.findByUser(user);

            if (testSubmission != null) {
                return ResponseEntity.ok(testSubmission);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    @PostMapping("/problem-answers/{id}")
    public ResponseEntity<?> setProblemAnswer(@PathVariable long id ,@RequestBody TestSubmission testSubmission) {
        TestSubmission savedAnswer = testSubmissionService.addAnswers(id,testSubmission);
        return ResponseEntity.ok(savedAnswer);
    }


}
