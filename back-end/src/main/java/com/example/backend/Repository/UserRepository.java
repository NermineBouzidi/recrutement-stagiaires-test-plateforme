package com.example.backend.Repository;

import com.example.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Month;
import java.util.Map;

public interface UserRepository extends JpaRepository <User , Long> {
    public User findByEmail(String email);


        @Query("SELECT month(u.registrationDate) AS month, COUNT(u) AS count " +
                "FROM User u GROUP BY month(u.registrationDate)")
        Map<Month, Long> countByMonthOfRegistration();


    public User findByNumber(String number);
   // public User findById(long id);

}
