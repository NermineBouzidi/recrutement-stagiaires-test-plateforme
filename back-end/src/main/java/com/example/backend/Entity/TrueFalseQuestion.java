package com.example.backend.Entity;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Data
public class TrueFalseQuestion extends Quiz {

    private boolean correctAnswer;
   /* public List<String> getAnswerOptions() {
        return Arrays.asList("True", "False");
    }*/
    // Getters, setters, and constructor (omitted for brevity)
}
