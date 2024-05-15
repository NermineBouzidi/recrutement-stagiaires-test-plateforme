package com.example.backend.Controller;

import com.example.backend.DTO.ChangePasswordRequest;
import com.example.backend.DTO.DashboardCounts;
import com.example.backend.DTO.UserDTO;
import com.example.backend.DTO.UserRegistrationData;
import com.example.backend.Entity.Enum.Role;
import com.example.backend.Entity.Test;
import com.example.backend.Entity.User;
import com.example.backend.Repository.TestRepository;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Security.JwtUtils;
import com.example.backend.Service.EvaluatorService;
import com.example.backend.Service.TestService;
import com.example.backend.Service.TestSubmissionService;
import com.example.backend.Service.UserService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Secured("hasRole('ADMIN','EVALUATOR')")
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private EvaluatorService evaluatorService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    TestService testService;
    @Autowired
    TestRepository testRepository;
    @Autowired
    TestSubmissionService testSubmissionService;

    @Autowired
    JwtUtils jwtUtils;

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) {
        if (id == 0 || id <= 0) {
            return ResponseEntity.badRequest().build();
        }
        String s = userService.deleteUser(id);
        if (s.equals("succes")) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@PathVariable long id, @RequestBody UserDTO user) {
        String s = userService.updateUser(id, user);
        if (s.equals("user updated successfully")) {
            return ResponseEntity.ok("user updated successfully");
        } else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(s);
    }

    @GetMapping("/hi")
    public String s() {
        return "hello";
    }

    @GetMapping("/getAllCandidate")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/getUser/{id}")
    public ResponseEntity<User> getUser(@PathVariable long id) {

        return userService.getUser(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/accept/{id}")
    public ResponseEntity<Void> accept(@PathVariable long id) {
        if (id == 0 || id <= 0) {
            return ResponseEntity.badRequest().build();
        }
        String s = userService.acceptUser(id);
        if (s.equals("email send successfully")) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/reject/{id}")
    public ResponseEntity<Void> reject(@PathVariable long id) {
        if (id == 0 || id <= 0) {
            return ResponseEntity.badRequest().build();
        }
        String s = userService.rejectUser(id);
        if (s.equals("email send successfully")) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getFile/{id}")
    public ResponseEntity<?> getFile(@PathVariable long id) throws IOException {
        byte[] file = userService.getResume(id);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("application/pdf"))
                .body(file);
    }

    @PostMapping("/changePassword/{id}")
    public ResponseEntity<String> changePassword(@PathVariable Long id, @RequestBody ChangePasswordRequest request) {
        try {
            userService.changePassword(id, request.getCurrentPassword(), request.getNewPassword(), request.getConfirmPassword());
            return ResponseEntity.ok().build();
        } catch (BadRequestException e) {
            if (e.getMessage().equals("New passwords do not match")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("New passwords do not match"); // 400 Bad Request
            } else if (e.getMessage().equals("Current password is incorrect")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Current password is incorrect"); // 400 Bad Request
            } else {
                // Handle other cases within BadRequestException
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An unknown bad request error occurred.");
            }
        } catch (IOException e) {
            // Handle IOException appropriately
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (Exception e) { // Catch other unexpected exceptions
            // Handle unexpected errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/mee")
    public ResponseEntity<User> getUserP(@RequestHeader("Authorization") String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = authorization.substring(7); // Extract token after "Bearer "

        // Validate token (implement your token validation logic here)
        return ResponseEntity.ok(userRepository.findByEmail(jwtUtils.getUsername(token)));

    }

    @PostMapping("/addUser")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        String s = userService.addUser(user);
        if (s.equals("Registration successful")) {
            return ResponseEntity.ok("Registration successful");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(s);

        }
    }
    @PostMapping("/addEvaluator")
    public ResponseEntity<?> addEvaluator(@RequestBody User user) {
        String s = evaluatorService.addEvaluator(user);
        if (s.equals("Registration successful. Email sent successfully.")) {
            return ResponseEntity.ok("Registration successful. Email sent successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(s);
        }
    }

    @GetMapping("/user-registrations")
    public ResponseEntity<List<UserRegistrationData>> getUserRegistrations() {
        // Fetch user registration data from the database
        List<User> users = userRepository.findAll();

        // Filter users based on their role
        List<User> userRegistrations = users.stream()
                .filter(user -> user.getRole() == Role.ROLE_USER)
                .collect(Collectors.toList());

        // Group user registrations by date and count registrations for each date
        List<UserRegistrationData> userRegistrationsData = userRegistrations.stream()
                .collect(Collectors.groupingBy(user -> user.getRegistrationDate().toLocalDate()))
                .entrySet().stream()
                .map(entry -> new UserRegistrationData(entry.getKey(), entry.getValue().size()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(userRegistrationsData);
    }




 /*   @GetMapping("/counts")
    public ResponseEntity<DashboardCounts> getDashboardCounts() {
        DashboardCounts counts = userService.getDashboardCounts();
        return ResponseEntity.ok(counts);
    }*/

    @PostMapping("/assign-test-and-notify")
    public ResponseEntity<String> assignTestAndNotify(@RequestBody Map<String, Long> requestBody) {
        Long testId = requestBody.get("testId");
        Long userId = requestBody.get("userId");

        try {
            // Fetch user and test details
            Optional<User> userOptional = userRepository.findById(userId);
            Optional<Test> testOptional = testRepository.findById(testId);

            if (userOptional.isPresent() && testOptional.isPresent()) {
                User user = userOptional.get();
                Test test = testOptional.get();

                // Assign test to user and send email notification
                String result = userService.assignTestAndNotifyUser(userId, test);

                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.badRequest().body("User or test not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/getAllEvaluator")
    public List<User> getEvaluator() {
        return evaluatorService.getAllEvaluator();
    }


}