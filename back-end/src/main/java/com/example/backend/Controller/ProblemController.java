package com.example.backend.Controller;

import com.example.backend.Entity.Problem;
import com.example.backend.Service.ProblemService;
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
@RequestMapping("/api/problem")
public class ProblemController {
    @Autowired
    ProblemService problemService;
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
