package com.example.backend.Service.Implementation;

import com.example.backend.Entity.Enum.TestCategory;
import com.example.backend.Entity.Problem;
import com.example.backend.Entity.Quiz;
import com.example.backend.Entity.Test;
import com.example.backend.Repository.QuizRepository;
import com.example.backend.Repository.TestRepository;
import com.example.backend.Service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TestServiceImpl implements TestService {
    @Autowired
    TestRepository testRepository;
    @Autowired
    QuizRepository quizRepository;

    @Override
    public Test addTest(Test test) {
        if (test == null) {
            throw new IllegalArgumentException("Test cannot be null");
        }
        if (test.getPassingPercentage() <= 0 ) {
        throw new IllegalArgumentException("Passing Percentage must be positive");
        }
        List<Quiz> existingQuizzes = quizRepository.findAllById(test.getQuizzes().stream().map(Quiz::getId).collect(Collectors.toList()));
        test.setQuizzes(existingQuizzes);
        return testRepository.save(test);
        }

    @Override
    public Test updateTest(Long testId, Test test) {
        if (testId <0) {
            throw new IllegalArgumentException("Test ID cannot be negative");
        }
        if ( test == null) {
            throw new IllegalArgumentException("Test object cannot be null");
        }
        Test existingTest = testRepository.findById(testId)
                .orElseThrow(() -> new IllegalArgumentException("Test not found with id: " + testId));
        test.setId(testId);
        return testRepository.save(test);
    }


    @Override
    public List<Test> getAllTests() {
        return testRepository.findAll();
    }

    @Override
    public Optional<Test> getTestById(Long testId) {
        return testRepository.findById(testId);
    }

    @Override
    public void deleteTest(long testId) {
        if (testId <= 0) {
            throw new IllegalArgumentException("Invalid test ID: " + testId);
        }
        // Check if the problem exists
        Test existingTest = testRepository.findById(testId)
                .orElseThrow(() -> new IllegalArgumentException("Test not found with id: " + testId));

        // Delete the problem
        testRepository.delete(existingTest);
    }
    public List<Test> getTestsByCategory(String category) {
        return testRepository.findByCategory(category);
    }

}
