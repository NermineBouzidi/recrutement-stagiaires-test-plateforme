package com.example.backend.Repository;

import com.example.backend.Entity.TestSubmission;
import com.example.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestSubmissionRepository extends JpaRepository<TestSubmission,Long> {
    TestSubmission findByUser(User user);

}
