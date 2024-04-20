package com.example.backend.DTO;

public class ExecutionResult {

    private final String output;
    private final String error;

    public ExecutionResult(String output, String error) {
        this.output = output;
        this.error = error;
    }

    // Getters for output and error
    public String getOutput() {
        return output;
    }

    public String getError() {
        return error;
    }
}

