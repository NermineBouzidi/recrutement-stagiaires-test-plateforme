package com.example.backend.Repository;

import com.example.backend.Entity.Quiz;
import com.example.backend.Entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    public Quiz findByTitle(String title);

}
