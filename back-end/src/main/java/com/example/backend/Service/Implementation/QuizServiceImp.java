package com.example.backend.Service.Implementation;

import com.example.backend.Entity.Quiz;
import com.example.backend.Entity.Test;
import com.example.backend.Repository.QuizRepository;
import com.example.backend.Service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class QuizServiceImp implements QuizService {
    @Autowired
    QuizRepository quizRepository;
    @Override
    public String addQuiz(Quiz quiz) {
        if (quizRepository.findByTitle(quiz.getTitle()) != null) {
            return "quiz existe";
        } else {
            quizRepository.save(quiz);
            return "quiz added successfully";
        }

    }

    @Override
    public String deleteQuiz(long id) {
        Optional<Quiz> test = quizRepository.findById(id);
        if (!test.isPresent()) {
            return "quiz not found";
        } else {
            quizRepository.deleteById(id);
            return "succes";

        }
    }

    @Override
    public List<Quiz> getAllQuiz() {
        return quizRepository.findAll();
    }

    @Override
    public List<Quiz> getRandomQuiz() {
        return quizRepository.findAll();
    }

    @Override
    public String updateQuiz(long id, Quiz quiz) {

        Optional<Quiz> existingQuiz = quizRepository.findById(id);
        if (existingQuiz.isPresent()) {
            Quiz quiz1 = existingQuiz.get();
            quiz1.setTitle(quiz.getTitle());
            quiz1.setQuestion(quiz.getQuestion());
            quiz1.setQuestionType(quiz.getQuestionType());
            quiz1.setChoices(quiz.getChoices());
            quiz1.setAnswers(quiz.getAnswers());
            Quiz savedQuiz = quizRepository.save(quiz1);
            return "quiz updated successfully";
        } else {
            return "update failed";
        }

    }

    @Override
    public Optional<Quiz> getQuiz(long id) {
      return quizRepository.findById(id);
    }
}
