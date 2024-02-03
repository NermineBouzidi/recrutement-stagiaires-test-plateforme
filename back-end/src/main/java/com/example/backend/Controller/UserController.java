package com.example.backend.Controller;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.User;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/add")
    public void add (@RequestBody User user) {
        userService.addUser(user);

    }

    @DeleteMapping("/delete/{id}")
    public void delete (@PathVariable long id) {
         userService.deleteUser(id);
    }
    @PutMapping("/update")
    public void update (@PathVariable long id){

    }

    @GetMapping("/hi")
    public String s(){
        return "hello";
    }
    @GetMapping("/getUsers")
    public List <User> getUsers (){
       return userService.getUsers();
    }
    @GetMapping("/getUser")
    public User getUser (long id){
        return userService.getUser(id);
    }


}
