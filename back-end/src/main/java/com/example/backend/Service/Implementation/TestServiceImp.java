package com.example.backend.Service.Implementation;

import com.example.backend.Entity.TestEntity;
import com.example.backend.Entity.User;
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

    public TestEntity getTest(long id) {
        Optional<TestEntity> test = testRepository.findById(id);
        if (test.isPresent()) {
            return test.get();
        } else {
            throw new NoSuchElementException("Test with ID " + id + " not found");

        }

    }

    public String addTest(TestEntity testEntity) {
        if (testRepository.findByTitle(testEntity.getTitle()) != null) {
            return "test existe";
        } else {
            testRepository.save(testEntity);
            return "test added successfully";
        }
    }

    public String deleteTest(long id) {
        Optional<TestEntity> test = testRepository.findById(id);
        if (!test.isPresent()) {
            return "test not found";
        } else {
            testRepository.deleteById(id);
            return "succes";

        }
    }



    public List<TestEntity> getTests() {
        List<TestEntity> liste = testRepository.findAll();
        return liste;
    }

    @Override
    public String updateTest(long id, TestEntity testEntity) {
        Optional<TestEntity> existingTest = testRepository.findById(id);
        if (existingTest.isPresent()) {
            TestEntity test = existingTest.get();
            test.setTitle(testEntity.getTitle());
            test.setCategory(testEntity.getCategory());
            TestEntity savedTest = testRepository.save(test);
            return "test updated successfully";
        } else {
            return "update failed";
        }
    }
}
