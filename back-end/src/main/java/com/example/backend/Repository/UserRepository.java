package com.example.backend.Repository;

import com.example.backend.Entity.Enum.Role;
import com.example.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public interface UserRepository extends JpaRepository <User , Long> {
    public User findByEmail(String email);


    List<User> findByRole(Role role);
    //List<User> findByRegistrationDate();

    // Count user registrations by month
    default Map<Month, Long> countByMonthOfRegistration() {
        // Fetch user registrations from the database
        List<User> userRegistrations = findByRole(Role.ROLE_USER);


        // Group user registrations by month and count registrations for each month

        return userRegistrations.stream()
                .collect(Collectors.groupingBy(
                        user -> user.getRegistrationDate().getMonth(),
                        Collectors.counting()
                ));
    }
            ;
    Long countByRole(Role role);


    public User findByNumber(String number);
   // public User findById(long id);

}
