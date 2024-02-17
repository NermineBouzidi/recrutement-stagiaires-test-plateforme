package com.example.backend.Entity;

import jakarta.persistence.ElementCollection;

import java.util.List;

public class Quiz  extends TestEntity{
    private String question ;
    private String questionType ;
    @ElementCollection
    private List<String> choices;
    @ElementCollection
    private  List<String> correctAnswers;

    public Quiz(String question, String questionType, List<String> choices, List<String> correctAnswers) {
        this.question = question;
        this.questionType = questionType;
        this.choices = choices;
        this.correctAnswers = correctAnswers;
    }

    public Quiz(String title, TestCategory category, String question, String questionType, List<String> choices, List<String> correctAnswers) {
        super(title, category);
        this.question = question;
        this.questionType = questionType;
        this.choices = choices;
        this.correctAnswers = correctAnswers;
    }

    public Quiz() {
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public List<String> getChoices() {
        return choices;
    }

    public void setChoices(List<String> choices) {
        this.choices = choices;
    }

    public List<String> getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(List<String> correctAnswers) {
        this.correctAnswers = correctAnswers;
    }
}
