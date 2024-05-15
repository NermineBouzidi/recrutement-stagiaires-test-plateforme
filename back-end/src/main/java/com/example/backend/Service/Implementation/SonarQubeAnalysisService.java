package com.example.backend.Service.Implementation;

import com.example.backend.Entity.ProblemAnswer;
import com.example.backend.Entity.SonarQubeAnalysis;
import org.springframework.stereotype.Service;

@Service
public class SonarQubeAnalysisService {
    private static final String SONARQUBE_SERVER_URL = "http://localhost:9000";
    private static final String SONARQUBE_USERNAME = "admin";
    private static final String SONARQUBE_PASSWORD = "password";

   /* public SonarQubeAnalysis analyzeProblemAnswer(ProblemAnswer problemAnswer) {
        SonarQube sonarQube = SonarQube.create(SONARQUBE_SERVER_URL, SONARQUBE_USERNAME, SONARQUBE_PASSWORD);

        // Extract code from ProblemAnswer
        String code = problemAnswer.getAnswerText();

        // Prepare analysis request (language based on problem.language)
        Analysis analysis = Analysis.create(code, "java"); // Replace "java" with actual language

        // Send code for analysis and retrieve response
        analysis = sonarQube.analyses().create(analysis);
        analysis = sonarQube.analyses().waitOnAnalysis(analysis);

        // Extract metrics from analysis response
        int bugs = analysis.getMeasures().projectMetric(Metric.BUGS).getIntValue();
        int vulnerabilities = analysis.getMeasures().projectMetric(Metric.VULNERABILITIES).getIntValue();
        int codeCoverage = analysis.getMeasures().projectMetric(Metric.COVERAGE).getIntValue();
        int hotspotsReviewed = analysis.getMeasures().projectMetric(Metric.HOTSPOTS_REVIEWED).getIntValue();

        // Create and populate SonarQubeAnalysis object
        SonarQubeAnalysis sonarQubeAnalysis = new SonarQubeAnalysis();
        sonarQubeAnalysis.setBugs(bugs);
        sonarQubeAnalysis.setVulnerabilities(vulnerabilities);
        sonarQubeAnalysis.setCodeCoverage(codeCoverage);
        sonarQubeAnalysis.setHotspotsReviewed(hotspotsReviewed);

        // Save analysis object to database (using your JPA repository)
        // ... (your JPA persistence code)

        return sonarQubeAnalysis;
    }*/
}
