package com.example.backend.Service.Implementation;

import com.example.backend.Entity.TestEntity;
import com.example.backend.Entity.User;
import com.example.backend.Repository.TestRepository;
import com.example.backend.Service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestServiceImp implements TestService {
    @Autowired
    TestRepository testRepository;
    public TestEntity getTest(long id) {
        TestEntity test =testRepository.findById(id);
        return  test;
    }

    public String addTest(TestEntity testEntity) {
        if (testRepository.findByTitle(testEntity.getTitle()) !=null){
            return "test existe";
        }else {
            testRepository.save(testEntity);
            return  "test added successfully";
        }
    }

    public String deleteTest(long id) {
        TestEntity test =testRepository.findById(id);
        if (test == null) {
            return "user not found";
        }else {
            testRepository.deleteById(id);
            return "succes";

        }
    }

    public void updateTest(long id) {

    }

    public List <TestEntity> getTests() {
        List <TestEntity> liste =testRepository.findAll();
        return liste ;
    }
}
