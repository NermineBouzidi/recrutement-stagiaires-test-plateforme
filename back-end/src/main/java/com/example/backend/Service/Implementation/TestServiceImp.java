package com.example.backend.Service.Implementation;

import com.example.backend.Entity.Quiz;
import com.example.backend.Entity.Test;
import com.example.backend.Repository.TestRepository;
import com.example.backend.Service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class TestServiceImp implements TestService {
    @Autowired
    TestRepository testRepository;

    public Test getTest(long id) {
        Optional<Test> test = testRepository.findById(id);
        if (test.isPresent()) {
            return test.get();
        } else {
            throw new NoSuchElementException("Test with ID " + id + " not found");

        }

    }

    public String addTest(Test test) {
        if (testRepository.findByTitle(test.getTitle()) != null) {
            return "test existe";
        } else {
            testRepository.save(test);
            return "test added successfully";
        }
    }
    public String addQuiz(Quiz test) {
        if (testRepository.findByTitle(test.getTitle()) != null) {
            return "test existe";
        } else {
            testRepository.save(test);
            return "test added successfully";
        }
    }

    public String deleteTest(long id) {
        Optional<Test> test = testRepository.findById(id);
        if (!test.isPresent()) {
            return "test not found";
        } else {
            testRepository.deleteById(id);
            return "succes";

        }
    }



    public List<Test> getTests() {
        List<Test> liste = testRepository.findAll();
        return liste;
    }

    @Override
    public String updateTest(long id, Test test) {
        Optional<Test> existingTest = testRepository.findById(id);
        if (existingTest.isPresent()) {
            Test testE = existingTest.get();
            testE.setTitle(test.getTitle());
            testE.setCategory(test.getCategory());
            Test savedTest = testRepository.save(testE);
            return "test updated successfully";
        } else {
            return "update failed";
        }
    }
}
