package com.example.backend.Controller;

import com.example.backend.Entity.MultipleChoiceQuestion;
import com.example.backend.Entity.Problem;
import com.example.backend.Entity.Quiz;
import com.example.backend.Entity.TrueFalseQuestion;
import com.example.backend.Service.ProblemService;
import com.example.backend.Service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Secured("hasRole('EVALUATOR')")
@RequestMapping("/api/quiz")
public class QuizController {
    @Autowired
    QuizService quizService;

    @PostMapping("/addQuiz")
    public ResponseEntity<String> addTest(@RequestBody Quiz quiz) {
        String s = quizService.AddQuiz(quiz);
        if (s.equals("quiz added successfully")) {
            return ResponseEntity.ok("quiz added successfully");
        } else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(s);

    }
    @PostMapping("/addMulti")
    public ResponseEntity<String> createMulti(@RequestBody MultipleChoiceQuestion quiz) {
        try {
            quizService.addMultipleChoice(quiz);
            return ResponseEntity.ok("quiz added successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/addTrueFalse")
    public ResponseEntity<String> createTrueFalse(@RequestBody TrueFalseQuestion quiz) {
        try {
            Quiz savedQuiz = quizService.addTrueFlase(quiz);
            return ResponseEntity.ok("quiz added successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/updateTrueFalse/{id}")
    public ResponseEntity<?> updateTrueFalse(@PathVariable long id,@RequestBody TrueFalseQuestion quiz) {
        try {
            quizService.updateTrueFalse(id,quiz);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


    @DeleteMapping("/deleteQuiz/{id}")
    public ResponseEntity<?> deleteQuiz(@PathVariable long id) {
        try {
            quizService.deleteQuiz(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // No content to return on successful deletion
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


    @GetMapping("/getAllQuiz")
    public ResponseEntity<List<Quiz>> getAllQuiz() {
        List <Quiz> quizzes =quizService.getAllQuiz();
        return new ResponseEntity<>(quizzes, HttpStatus.OK);
    }

    @GetMapping("/getRandomQuiz")
    public List<Quiz> getRandomQuiz() {
        return quizService.getAllQuiz();
    }

    @PutMapping("/updateQuiz/{id}")
    public ResponseEntity<?> updateQuiz(@PathVariable long id,@RequestBody MultipleChoiceQuestion quiz) {
        try {
            quizService.updateMultiChoice(id,quiz);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @GetMapping("/getQuiz/{id}")
    public  ResponseEntity<Quiz> getQuiz(@PathVariable long id){
        return quizService.getQuiz(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


}
