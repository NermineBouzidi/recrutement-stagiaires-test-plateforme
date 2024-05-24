package com.example.backend.Service.Implementation;

import com.example.backend.DTO.DashboardCounts;
import com.example.backend.Entity.Enum.Role;
import com.example.backend.Entity.Test;
import com.example.backend.Entity.User;
import com.example.backend.Repository.TestRepository;
import com.example.backend.Repository.TestSubmissionRepository;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Month;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardServiceImpl implements DashboardService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    TestSubmissionRepository testSubmissionRepository;
    @Autowired
    TestRepository testRepository;
    @Override
    public DashboardCounts getDashboardCounts() {
        Long usersCount = userRepository.countByRole(Role.ROLE_USER);
        Long testsSubmittedCount = testSubmissionRepository.count();
        Long totalTestsCount = testRepository.count();
        return new DashboardCounts(usersCount, testsSubmittedCount, totalTestsCount);
    }
    @Override
    public Map<Month, Long> getUserRegistrationsByMonth(int year) {
        List<User> userRegistrations = userRepository.findByRole(Role.ROLE_USER);
        return userRegistrations.stream()
                .filter(user -> user.getRegistrationDate().getYear() == year)
                .collect(Collectors.groupingBy(
                        user -> user.getRegistrationDate().getMonth(),
                        Collectors.counting())
                );
    }
    @Override
    public Map<String, Long> getUserRegistrationsByCategory(int year) {
        List<User> userRegistrations = userRepository.findByRole(Role.ROLE_USER);
        return userRegistrations.stream()
                .filter(user -> user.getSpecializations() != null) // Filter users with null specializations
                .filter(user -> user.getRegistrationDate().getYear() == year)
                .collect(Collectors.groupingBy(
                        user -> user.getSpecializations(),
                        Collectors.counting())
                );
    }
    public Map<String,Map<String, Long>> getUserRegistrationBySpecialization(int year) {
        // Get all users with role USER
        List<User> users = userRepository.findByRole(Role.ROLE_USER);

        // Group registrations by specialization and count by status
        return users.stream()
                .filter(user -> user.getSpecializations() != null) // Filter users with null specializations
                .filter(user -> user.getRegistrationDate().getYear() == year) // Filter by year
                .collect(Collectors.groupingBy(
                User::getSpecializations, // Group by specialization
                Collectors.groupingBy(
                        user -> user.getStatus(),
                        Collectors.counting() // Count by status
                )
              ));
    }

    @Override
    public Map<Month, Long> getTestCreationByMonth(int year) {
        List<Test> tests = testRepository.findAll();
        return tests.stream()
                .filter(user -> user.getCreatedAt() != null) // Filter users with null specializations
                .filter(user -> user.getCreatedAt().getYear() == year)
                .collect(Collectors.groupingBy(
                        test -> test.getCreatedAt().getMonth(),
                        Collectors.counting())
                );
    }
}
