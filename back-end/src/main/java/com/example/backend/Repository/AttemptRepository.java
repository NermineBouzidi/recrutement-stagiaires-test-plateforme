package com.example.backend.Repository;

import com.example.backend.Entity.Attempt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttemptRepository extends JpaRepository <Attempt, Integer> {
}
