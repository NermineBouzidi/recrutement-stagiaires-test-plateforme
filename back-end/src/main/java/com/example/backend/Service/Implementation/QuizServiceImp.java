package com.example.backend.Service.Implementation;

import com.example.backend.Entity.Choice;
import com.example.backend.Entity.MultipleChoiceQuestion;
import com.example.backend.Entity.Quiz;
import com.example.backend.Entity.TrueFalseQuestion;
import com.example.backend.Repository.QuizRepository;
import com.example.backend.Service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizServiceImp implements QuizService {
    @Autowired
    QuizRepository quizRepository;

    @Override
    public String AddQuiz(Quiz quiz) {
        if (quizRepository.findByTitle(quiz.getTitle()) != null) {
            return "quiz existe";
        } else {
            quizRepository.save(quiz);
            return "quiz added successfully";
        }

    }
    /*@Override
    public  MultipleChoiceQuestion addMultipleChoice(MultipleChoiceQuestion multipleChoiceQuestion){
        Quiz existingQuiz = quizRepository.findByTitle(multipleChoiceQuestion.getTitle()); // Example using title for uniqueness

        if (existingQuiz != null) {
            throw new IllegalArgumentException("A quiz with the same title already exists.");
        }        if (multipleChoiceQuestion.getTitle() == null || multipleChoiceQuestion.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Quiz title is required.");
        }
       /* if (multipleChoiceQuestion.getQuestionType() == null) {
            throw new IllegalArgumentException("Quiz question type is required.");
        }
        if (multipleChoiceQuestion.getDuration() == null || multipleChoiceQuestion.getDuration() <= 0) {
            throw new IllegalArgumentException("Quiz duration must be positive.");
        }
        if (multipleChoiceQuestion.getPoints() == null || multipleChoiceQuestion.getPoints() <= 0) {
            throw new IllegalArgumentException("Quiz points must be positive.");
        }
        return quizRepository.save(multipleChoiceQuestion);
    }*/

    @Override
    public TrueFalseQuestion addTrueFlase(TrueFalseQuestion trueFalseQuestion) {
        Quiz existingQuiz = quizRepository.findByTitle(trueFalseQuestion.getTitle()); // Example using title for uniqueness

        if (existingQuiz != null) {
            throw new IllegalArgumentException("A quiz with the same title already exists.");
        }        if (trueFalseQuestion.getTitle() == null || trueFalseQuestion.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Quiz title is required.");
        }
      /*  if (trueFalseQuestion.getQuestionType() == null) {
            throw new IllegalArgumentException("Quiz question type is required.");
        }*/
        if (trueFalseQuestion.getDuration() == null || trueFalseQuestion.getDuration() <= 0) {
            throw new IllegalArgumentException("Quiz duration must be positive.");
        }
        if (trueFalseQuestion.getPoints() == null || trueFalseQuestion.getPoints() <= 0) {
            throw new IllegalArgumentException("Quiz points must be positive.");
        }
        return quizRepository.save(trueFalseQuestion);
    }

    @Override
    public void updateTrueFalse(long id ,TrueFalseQuestion trueFalseQuestion) {
        if (id <0) {
            throw new IllegalArgumentException("Quiz ID cannot be negative");
        }
        if (trueFalseQuestion == null) {
            throw new IllegalArgumentException("Quiz object cannot be null");
        }
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Problem not found with id: " + id));
        TrueFalseQuestion existingQuiz = (TrueFalseQuestion) quiz;
        if (trueFalseQuestion.getTitle()!=null){
            existingQuiz.setTitle(trueFalseQuestion.getTitle());
        }
        if (trueFalseQuestion.getQuestion()!=null){
            existingQuiz.setQuestion(trueFalseQuestion.getQuestion());
        }
        if (trueFalseQuestion.getDuration()!=null){
            existingQuiz.setDuration(trueFalseQuestion.getDuration());
        }
        if (trueFalseQuestion.getPoints()!=null){
            existingQuiz.setPoints(trueFalseQuestion.getPoints());
        }
        existingQuiz.setCorrectAnswer(trueFalseQuestion.isCorrectAnswer());
        quizRepository.save(existingQuiz);
    }

    @Override
    public Quiz addMultipleChoice(MultipleChoiceQuestion quiz) {
        Quiz existingQuiz = quizRepository.findByTitle(quiz.getTitle()); // Example using title for uniqueness

        if (existingQuiz != null) {
            throw new IllegalArgumentException("A quiz with the same title already exists.");
        }
        if (quiz.getTitle() == null || quiz.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Quiz title is required.");
        }
       /* if (quiz.getQuestionType() == null) {
            throw new IllegalArgumentException("Quiz question type is required.");
        }*/
        if (quiz.getDuration() == null || quiz.getDuration() <= 0) {
            throw new IllegalArgumentException("Quiz duration must be positive.");
        }
        if (quiz.getPoints() == null || quiz.getPoints() <= 0) {
            throw new IllegalArgumentException("Quiz points must be positive.");
        }

            List<Choice> choices = quiz.getChoices();
            if (choices != null) {
                for (Choice choice : choices) {
                    choice.setMultipleChoiceQuestion(quiz);
                }
            }
        // Save the quiz to the database
        return quizRepository.save(quiz);
    }

    @Override
    public void deleteQuiz(long id) {
        if (id <= 0) {
            throw new IllegalArgumentException("Invalid quiz ID: " + id);
        }
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Quiz not found with id: " + id));
        quizRepository.delete(quiz);


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
        if (id <0) {
            throw new IllegalArgumentException("Problem ID cannot be negative");
        }
        if (quiz == null) {
            throw new IllegalArgumentException("Quiz object cannot be null");
        }
        Quiz existingQuiz = quizRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Problem not found with id: " + id));
        if (quiz.getTitle()!=null){
            existingQuiz.setTitle(quiz.getTitle());
        }
        if (quiz.getQuestion()!=null){
            existingQuiz.setQuestion(quiz.getQuestion());
        }
       /* if(quiz.getQuestionType()!=null){
            existingQuiz.setQuestionType(quiz.getQuestionType());
        }*/
       if (quiz.getDuration()!=null){
    existingQuiz.setDuration(quiz.getDuration());
    }
if(quiz.getPoints()!=null){
    existingQuiz.setPoints(quiz.getPoints());

}
/*if(quiz.getChoices()!=null){
    existingQuiz.setChoices(quiz.getChoices());
}*/
 quizRepository.save(existingQuiz);

        return "Quiz updated successfully";
    }


    @Override
    public Optional<Quiz> getQuiz(long id) {
      return quizRepository.findById(id);
    }
}
