package com.example.backend.Repository;

import com.example.backend.Entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository <Admin,Long> {
    public Admin findByEmail(String email);

}
