package com.example.backend.Service;

import com.example.backend.Entity.Test;

import java.util.List;

public interface TestService {
    Test getTest(long id);
    String addTest (Test test);
    String deleteTest(long id);
    List <Test> getTests();
    String updateTest(long id,Test test);
}
