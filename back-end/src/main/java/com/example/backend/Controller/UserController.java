package com.example.backend.Controller;

import com.example.backend.Entity.User;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

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

    @PutMapping("/update")
    public void update(@RequestBody long id) {

    }

    @GetMapping("/hi")
    public String s() {
        return "hello";
    }

    @GetMapping("/getUsers")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/getUser/{id}")
    public User getUser(@PathVariable long id) {

        return userService.getUser(id);
    }


}
