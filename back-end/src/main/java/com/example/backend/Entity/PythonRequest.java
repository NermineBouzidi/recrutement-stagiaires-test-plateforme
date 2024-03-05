package com.example.backend.Entity;


public class PythonRequest {
    private String code;
    private String input;

    public PythonRequest(String code, String input) {
        this.code = code;
        this.input = input;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }
// Getters and setters
}
