package com.example.backend.Repository;

import com.example.backend.Entity.Choice;
import com.example.backend.Entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChoiceRepository extends JpaRepository<Choice, Long> {

}
