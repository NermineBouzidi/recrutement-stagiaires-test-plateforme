package com.example.backend.Entity;

import jakarta.persistence.*;
import org.springframework.lang.NonNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id ;
    @NonNull
    String firstname ;
    @NonNull
    String lastName ;
    @NonNull
    String email;
    @NonNull
    int number ;

    String educationLevel;
    @NonNull
    String password;

    String linkedinUrl;
    String resumePath;
    @Enumerated(EnumType.STRING)
    Role role ;

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }

    public String getResumePath() {
        return resumePath;
    }

    public void setResumePath(String resumePath) {
        this.resumePath = resumePath;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public User() {
    }

   /* public User(String firstname, String lastName, String email, int number, String educationLevel,String linkedinUrl ){
        this.firstname = firstname;
        this.lastName = lastName;
        this.email = email;
        this.number = number;
        this.educationLevel = educationLevel;
        this.password = PasswordGenerator.generateRandomPassword();
        this.linkedinUrl=linkedinUrl;

    }*/

   public User( String firstname, String lastName, String email, int number, String educationLevel, String linkedinUrl ) {
       this.firstname = firstname;
       this.lastName = lastName;
       this.email = email;
       this.number = number;
       this.educationLevel = educationLevel;
     //  this.password = password;
       this.linkedinUrl = linkedinUrl;

   }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setPassword(String password) {
        this.password = password;
    }



    public String getEducationLevel() {
        return educationLevel;
    }

    public void setEducationLevel(String educationLevel) {
        this.educationLevel = educationLevel;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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
}
