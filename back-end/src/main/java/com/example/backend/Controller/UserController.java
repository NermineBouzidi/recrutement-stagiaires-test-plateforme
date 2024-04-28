package com.example.backend.Controller;

import com.example.backend.DTO.ChangePasswordRequest;
import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Security.JwtUtils;
import com.example.backend.Service.UserService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Secured("hasRole('ADMIN','EVALUATOR')")
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    JwtUtils jwtUtils;

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) {
        if (id == 0 || id <= 0) {
            return ResponseEntity.badRequest().build();
        }
       String s= userService.deleteUser(id);
        if (s.equals("succes")) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@PathVariable long id,@RequestBody UserDTO user) {
        String s = userService.updateUser(id,user);
        if (s.equals("user updated successfully")) {
            return ResponseEntity.ok("user updated successfully");
        } else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(s);
    }

    @GetMapping("/hi")
    public String s() {
        return "hello";
    }

    @GetMapping("/getUsers")
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
        String s= userService.acceptUser(id);
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
        String s= userService.rejectUser(id);
        if (s.equals("email send successfully")) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/getFile/{id}")
    public ResponseEntity<?> getFile (@PathVariable long id) throws IOException {
        byte[] file =userService.getResume(id);
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
}
