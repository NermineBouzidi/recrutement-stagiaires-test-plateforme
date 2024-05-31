package com.example.backend.Entity;

import com.example.backend.Entity.Enum.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User  {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id ;
    @NonNull
    private String firstname ;
    @NonNull
    private String lastName ;
    @NonNull
    private String email;
    private String number ;

    private String educationLevel;
    private String password;
    private String specializations;
    private String linkedinUrl;
    private String resumePath;
    private LocalDateTime registrationDate;
    private String status;
    @Enumerated(EnumType.STRING)
    private Role role;



   public User( String firstname, String lastName, String email, String number, String educationLevel, String linkedinUrl, String specializations ) {
       this.firstname = firstname;
       this.lastName = lastName;
       this.email = email;
       this.number = number;
       this.educationLevel = educationLevel;
     //  this.password = password;
       this.linkedinUrl = linkedinUrl;
       this.specializations=specializations;

   }


}
