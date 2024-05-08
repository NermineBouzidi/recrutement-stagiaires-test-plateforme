package com.example.backend.Repository;

import com.example.backend.Entity.SonarQubeAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SonarQubeAnalysisRepository extends JpaRepository<SonarQubeAnalysis, Long> {
}
