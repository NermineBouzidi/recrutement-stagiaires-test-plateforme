package com.example.backend.Controller;

import com.example.backend.Entity.Quiz;
import com.example.backend.Service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/quiz")
public class QuizController {
    @Autowired
    QuizService quizService;
    @PostMapping("/addQuiz")
    public ResponseEntity<String> addTest(@RequestBody Quiz quiz) {
        String s = quizService.addQuiz(quiz);
        if (s.equals("quiz added successfully")) {
            return ResponseEntity.ok("quiz added successfully");
        } else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(s);

    }
    @DeleteMapping("/deleteQuiz/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable long id) {
        if (id == 0 || id <= 0) {
            return ResponseEntity.badRequest().build();
        }
        String s = quizService.deleteQuiz(id);
        if (s.equals("succes")) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/getAllQuiz")
    public List<Quiz> getAllQuiz() {
        return quizService.getAllQuiz();
    }
    @PutMapping("/updateQuiz/{id}")
    public ResponseEntity<String> updateQuiz(@PathVariable long id,@RequestBody Quiz quiz) {
        String s = quizService.updateQuiz(id,quiz);
        if (s.equals("quiz updated successfully")) {
            return ResponseEntity.ok("quiz updated successfully");
        } else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(s);
    }
    @GetMapping("/getQuiz/{id}")
    public  ResponseEntity<Quiz> getQuiz(@PathVariable long id){
        return quizService.getQuiz(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
