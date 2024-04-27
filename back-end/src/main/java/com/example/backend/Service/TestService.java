package com.example.backend.Service;

import com.example.backend.Entity.Enum.TestCategory;
import com.example.backend.Entity.Problem;
import com.example.backend.Entity.ProblemAnswer;
import com.example.backend.Entity.Test;

import java.util.List;
import java.util.Optional;

public interface TestService {
  Test addTest (Test test);
  Test updateTest(Long testId, Test test);
  List<Test> getAllTests();
  Optional<Test> getTestById(Long testId);
  void deleteTest(long testId);
  List<Test> getTestsByCategory(String category);
  Test setPoints(long id, List<ProblemAnswer>problemAnswers);
  Test findRandomTestByCategory(String specialization) ;

}
