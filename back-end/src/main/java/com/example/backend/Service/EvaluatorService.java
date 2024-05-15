package com.example.backend.Service;

import com.example.backend.Entity.User;

import java.util.List;

public interface EvaluatorService {
    List<User> getAllEvaluator();
    String addEvaluator (User user );

}
