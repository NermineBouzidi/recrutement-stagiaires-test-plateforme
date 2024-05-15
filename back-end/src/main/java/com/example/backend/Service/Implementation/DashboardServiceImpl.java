package com.example.backend.Service.Implementation;

import com.example.backend.DTO.DashboardCounts;
import com.example.backend.Entity.Enum.Role;
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
}
