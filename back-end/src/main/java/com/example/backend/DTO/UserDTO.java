package com.example.backend.DTO;

public class UserDTO {
    String firstname ;
    String lastName ;
    String email;
    int number ;
    String educationLevel;

    public UserDTO(String firstname, String lastName, String email, int number, String educationLevel) {
        this.firstname = firstname;
        this.lastName = lastName;
        this.email = email;
        this.number = number;
        this.educationLevel = educationLevel;
    }

    public UserDTO() {
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getEducationLevel() {
        return educationLevel;
    }

    public void setEducationLevel(String educationLevel) {
        this.educationLevel = educationLevel;
    }
}
