package com.example.backend.Controller;

import com.example.backend.DTO.LoginDTO;
import com.example.backend.DTO.LoginResponse;
import com.example.backend.Entity.MultipleChoiceQuestion;
import com.example.backend.Entity.Quiz;
import com.example.backend.Entity.TrueFalseQuestion;
import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Security.JwtUtils;
import com.example.backend.Service.QuizService;
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
    QuizService quizService;
    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestParam String firstname,
                                         @RequestParam String lastName,
                                         @RequestParam String email,
                                         @RequestParam String number,
                                         @RequestParam String educationLevel,
                                         @RequestParam String linkedinUrl, @RequestPart("file") MultipartFile file) {

        User user = new User(firstname, lastName, email, number, educationLevel, linkedinUrl);
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

    @GetMapping("/me")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = authorization.substring(7); // Extract token after "Bearer "

        // Validate token (implement your token validation logic here)
        User user = userRepository.findByEmail(jwtUtils.getUsername(token));
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);

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
    @PostMapping("/multiplechoice")
    public ResponseEntity<?> addMultipleChoiceQuestion(@RequestBody MultipleChoiceQuestion questionDTO) {
        MultipleChoiceQuestion question = quizService.addMultipleChoice(questionDTO);
        String correctOption = question.getOptions().get(question.getCorrectOptionIndex());
        return ResponseEntity.ok(correctOption);
    }
    @PostMapping("/truefalse")
    public ResponseEntity<?> addTrueFalse(@RequestBody TrueFalseQuestion questionDTO) {
        TrueFalseQuestion question = quizService.addTrueFlase(questionDTO);
        return ResponseEntity.ok(question);
    }
    @PostMapping("/addQuiz")
    public ResponseEntity<String> addTest(@RequestBody Quiz quiz) {
        String s = quizService.AddQuiz(quiz);
        if (s.equals("quiz added successfully")) {
            return ResponseEntity.ok("quiz added successfully");
        } else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(s);

    }
    @PutMapping("/updateTrueFalse/{id}")
    public ResponseEntity<?> updateTrueFalse(@PathVariable long id,@RequestBody TrueFalseQuestion quiz) {
        try {
            quizService.updateTrueFalse(id,quiz);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
