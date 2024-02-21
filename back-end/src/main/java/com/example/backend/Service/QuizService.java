package com.example.backend.Service;

import com.example.backend.Entity.Quiz;
import com.example.backend.Entity.Test;

import java.util.List;
import java.util.Optional;

public interface QuizService {
    String addQuiz(Quiz test);
    String deleteQuiz(long id);
    List<Quiz> getAllQuiz();
    String updateQuiz(long id,Quiz quiz);
    Optional<Quiz> getQuiz(long id);

}
