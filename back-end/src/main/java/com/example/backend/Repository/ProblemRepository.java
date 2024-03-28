package com.example.backend.Repository;

import com.example.backend.Entity.Problem;
import com.example.backend.Entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemRepository extends JpaRepository<Problem , Long> {
    public Problem findByTitle(String title);

}


