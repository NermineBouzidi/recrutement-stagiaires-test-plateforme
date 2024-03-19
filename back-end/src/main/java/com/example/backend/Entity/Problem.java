package com.example.backend.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long  id ;
    private String title;
    private String language;
    private int duration;
    private String description;
    private String input;
    private String output;
    private int points;

}
