package com.example.backend.Entity;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ShortAnswerQuestion extends Quiz {

    private String answerPattern; // Optional: Regular expression for answer validation

    // Getters, setters, and constructor (omitted for brevity)
}
