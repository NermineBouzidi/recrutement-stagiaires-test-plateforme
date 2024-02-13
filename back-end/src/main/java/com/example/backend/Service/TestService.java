package com.example.backend.Service;

import com.example.backend.Entity.TestEntity;
import com.example.backend.Entity.User;

import java.util.List;

public interface TestService {
    TestEntity getTest(long id);
    String addTest (TestEntity testEntity);
    String deleteTest(long id);
    List <TestEntity> getTests();
    String updateTest(long id,TestEntity testEntity);
}
