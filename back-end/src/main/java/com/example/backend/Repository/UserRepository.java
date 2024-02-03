package com.example.backend.Repository;

import com.example.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository <User , Long> {
    public User findByEmail(String email);
    public User findByNumber(int number);
    public User findById(long id);

}
