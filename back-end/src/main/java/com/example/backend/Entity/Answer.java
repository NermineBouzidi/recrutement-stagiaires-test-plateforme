package com.example.backend.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @OneToOne(optional = false)  // Ensure a TestSubmission is always associated
    private TestSubmission testSubmission;
    @ManyToOne
    private Quiz quiz;
    @ManyToOne
    private  Problem problem;
    @Lob
    private String answerText;

}
