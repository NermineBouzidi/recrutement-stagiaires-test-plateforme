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
public class SonarQubeAnalysis {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id ;
    private int bugs;
    private int vulnerabilities;
    private int codeCoverage;
    private int hotspotsReviewed;
}
