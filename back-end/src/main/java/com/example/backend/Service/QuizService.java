package com.example.backend.Service;

import com.example.backend.Entity.Quiz;

import java.util.List;
import java.util.Optional;

public interface QuizService {
    String AddQuiz(Quiz test);
    void deleteQuiz(long id);
    List<Quiz> getAllQuiz();
    List<Quiz> getRandomQuiz();
    Quiz addQuiz(Quiz quiz) ;

    String updateQuiz(long id,Quiz quiz);
    Optional<Quiz> getQuiz(long id);

}
