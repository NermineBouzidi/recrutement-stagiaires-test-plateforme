package com.example.backend.Controller;

import com.example.backend.Entity.Problem;
import com.example.backend.Entity.Quiz;
import com.example.backend.Service.ProblemService;
import com.example.backend.Service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Secured("hasRole('USER')")
@RequestMapping("/api/test")
public class TestController {
    @Autowired
    QuizService quizService;
    @Autowired
    ProblemService problemService;
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
}
