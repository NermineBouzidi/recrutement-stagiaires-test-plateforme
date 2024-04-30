package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardCounts {
    private Long usersCount;
    private Long testsSubmittedCount;
    private Long totalTestsCount;
}
