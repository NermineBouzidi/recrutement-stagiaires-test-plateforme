package com.example.backend.Service;

import com.example.backend.Entity.TestEntity;
import com.example.backend.Entity.User;

import java.util.List;

public interface TestService {
    TestEntity getTest(long id);
    String addTest (TestEntity testEntity);
    void deleteTest(long id);
    void updateTest(long id);
    List <TestEntity> getTests();
}
