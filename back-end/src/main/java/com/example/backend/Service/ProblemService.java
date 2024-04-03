package com.example.backend.Service;

import com.example.backend.Entity.Problem;
import com.example.backend.Entity.Quiz;

import java.util.List;
import java.util.Optional;

public interface ProblemService {
    Problem addProblem (Problem problem);
    Problem updateProblem(Long problemId, Problem problem);
    List<Problem> getAllProblems();

        Optional<Problem> getProblemById(Long problemId);
    void deleteProblem(long problemId);

}

