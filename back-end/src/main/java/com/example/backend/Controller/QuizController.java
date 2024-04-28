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
@Secured("hasRole('ADMIN','EVALUATOR')")
@RequestMapping("/api/quiz")
public class QuizController {
    @Autowired
    QuizService quizService;
    @Autowired
    ProblemService problemService;
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
    public ResponseEntity<?> updateQuiz(@PathVariable long id,@RequestBody Quiz quiz) {
        try {
            quizService.updateQuiz(id,quiz);
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

    //------------------------Problems -------------------------------------
    @PostMapping("addProblem")
    public ResponseEntity<String> createProblem(@RequestBody Problem problem) {
        try {
            Problem savedProblem=problemService.addProblem(problem);
            return ResponseEntity.ok("Problem added successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @PutMapping("/updateProblem/{problemId}")
    public ResponseEntity<?> updateProblem(@PathVariable Long problemId, @RequestBody Problem problem) {
        try {
            Problem updatedProblem = problemService.updateProblem(problemId, problem);
            return new ResponseEntity<>(updatedProblem, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @DeleteMapping("/deleteProblem/{problemId}")
    public ResponseEntity<?> deleteProblem(@PathVariable long problemId) {
        try {
            problemService.deleteProblem(problemId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // No content to return on successful deletion
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @GetMapping("/getProblem/{problemId}")
    public ResponseEntity<Problem> getProblemById(@PathVariable Long problemId) {
        Optional<Problem> optionalProblem = problemService.getProblemById(problemId);
        return optionalProblem.map(problem -> new ResponseEntity<>(problem, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @GetMapping("/getAllProblem")
    public ResponseEntity<List<Problem>> getAllProblems() {
        List<Problem> problems = problemService.getAllProblems();
        return new ResponseEntity<>(problems, HttpStatus.OK);
    }
}
