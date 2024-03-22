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
public class Quiz  {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id ;
    String title ;
    private String question ;
    @Enumerated(EnumType.STRING)
    private QuestionType questionType ;
    private Integer duration ;
    private Integer points ;


}

enum QuestionType {
    TRUE_FALSE,
    MULTIPLE_CHOICE,
    SHORT_ANSWER
}
