package com.example.backend.Service;

import com.example.backend.Entity.Test;
import com.example.backend.Entity.User;

public interface TestSubmissionService {
    void assignTestToUser(Test test, User user);
}
