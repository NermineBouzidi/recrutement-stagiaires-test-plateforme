package com.example.backend.Repository;

import com.example.backend.Entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepository extends JpaRepository<Test, Long> {
    public Test findByTitle(String title);
    //public TestEntity  findById(long id);

}
