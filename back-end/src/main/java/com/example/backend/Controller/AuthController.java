package com.example.backend.Controller;

import com.example.backend.DTO.LoginDTO;
import com.example.backend.DTO.LoginResponse;
import com.example.backend.Entity.*;
import com.example.backend.Entity.Enum.TestCategory;
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

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    UserRepository userRepository;
    @Autowired
    TestRepository testRepository;

    @Autowired
    private UserService userService;
    @Autowired
    QuizService quizService;
    @Autowired
    TestService testService;
    @Autowired
    TestSubmissionService testSubmissionService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    TestSubmissionRepository testSubmissionRepository;
    @Autowired
    ProblemAnswerRepository problemAnswerRepository;


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

    @PostMapping("/addMultiple")
    public ResponseEntity<?> addMultipleChoiceQuestion(@RequestBody MultipleChoiceQuestion questionDTO) {
        try {
            quizService.addMultipleChoice(questionDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
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
    public ResponseEntity<?> updateTrueFalse(@PathVariable long id, @RequestBody TrueFalseQuestion quiz) {
        try {
            quizService.updateTrueFalse(id, quiz);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/getQuiz/{id}")
    public ResponseEntity<Quiz> getQuiz(@PathVariable long id) {
        return quizService.getQuiz(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/getAllQuiz")
    public ResponseEntity<List<Quiz>> getAllQuiz() {
        List<Quiz> quizzes = quizService.getAllQuiz();
        return new ResponseEntity<>(quizzes, HttpStatus.OK);
    }

    @PostMapping("addTest")
    public ResponseEntity<String> createTest(@RequestBody Test test) {
        try {
            Test savedTest = testService.addTest(test);
            return ResponseEntity.ok("Test added successfully" + savedTest);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/getAllTest")
    public ResponseEntity<List<Test>> getAllTests() {
        List<Test> tests = testService.getAllTests();
        return new ResponseEntity<>(tests, HttpStatus.OK);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Test>> getTestsByCategory(@PathVariable String category) {
        List<Test> tests = testService.getTestsByCategory(category);
        if (tests != null && !tests.isEmpty()) {
            return ResponseEntity.ok(tests);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/problemAnswers-points/{id}")
    public ResponseEntity<TestSubmission> updateProblemAnswerPoints(@PathVariable Long id, @RequestBody Map<Long, Integer> updatedPoints) {
        Optional<TestSubmission> testSubmissionOptional = testSubmissionRepository.findById(id);
        if (testSubmissionOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        TestSubmission testSubmission = testSubmissionOptional.get();
        boolean anyUpdates = false; // Flag to track if any updates happened

        for (ProblemAnswer problemAnswer : testSubmission.getProblemAnswers()) {
            Long problemAnswerId = problemAnswer.getId();
            Integer newPoints = updatedPoints.get(problemAnswerId);
            if (newPoints != null) {
                problemAnswer.setPoints(newPoints);
                anyUpdates = true; // Update flag if a point is updated
            }
        }

        if (!anyUpdates) {
            return ResponseEntity.noContent().build(); // No updates, return 204 No Content
        }

        testSubmission = testSubmissionRepository.save(testSubmission);
        return ResponseEntity.ok(testSubmission);
    }

    @PostMapping("/createFiles")
    public String crete() {
        ProblemAnswer problemAnswer1= new ProblemAnswer();
        problemAnswer1.setAnswerText(" hello everyone");
        return testSubmissionService.CreateFile(problemAnswer1);
    }

    @PostMapping("/crrer/{id}")
    public void get(@PathVariable long id){
        Optional<ProblemAnswer> problemAnswer =problemAnswerRepository.findById(id);
        ProblemAnswer problemAnswer1 = problemAnswer.get();
        testSubmissionService.CreateFile(problemAnswer1);
    }

}

