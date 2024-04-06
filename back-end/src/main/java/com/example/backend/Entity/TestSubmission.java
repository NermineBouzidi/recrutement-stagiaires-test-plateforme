package com.example.backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @JsonBackReference // Use this annotation to prevent infinite recursion
    private Test test;
    @OneToOne(cascade = CascadeType.ALL ,orphanRemoval = true)// Enable orphan removal
    private User user;
    private Integer score;
    private boolean isPassed;
}
