package com.example.backend.Repository;

import com.example.backend.Entity.Enum.TestCategory;
import com.example.backend.Entity.Quiz;
import com.example.backend.Entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestRepository extends JpaRepository<Test, Long> {
    public List<Test> findByCategory(String category);

}
