package com.example.backend.Controller;

import com.example.backend.Entity.Problem;
import com.example.backend.Entity.Quiz;
import com.example.backend.Entity.Test;
import com.example.backend.Service.ProblemService;
import com.example.backend.Service.QuizService;
import com.example.backend.Service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Secured("hasRole('USER')")
@RequestMapping("/api/test")
public class TestController {
    @Autowired
    QuizService quizService;
    @Autowired
    ProblemService problemService;
    @Autowired
    TestService testService;
    @GetMapping("/getAllQuiz")
    public ResponseEntity<List<Quiz>> getAllQuiz() {
        List <Quiz> quizzes =quizService.getAllQuiz();
        return new ResponseEntity<>(quizzes, HttpStatus.OK);
    }
    @GetMapping("/getAllProblem")
    public ResponseEntity<List<Problem>> getAllProblems() {
        List<Problem> problems = problemService.getAllProblems();
        return new ResponseEntity<>(problems, HttpStatus.OK);
    }
    @PostMapping("addTest")
    public ResponseEntity<String> createTest(@RequestBody Test test) {
        try {
            Test savedTest=testService.addTest(test);
            return ResponseEntity.ok("Test added successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @PutMapping("/updateTest/{testId}")
    public ResponseEntity<?> updateTest(@PathVariable Long testId, @RequestBody Test test) {
        try {
            Test updatedTest = testService.updateTest(testId, test);
            return new ResponseEntity<>(updatedTest, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @DeleteMapping("/deleteTest/{problemId}")
    public ResponseEntity<?> deleteTest(@PathVariable long testId) {
        try {
            testService.deleteTest(testId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // No content to return on successful deletion
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @GetMapping("/getTest/{testId}")
    public ResponseEntity<Test> getTestById(@PathVariable Long testId) {
        Optional<Test> optionalTest = testService.getTestById(testId);
        return optionalTest.map(problem -> new ResponseEntity<>(problem, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @GetMapping("/getAllTest")
    public ResponseEntity<List<Test>> getAllTests() {
        List<Test> tests = testService.getAllTests();
        return new ResponseEntity<>(tests, HttpStatus.OK);
    }
}
