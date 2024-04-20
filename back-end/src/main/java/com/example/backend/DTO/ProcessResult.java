package com.example.backend.DTO;

public class ProcessResult {

    private final String output;
    private final String error;

    public ProcessResult(String output, String error) {
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

