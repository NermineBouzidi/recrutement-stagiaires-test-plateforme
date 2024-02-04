package com.example.backend.Entity;

import java.security.SecureRandom;
import java.util.Base64;

public class PasswordGenerator {

    public static String generateRandomPassword() {
        // Define the length of the password
        int passwordLength = 5;

        // Generate a random byte array
        byte[] randomBytes = new byte[passwordLength];
        new SecureRandom().nextBytes(randomBytes);

        // Encode the byte array to a Base64 string
        String generatedPassword = Base64.getEncoder().encodeToString(randomBytes);

        // Remove any non-alphanumeric characters
        generatedPassword = generatedPassword.replaceAll("[^a-zA-Z0-9]", "");

        return generatedPassword;
    }

    public static void main(String[] args) {
        String randomPassword = generateRandomPassword();
        System.out.println("Generated Password: " + randomPassword);
    }
}
