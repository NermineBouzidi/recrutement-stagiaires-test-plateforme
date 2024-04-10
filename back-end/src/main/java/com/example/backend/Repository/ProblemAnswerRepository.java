package com.example.backend.Repository;

import com.example.backend.Entity.ProblemAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemAnswerRepository extends JpaRepository<ProblemAnswer,Long> {
}
