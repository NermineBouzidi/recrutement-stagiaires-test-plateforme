package com.example.backend.Repository;

import com.example.backend.Entity.QuizAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizAnswerRepository extends JpaRepository<QuizAnswer,Long> {
}
