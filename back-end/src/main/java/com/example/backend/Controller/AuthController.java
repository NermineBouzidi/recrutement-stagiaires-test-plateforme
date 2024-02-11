package com.example.backend.Controller;

import com.example.backend.DTO.LoginDTO;
import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Security.JwtUtils;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/register")
    public ResponseEntity<String> register (@RequestBody User user) {
       String s= userService.addUser(user);
       
        if(s.equals("Registration successful")) {
            return ResponseEntity.ok(jwtUtils.generate(user));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(s);

        }

    }

    @PostMapping("/login")
    public ResponseEntity<String> login (@RequestBody LoginDTO loginDTO){
        try {
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword());
            authenticationManager.authenticate(token);
            User user = userRepository.findByEmail(loginDTO.getEmail());
            return ResponseEntity.ok(jwtUtils.generate(user));
        }catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Login failed");
        }
    }


}
