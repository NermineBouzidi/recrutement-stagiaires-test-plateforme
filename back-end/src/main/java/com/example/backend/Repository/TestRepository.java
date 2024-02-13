package com.example.backend.Repository;

import com.example.backend.Entity.TestEntity;
import com.example.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepository extends JpaRepository<TestEntity, Long> {
    public TestEntity findByTitle(String title);
    //public TestEntity  findById(long id);

}
