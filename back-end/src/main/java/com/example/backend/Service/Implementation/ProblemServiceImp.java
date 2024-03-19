package com.example.backend.Service.Implementation;

import com.example.backend.Entity.Problem;
import com.example.backend.Repository.ProblemRepository;
import com.example.backend.Service.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProblemServiceImp implements ProblemService {


        @Autowired
        private ProblemRepository problemRepository;


        public Problem addProblem(Problem problem) {

            // Validation logic
            if (problem == null) {
                throw new IllegalArgumentException("Problem cannot be null");
            }
            if (problem.getTitle() == null || problem.getTitle().isEmpty()) {
                throw new IllegalArgumentException("Problem title is required");
            }
            if (problem.getLanguage() == null || problem.getLanguage().isEmpty()) {
                throw new IllegalArgumentException("Problem language is required");
            }
            if (problem.getDuration() <= 0) {
                throw new IllegalArgumentException("Problem duration must be positive");
            }
            if (problem.getPoints() <= 0) {
                throw new IllegalArgumentException("Problem points must be positive");
            }

            // Check for duplicate problems (based on title or other unique identifier)
            Problem existingProblem = problemRepository.findByTitle(problem.getTitle());

            if (existingProblem != null) {
                throw new IllegalArgumentException("A problem with the same title already exists");
            }

            // Save the problem
            return problemRepository.save(problem);
        }

    @Override
    public Problem updateProblem(Long problemId, Problem problem) {
        if (problemId == null) {
            throw new IllegalArgumentException("Problem ID cannot be null");
        }

        if (problem == null) {
            throw new IllegalArgumentException("Problem object cannot be null");
        }
        Problem existingProblem = problemRepository.findById(problemId)
                .orElseThrow(() -> new IllegalArgumentException("Problem not found with id: " + problemId));
        // Update fields selectively, handling null values
        if (problem.getTitle() != null) {
            existingProblem.setTitle(problem.getTitle());
        }
        if (problem.getLanguage() != null) {
            existingProblem.setLanguage(problem.getLanguage());
        }
        if (problem.getDescription() != null) {
            existingProblem.setDescription(problem.getDescription());
        }
        if (problem.getInput() != null) {
            existingProblem.setInput(problem.getInput());
        }
        if (problem.getOutput() != null) {
            existingProblem.setOutput(problem.getOutput());
        }
        if (problem.getPoints() != 0) {
            existingProblem.setPoints(problem.getPoints());
        }
        if (problem.getDuration() != 0) {
            existingProblem.setDuration(problem.getDuration());
        }
        return problemRepository.save(existingProblem);

    }

    @Override
    public List<Problem> getAllProblems() {
        return problemRepository.findAll();
    }

    @Override
    public Optional<Problem> getProblemById(Long problemId) {
        return problemRepository.findById(problemId);
    }


    @Override
    public void deleteProblem(long problemId) {
        if (problemId <= 0) {
            throw new IllegalArgumentException("Invalid problem ID: " + problemId);
        }
        // Check if the problem exists
        Problem existingProblem = problemRepository.findById(problemId)
                .orElseThrow(() -> new IllegalArgumentException("Problem not found with id: " + problemId));

        // Delete the problem
        problemRepository.delete(existingProblem);
    }


}

