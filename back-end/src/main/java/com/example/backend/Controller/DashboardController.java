package com.example.backend.Controller;

import com.example.backend.DTO.DashboardCounts;
import com.example.backend.Entity.Enum.Role;
import com.example.backend.Entity.User;
import com.example.backend.Service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Secured("hasRole('ADMIN')")
@RequestMapping("/api/dash")
public class DashboardController {
    @Autowired
    DashboardService dashboardService;
    @GetMapping("/user-registrations-by-month/{year}")
    public ResponseEntity<Map<Month, Long>> getUserRegistrationsByMonth(@PathVariable int year) {
        Map<Month, Long> registrationsByMonth = dashboardService.getUserRegistrationsByMonth(year);
        return ResponseEntity.ok(registrationsByMonth);
    }
    @GetMapping("/counts")
    public ResponseEntity<DashboardCounts> getDashboardCounts() {
        DashboardCounts counts = dashboardService.getDashboardCounts();
        return ResponseEntity.ok(counts);
    }
    @GetMapping("/user-registrations-by-category/{year}")
    public ResponseEntity<Map<String, Long>> getUserRegistrationsByCategory(@PathVariable int year) {
        Map<String, Long> registrationsByMonth = dashboardService.getUserRegistrationsByCategory(year);
        return ResponseEntity.ok(registrationsByMonth);
    }
    @GetMapping("/user-status-by-category/{year}")
    public ResponseEntity<Map<String,Map<String ,Long>>>getUserRegistrationBySpecialization(@PathVariable int year) {
        Map<String,Map<String ,Long>> registrationsByMonth = dashboardService.getUserRegistrationBySpecialization(year);
        return ResponseEntity.ok(registrationsByMonth);
    }
    @GetMapping("/tests-by-month/{year}")
    public ResponseEntity<Map<Month, Long>> getTestsByMonth(@PathVariable int year) {
        Map<Month, Long> testsByMonth = dashboardService.getTestCreationByMonth(year);
        return ResponseEntity.ok(testsByMonth);
    }
}
