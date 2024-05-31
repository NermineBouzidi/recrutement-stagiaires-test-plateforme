package com.example.backend.Controller;

import com.example.backend.DTO.LoginDTO;
import com.example.backend.DTO.LoginResponse;
import com.example.backend.Entity.*;
import com.example.backend.Entity.Enum.Role;
import com.example.backend.Repository.ProblemAnswerRepository;
import com.example.backend.Repository.TestRepository;
import com.example.backend.Repository.TestSubmissionRepository;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Security.JwtUtils;
import com.example.backend.Service.QuizService;
import com.example.backend.Service.TestService;
import com.example.backend.Service.TestSubmissionService;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.Month;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestParam String firstname,
                                         @RequestParam String lastName,
                                         @RequestParam String email,
                                         @RequestParam String number,
                                         @RequestParam String educationLevel,
                                         @RequestParam String linkedinUrl,
                                         @RequestParam String specializations,
                                         @RequestPart("file") MultipartFile file) {

        User user = new User(firstname, lastName, email, number, educationLevel, linkedinUrl, specializations);
        String s = userService.signup(user, file);
        if (s.equals("Registration successful")) {
            return ResponseEntity.ok("Registration successful");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(s);

        }
    }


    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginDTO loginDTO) {
        try {
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword());
            authenticationManager.authenticate(token);
            User user = userRepository.findByEmail(loginDTO.getEmail());
            // LoginResponse loginResponse = new LoginResponse(jwtUtils.generate(user), user.getRole().name());

            //return ResponseEntity.ok(jwtUtils.generate(user));
            return ResponseEntity.ok(new LoginResponse(jwtUtils.generate(user), user.getRole().name()));
        } catch (BadCredentialsException e) {
            // Incorrect password, return specific error message
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse(null, "Invalid credentials"));
        } catch (AuthenticationException e) {
            // Other authentication failures, return generic error message
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


}

