package com.example.backend.Controller;

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
}
