package com.example.backend.Repository;

import com.example.backend.Entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemRepository extends JpaRepository<Problem , Integer> {
}
