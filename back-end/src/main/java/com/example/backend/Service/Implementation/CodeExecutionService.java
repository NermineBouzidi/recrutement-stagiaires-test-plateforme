package com.example.backend.Service.Implementation;

import com.example.backend.DTO.ExecutionResult;
import com.example.backend.DTO.ProcessResult;
import com.example.backend.Service.CodeExecution;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Service
@Slf4j

public class CodeExecutionService implements CodeExecution {

    // Temporary directory for virtual environments (adjust path)
    private final String tempDir = "/tmp/code_execution";


    public ExecutionResult executeCode(String submittedCode) {
        try {
            // 1. Create temporary virtual environment
            String venvName = createVirtualEnvironment();

            // 2. Install dependencies (optional, explained later)
             installDependencies(venvName, submittedCode);

            // 3. Write code to temporary file
            String scriptPath = writeCodeToFile(submittedCode, venvName);

            // 4. Execute the script
            ProcessResult processResult = executeScript(scriptPath, venvName);

            // 5. Clean up (deactivate and delete)
            cleanUp(venvName);

            return new ExecutionResult(processResult.getOutput(), processResult.getError());

        } catch (Exception e) {
            log.error("Error executing code: " + e.getMessage());
            return new ExecutionResult(null, e.getMessage());
        }
    }

    private String createVirtualEnvironment() throws IOException, InterruptedException {
        String venvName = UUID.randomUUID().toString();
        try {
            ProcessBuilder processBuilder = new ProcessBuilder("python3", "-m", "venv", tempDir + "/" + venvName);
            processBuilder.redirectErrorStream(true); // Combine standard output and error
            Process process = processBuilder.start();
            process.waitFor();
        } catch (InterruptedException e) {
            log.error("Interruption occurred during virtual environment creation: {}", e.getMessage());
            throw e; // Re-throw the exception for handling at a higher level (optional)
        }
        return venvName;
    }


    private void installDependencies(String venvName, String submittedCode) throws IOException, InterruptedException {
        // Analyze submittedCode to identify dependencies (example using regex)
        List<String> dependencies = extractDependencies(submittedCode);

        // Handle cases where no dependencies are found
        if (dependencies.isEmpty()) {
            log.info("No dependencies found in submitted code");
            return;
        }

        // Build the process builder for pip install command
        ProcessBuilder processBuilder = new ProcessBuilder(tempDir + "/" + venvName + "/bin/pip", "install");
        processBuilder.command().addAll(dependencies);
        // Combine standard output and error streams for logging
        processBuilder.redirectErrorStream(true);

        // Start the process and wait for completion
        Process process = processBuilder.start();
        process.waitFor();

        // Check the exit code of the process (optional)
        int exitCode = process.exitValue();
        if (exitCode != 0) {
            log.error("Error installing dependencies: " + new String(process.getInputStream().readAllBytes()));
        }
    }

    // Sample method for dependency extraction using regex (replace with your preferred logic)
    private List<String> extractDependencies(String submittedCode) {
        List<String> dependencies = new ArrayList<>();
        Pattern importPattern = Pattern.compile("import (\\w+)", Pattern.CASE_INSENSITIVE);
        Matcher matcher = importPattern.matcher(submittedCode);
        while (matcher.find()) {
            dependencies.add(matcher.group(1));
        }
        return dependencies;
    }

    private String writeCodeToFile(String submittedCode, String venvName) throws IOException {
        String scriptName = UUID.randomUUID().toString() + ".py"; // Generate unique filename
        String scriptPath = tempDir + "/" + venvName + "/" + scriptName;

        // Create a new file
        Path scriptFile = Paths.get(scriptPath);
        Files.write(scriptFile, submittedCode.getBytes(StandardCharsets.UTF_8));

        return scriptPath;
    }
    private ProcessResult executeScript(String scriptPath, String venvName) throws IOException, InterruptedException {
        // Build the process builder for script execution
        ProcessBuilder processBuilder = new ProcessBuilder(tempDir + "/" + venvName + "/bin/python", scriptPath);

        // Redirect standard output and error streams
        processBuilder.redirectOutput(ProcessBuilder.Redirect.PIPE);
        processBuilder.redirectErrorStream(true); // Combine standard output and error

        // Start the process and capture output/error
        Process process = processBuilder.start();
        String output = new String(process.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
        String error = process.getErrorStream().readAllBytes().length > 0 ? new String(process.getErrorStream().readAllBytes(), StandardCharsets.UTF_8) : "";

        // Wait for process to finish
        process.waitFor();

        return new ProcessResult(output, error);
    }

    private void cleanUp(String venvName) throws IOException {
        // Deactivate virtual environment (replace with your command if necessary)
        try {
            ProcessBuilder deactivateBuilder = new ProcessBuilder("source", tempDir + "/" + venvName + "/bin/deactivate");
            deactivateBuilder.redirectErrorStream(true); // Combine standard output and error
            Process deactivateProcess = deactivateBuilder.start();
            deactivateProcess.waitFor();

            // Delete the virtual environment directory
            Files.deleteIfExists(Paths.get(tempDir + "/" + venvName));
        } catch (InterruptedException e) {
            log.error("Interruption occurred during cleanup: " + e.getMessage());
        }
    }
}

