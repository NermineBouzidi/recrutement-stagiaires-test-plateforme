package com.example.backend.Entity.Enum;

import jakarta.persistence.Enumerated;
import org.springframework.security.core.GrantedAuthority;


public enum Role  {
    ROLE_ADMIN,
    ROLE_USER,
    ROLE_EVALUATOR

}
