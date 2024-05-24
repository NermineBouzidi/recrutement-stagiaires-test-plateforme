package com.example.backend.Controller;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.sonarsource.scanner.api.EmbeddedScanner;
import org.sonarsource.scanner.api.LogOutput;
import org.sonarsource.scanner.api.StdOutLogOutput;

@RestController
@RequestMapping("/analyze")
public class CodeAnalyzerController {

    @Value("${sonar.host.url}")
    private String sonarHostUrl;

    @Value("${sonar.login}")
    private String sonarLogin;
    private final String FOLDER_PATH="C:/Users/nermi/Documents/pfe/Code/";


    @PostMapping
    public ResponseEntity<Map<String, Object>> analyzeCode(@RequestBody CodeRequest codeRequest) throws Exception {
        String projectKey = "project-" + UUID.randomUUID();

        // Save code to a temporary file
        Path parentDir = Paths.get(FOLDER_PATH);
        if (!Files.exists(parentDir)) {
            Files.createDirectories(parentDir);
        }

        // Create temp directory and file
        Path tempDir = Files.createTempDirectory(parentDir, "sonar-code-" + UUID.randomUUID());
        Path tempFile = tempDir.resolve("TempCode.java");
        Files.write(tempFile, codeRequest.getCode().getBytes());

        // Run SonarQube analysis
        runSonarScanner(projectKey, tempDir.toString());

        // Retrieve analysis results
         Map<String, Object> analysisResult = getSonarQubeAnalysis(projectKey);


        return ResponseEntity.ok(analysisResult);
    }

    private void runSonarScanner(String projectKey, String sourceCodePath) {
        LogOutput logOutput = new LogOutput() {
            @Override
            public void log(String message, Level level) {
                System.out.println(level + ": " + message);

            }
        };
        EmbeddedScanner scanner = EmbeddedScanner.create("YourAppName", sonarHostUrl, logOutput);

        // Add SonarQube server properties
        Map<String, String> properties = new HashMap<>();
        properties.put("sonar.host.url", sonarHostUrl);
        properties.put("sonar.login", sonarLogin);
        properties.put("sonar.projectKey", projectKey);
        properties.put("sonar.sources", sourceCodePath);

        scanner.addGlobalProperties(properties);



        // Start the analysis
        scanner.start();
    }


   /* private void runSonarScanner(String projectKey, String sourcePath) throws Exception {
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
    }*/

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