package com.example.backend.Controller;

import ch.qos.logback.core.testUtil.TeeOutputStream;
import com.example.backend.Entity.PythonRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.tools.*;
import java.io.*;
import java.net.URI;
import javax.tools.SimpleJavaFileObject;
import java.net.URI;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.Collections;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CompileController {
    @PostMapping("/api/compile")
    public String runPython(@RequestBody PythonRequest request) {
        try {
            // Execute Python script
            String output = executePython(request.getCode(), request.getInput());

            // Return response
            return "Received Code:\n" + request.getCode() + "\n\nReceived Input:\n" + request.getInput() + "\n\nOutput from Python:\n" + output;
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return "Error during Python script execution: " + e.getMessage();
        }
    }

    private String executePython(String code, String input) throws IOException, InterruptedException {
        // Implement the logic to execute Python scripts and return the output
        Process process = Runtime.getRuntime().exec("python3 -c " + code + " " + input);
        int exitCode = process.waitFor();

        if (exitCode == 0) {
            // If the process exits successfully (exit code 0), capture and return the output
            return new String(process.getInputStream().readAllBytes());
        } else {
            // If there is an error, capture and return the error message
            return "Error during script execution:\n" + new String(process.getErrorStream().readAllBytes());
        }
    }
}