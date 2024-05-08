package com.example.backend.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

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
    private String difficulty ;
    private int duration;
    private String description;
    private int points;
    private List<String> category;

}
