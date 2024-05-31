package com.example.backend.Service.Implementation;

import com.example.backend.DTO.ProblemAnswerDTO;
import com.example.backend.DTO.QuizAnswerDTO;
import com.example.backend.DTO.TestAnswersRequest;
import com.example.backend.Entity.*;
import com.example.backend.Repository.*;
import com.example.backend.Service.TestSubmissionService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class TestSubmissionImp implements TestSubmissionService {

    @Autowired
    TestSubmissionRepository testSubmissionRepository;
    @Autowired
    TestRepository testRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String fromEmail;
    @Autowired
    private ProblemRepository problemRepository;

    public void assignTestToUser(Test test, User user) {
        TestSubmission testSubmission = new TestSubmission();
        testSubmission.setTest(test);
        testSubmission.setUser(user);
        testSubmission.setAcceptedDate(LocalDateTime.now());
        testSubmission.setStatus("Pending");
        testSubmission.setEvaluated(false);
        // You can set other attributes such as score and isPassed as needed
        test.setStatus("Active");
        testRepository.save(test);
        testSubmissionRepository.save(testSubmission);
    }

    @Override
    public TestSubmission addAnswers(long id, TestSubmission testSubmission) {
        TestSubmission existingTestSubmission = testSubmissionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Problem not found with id: " + id));
        List<ProblemAnswer> answers = testSubmission.getProblemAnswers();
        if (answers != null) {
            for (ProblemAnswer answer : answers) {
                answer.setTestSubmission(existingTestSubmission);
            }
        }
        return testSubmissionRepository.save(existingTestSubmission);
    }

    @Override
    public List<TestSubmission> getAllTestSubmissions() {
        return testSubmissionRepository.findAll();
    }

    @Override
    public TestSubmission setProblemAnswers(long id, List<ProblemAnswer> problemAnswers) {
        TestSubmission testSubmission = testSubmissionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("testSubmission not found with id: " + id));

// Clear existing problem answers (optional)
        //  testSubmission.getProblemAnswers().clear();

        // Set new problem answers with association
        for (ProblemAnswer answer : problemAnswers) {
            answer.setTestSubmission(testSubmission); // Set association
        }

        testSubmission.setProblemAnswers(problemAnswers); // Update list
        return testSubmissionRepository.save(testSubmission);
    }

    @Override
    public TestSubmission setQuizAnswers(long id, List<QuizAnswer> quizAnswers) {
        TestSubmission testSubmission = testSubmissionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("testSubmission not found with id: " + id));

// Clear existing problem answers (optional)
        //  testSubmission.getProblemAnswers().clear();

        // Set new problem answers with association
        testSubmission.getQuizAnswers().clear();

        // Set new quiz answers with association and potentially calculate points
        for (QuizAnswer answer : quizAnswers) {
            answer.setTestSubmission(testSubmission); // Set association

            // Handle Multiple Choice questions with potential duplicates:
            if (answer.getQuiz().getQuestionType().equals("MultipleChoiceQuestion") && answer.getMultipleChoiceAnswers() != null) {
                Set<Choice> chosenChoices = new HashSet<>(answer.getMultipleChoiceAnswers()); // Use Set to avoid duplicates
                answer.setMultipleChoiceAnswers(new ArrayList<>(chosenChoices)); // Update with de-duplicated list
            }

        }

        testSubmission.setQuizAnswers(new ArrayList<>(quizAnswers)); // Update list (avoid modification issues)
        return testSubmissionRepository.save(testSubmission);
    }

    @Override
    public TestSubmission setAnswers(long id, List<QuizAnswer> quizAnswers, List<ProblemAnswer> problemAnswers) {
        TestSubmission testSubmission = testSubmissionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("testSubmission not found with id: " + id));

