package com.example.backend.Controller;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
@RestController
@RequestMapping("/analyze")
public class CodeAnalyzerController {

    @Value("${sonar.host.url}")
    private String sonarHostUrl;

    @Value("${sonar.login}")
    private String sonarLogin;

    @Value("${custom.temp.directory}")
    private Resource TempDir;

    @Bean
    public Path tempDirectoryPath(ResourceLoader resourceLoader) throws IOException {
        // Load the custom temp directory path
        Path customDirPath = Paths.get(TempDir.getURI());

        // Create the temp directory if it doesn't exist
        if (!Files.exists(customDirPath)) {
            Files.createDirectories(customDirPath);
        }

        return customDirPath;
    }
    @PostMapping
    public ResponseEntity<Map<String, Object>> analyzeCode(@RequestBody CodeRequest codeRequest) throws Exception {
        String projectKey = "project-" + UUID.randomUUID();


        if (!Files.exists(customDirPath)) {
            Files.createDirectories(customDirPath);
        }
        // Save code to a temporary file
        Path tempDir = Files.createTempDirectory(customDirectory, "sonar-code-" + UUID.randomUUID());
        Path tempFile = Files.createFile(Paths.get(tempDir.toString(), "TempCode.java"));
        Files.write(tempFile, codeRequest.getCode().getBytes());

        // Run SonarQube analysis
        runSonarScanner(projectKey, tempDir.toString());

        // Retrieve analysis results
        Map<String, Object> analysisResult = getSonarQubeAnalysis(projectKey);

        // Cleanup temporary files
        if (Files.exists(tempFile)) {
            Files.delete(tempFile);
        } else {
            throw new RuntimeException("Temporary file does not exist: " + tempFile.toString());
        }

        if (Files.exists(tempDir)) {
            Files.delete(tempDir);
        } else {
            throw new RuntimeException("Temporary directory does not exist: " + tempDir.toString());
        }

        return ResponseEntity.ok(analysisResult);
    }

    private void runSonarScanner(String projectKey, String sourcePath) throws Exception {
        ProcessBuilder builder = new ProcessBuilder(
                "sonar-scanner",
                "-Dsonar.projectKey=" + projectKey,
                "-Dsonar.sources=" + sourcePath,
                "-Dsonar.host.url=" + sonarHostUrl,
                "-Dsonar.login=" + sonarLogin
        );
        Process process = builder.start();
        int exitCode = process.waitFor();
        if (exitCode != 0) {
            throw new RuntimeException("SonarQube analysis failed");
        }
    }

    private Map<String, Object> getSonarQubeAnalysis(String projectKey) {
        String url = sonarHostUrl + "/api/project_analyses/search?project=" + projectKey;

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            return response.getBody();
        } else {
            throw new RuntimeException("Failed to retrieve SonarQube analysis results");
        }
    }

    public static class CodeRequest {
        private String code;

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }
    }
}