package com.example.backend.Service.Implementation;

import com.example.backend.Entity.Test;
import com.example.backend.Entity.TestSubmission;
import com.example.backend.Entity.User;
import com.example.backend.Repository.TestSubmissionRepository;
import com.example.backend.Service.TestSubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TestSubmissionImp implements TestSubmissionService {
    @Autowired
    TestSubmissionRepository testSubmissionRepository;
    public void assignTestToUser(Test test, User user) {
        TestSubmission testSubmission = new TestSubmission();
        testSubmission.setTest(test);
        testSubmission.setUser(user);
        // You can set other attributes such as score and isPassed as needed
        testSubmissionRepository.save(testSubmission);
    }
}