// Clear existing problem answers (optional)
        //  testSubmission.getProblemAnswers().clear();

        // Set new problem answers with association
        testSubmission.getQuizAnswers().clear();
        testSubmission.getProblemAnswers().clear();

        // Set new quiz answers with association and potentially calculate points
        for (QuizAnswer answer : quizAnswers) {
            answer.setTestSubmission(testSubmission); // Set association

            // Handle Multiple Choice questions with potential duplicates:
            if (answer.getQuiz().getQuestionType().equals("MultipleChoiceQuestion") && answer.getMultipleChoiceAnswers() != null) {
                Set<Choice> chosenChoices = new HashSet<>(answer.getMultipleChoiceAnswers()); // Use Set to avoid duplicates
                answer.setMultipleChoiceAnswers(new ArrayList<>(chosenChoices)); // Update with de-duplicated list
            }

        }
        testSubmission.setQuizAnswers(new ArrayList<>(quizAnswers)); // Update list (avoid modification issues)    }
        for (ProblemAnswer answer : problemAnswers) {
            //String language = "java";
           // System.out.println(answer.getProblem());
           // String code = answer.getAnswerText();
            //Problem problem =
            //CreateFile(answer);
            answer.setTestSubmission(testSubmission); // Set association
        }
        testSubmission.setTestSubmissionDate(LocalDateTime.now());
        testSubmission.setStatus("Submitted");
        testSubmission.setProblemAnswers(problemAnswers); // Update list
        return testSubmissionRepository.save(testSubmission);
    }


    public String acceptUser (long id ){

        try {
            Optional<User> userOptional = userRepository.findById(id);

            if (userOptional.isPresent()) {
                User user =userOptional.get();
                String email = user.getEmail();
                TestSubmission testSubmission = testSubmissionRepository.findByUser(user);
                testSubmission.setStatus("Passed and Notified ");
                testSubmissionRepository.save(testSubmission);
                SimpleMailMessage message = new SimpleMailMessage();
                String acceptanceMessage = String.format(
                        "Dear %s %s,%n%n"
                                + "Congratulations! We are thrilled to inform you that you have successfully passed the technical test%n%n"
                                + "You are now a part of our internship program. Below are the details to access your account and start taking the tests:%n%n"
                                + "If you have any questions or need assistance, feel free to contact us at %s .%n%n"
                                + "We look forward to having you on board!%n%n"
                                + "Best regards,%n"
                                + "The Testing Intern Platform Team",
                        user.getFirstname(), user.getLastName(), email,fromEmail);
                message.setTo(email);
                message.setSubject("Application Update: Internship at Testing Intern Platform");
                message.setText(acceptanceMessage);
                message.setFrom(fromEmail);
                javaMailSender.send(message);
                return "email send successfully";
            } else {
                return "User not found with id ";

            }
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String rejectUser (long id ){

        try {
            Optional<User> userOptional = userRepository.findById(id);

            if (userOptional.isPresent()) {
                User user =userOptional.get();

                TestSubmission testSubmission = testSubmissionRepository.findByUser(user);
                testSubmission.setStatus("Failed and Notified");
                testSubmissionRepository.save(testSubmission);
                String email = user.getEmail();
                String rejectionMessage = String.format(
                        "Dear %s %s,%n%n"
                                + "Thank you Thank you for participating in the technical test at Testing Intern Platform.We appreciate the time and effort you invested in completing the assessment%n%n"
                                +"After careful evaluation, we regret to inform you that your application has not been selected for further consideration. While your skills and experience are valued, we have decided not to move forward with your application at this time..%n%n"
                                + "We appreciate your interest in joining our team and encourage you to apply for future opportunities. Your skills and experience are commendable, and we wish you the best in your future endeavors.%n%n"
                                + "If you have any questions or would like feedback on your application, please feel free to contact us at %s .%n%n"
                                + "Thank you for your understanding.%n%n"
                                + "Best regards,%n"
                                + "The Testing Intern Platform Team",
                        user.getFirstname(), user.getLastName() ,fromEmail);
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(email);
                message.setFrom(fromEmail);
                message.setSubject("Application Update: Internship at Testing Intern Platform");
                message.setText(rejectionMessage);
                javaMailSender.send(message);
                return "email send successfully";
            } else {
                return "User not found with id ";

            }
        } catch (Exception e){
            throw new RuntimeException(e);
        }

    }



    @Override
    public void analyzeProblemAnswer(ProblemAnswer answer) {
        String code= answer.getAnswerText();
        String language =answer.getProblem().getLanguage();

    }
    @Override
    public ResponseEntity<String> acceptAndAssign(Long userId) {
        if (userId == null) {
            return ResponseEntity.badRequest().body("Missing userId in the request.");
        }

        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.badRequest().body("Invalid user ID.");
        }
        User user = userOptional.get();

        List<Test> availableTests = testRepository.findByCategory(user.getSpecializations());
        if (availableTests.isEmpty()) {
            return ResponseEntity.badRequest().body("No available tests to assign.");
        }

        Test randomTest = availableTests.get(new Random().nextInt(availableTests.size()));
        assignTestToUser(randomTest, user);

        boolean emailSent = acceptUserInscription(userId);
        if (emailSent) {
            return ResponseEntity.ok("User accepted, password sent by email, and test assigned successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Test assigned, but failed to send email.");
        }
    }

    public boolean acceptUserInscription(long id) {
        try {
            Optional<User> userOptional = userRepository.findById(id);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                String email = user.getEmail();
                String generatedPassword = PasswordGenerator.generateRandomPassword();
                user.setPassword(passwordEncoder.encode(generatedPassword));
                user.setStatus("Accepted");
                userRepository.save(user);

                SimpleMailMessage message = new SimpleMailMessage();
                String acceptanceMessage = String.format(
                        "Dear %s %s,%n%n" +
                                "Congratulations! We are pleased to inform you that your application at Testing Intern Platform has been accepted.%n%n" +
                                "You are now a part of our internship program. Below are the details to access your account and start taking the tests:%n%n" +
                                "Username: %s %n" +
                                "Password: %s%n" +
                                "Please log in to our platform using the provided credentials and follow the instructions to begin your journey with us.%n%n" +
                                "If you have any questions or need assistance, feel free to contact us at %s.%n%n" +
                                "We look forward to having you on board!%n%n" +
                                "Best regards,%n" +
                                "The Testing Intern Platform Team",
                        user.getFirstname(), user.getLastName(), email, generatedPassword, fromEmail);
                message.setTo(email);
                message.setSubject("Application Update: Internship at Testing Intern Platform");
                message.setText(acceptanceMessage);
                message.setFrom(fromEmail);
                javaMailSender.send(message);
                return true;  // Email sent successfully
            } else {
                return false;  // User not found
            }
        } catch (Exception e) {
            return false;  // Exception occurred while sending email
        }
    }

}
