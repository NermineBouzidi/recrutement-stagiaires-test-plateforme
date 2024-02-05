package com.example.backend.Controller;

import com.example.backend.DTO.AdminDTO;
import com.example.backend.DTO.LoginDTO;
import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.User;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable long id) {
        userService.deleteUser(id);
    }

    @PutMapping("/update")
    public void update(@PathVariable long id) {

    }

    @GetMapping("/hi")
    public String s() {
        return "hello";
    }

    @GetMapping("/getUsers")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/getUser")
    public User getUser(long id) {
        return userService.getUser(id);
    }

    @PostMapping("/login")
    public String Log(@RequestBody LoginDTO loginDTO) {
        return userService.login(loginDTO);
    }

    @PostMapping("/loginAdmin")
    @CrossOrigin(origins = "http://localhost:4200")
    public String Logadmin (@RequestBody AdminDTO adminDTO){
        return userService.adminLogin(adminDTO);
    }
}
