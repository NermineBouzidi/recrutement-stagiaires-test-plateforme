package com.example.backend.Controller;

import com.example.backend.Entity.TestEntity;
import com.example.backend.Service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/test")
public class TestController {
    @Autowired
    private TestService testService;
   @GetMapping("/getTest")
    public TestEntity getTest (@RequestBody long id){
      return testService.getTest(id);
    }
    @PostMapping("/addTest")
    public String addTest(@RequestBody TestEntity testEntity){
      return  testService.addTest(testEntity);
    }

    @GetMapping("/getTests")
    public List<TestEntity> getTests (){
        return testService.getTests();
    }
}
