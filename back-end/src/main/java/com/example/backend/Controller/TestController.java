package com.example.backend.Controller;

import com.example.backend.Entity.TestEntity;
import com.example.backend.Repository.TestRepository;
import com.example.backend.Service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/test")
public class TestController {
    @Autowired
    private TestService testService;

    @GetMapping("/getTest")
    public TestEntity getTest(@RequestBody long id) {
        return testService.getTest(id);
    }

    @PostMapping("/addTest")
    public ResponseEntity<String> addTest(@RequestBody TestEntity testEntity) {
        String s = testService.addTest(testEntity);
        if (s.equals("test added successfully")) {
            return ResponseEntity.ok("test added successfully");
        } else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(s);

    }

    @GetMapping("/getTests")
    public List<TestEntity> getTests() {
        return testService.getTests();
    }

    @DeleteMapping("/deleteTest/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable long id) {
        if (id == 0 || id <= 0) {
            return ResponseEntity.badRequest().build();
        }
        String s = testService.deleteTest(id);
        if (s.equals("succes")) {
            return ResponseEntity.noContent().build();
        } else {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}