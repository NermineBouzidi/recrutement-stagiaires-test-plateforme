package com.example.backend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "question_type", discriminatorType = DiscriminatorType.STRING)
public class Quiz  {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id ;
    private String difficulty ;
    private String title;
    private String question ;
    private Integer duration ;
    private Integer points ;
    private List<String> category;

    public String getQuestionType() {
      return this.getClass().getSimpleName();

    }



}

