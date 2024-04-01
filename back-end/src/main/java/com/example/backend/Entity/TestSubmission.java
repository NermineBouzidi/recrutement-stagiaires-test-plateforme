package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TestSubmission{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id ;
    @ManyToOne
    private Test test;
    @ManyToOne
    private User user;
    private Integer score;
    private boolean isPassed;

}
