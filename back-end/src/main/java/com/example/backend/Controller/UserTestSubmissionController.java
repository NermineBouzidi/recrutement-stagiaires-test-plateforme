package com.example.backend.Controller;

import com.example.backend.DTO.TestAnswersRequest;
import com.example.backend.Entity.TestSubmission;
import com.example.backend.Entity.User;
import com.example.backend.Service.UserTestSubmission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Secured("hasRole('USER')")
@RequestMapping("/api/user-test")
public class UserTestSubmissionController {
    @Autowired
    UserTestSubmission userTestSubmission;

    @GetMapping("/assigned")
    public ResponseEntity<?> getAssignedTest(@RequestHeader("Authorization") String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = authorization.substring(7); // Extract token after "Bearer "
        return userTestSubmission.getAssignedTest(token); // Call the service function

    }
    @PutMapping("/set-answers/{id}")
    public ResponseEntity<TestSubmission> setAnswers(@PathVariable Long id , @RequestBody TestAnswersRequest testAnswersRequest){

        TestSubmission testSubmission =userTestSubmission.setAnswers(id,testAnswersRequest.getQuizAnswers(),testAnswersRequest.getProblemAnswers());
        return ResponseEntity.ok(testSubmission);

    }
}
