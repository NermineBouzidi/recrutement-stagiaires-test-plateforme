package com.example.backend.Service;

import com.example.backend.DTO.DashboardCounts;

import java.time.Month;
import java.util.Map;

public interface DashboardService {
    DashboardCounts getDashboardCounts();
    Map<Month, Long> getUserRegistrationsByMonth(int year);
    Map<String , Long> getUserRegistrationsByCategory(int year) ;
    Map<String,Map<String, Long>> getUserRegistrationBySpecialization(int year) ;
    Map<Month, Long> getTestCreationByMonth(int year) ;

}
