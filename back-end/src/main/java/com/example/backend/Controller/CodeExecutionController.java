package com.example.backend.Controller;

import com.example.backend.DTO.ExecutionResult;
import com.example.backend.Service.CodeExecution;
import com.example.backend.Service.Implementation.CodeExecutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/code")
public class CodeExecutionController {

    // Service to handle code execution logic (explained later)
@Autowired
    CodeExecution codeExecutionService;


    @PostMapping("/execute")
    public ResponseEntity<ExecutionResult> executeCode(@RequestBody String submittedCode) {
        ExecutionResult result = codeExecutionService.executeCode(submittedCode);
        return ResponseEntity.ok(result);
    }
}

