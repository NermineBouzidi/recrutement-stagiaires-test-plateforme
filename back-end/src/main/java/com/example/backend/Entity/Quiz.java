package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
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
    private String questionType ;   

    private Integer duration ;
    private Integer points ;
    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Choice> choices = new ArrayList<>();

}

