package com.example.backend.Service.Implementation;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Entity.User;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImp implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    public User addUser (User user){
// Encode the password of the original user object
        String encodedPassword = passwordEncoder.encode(user.getPassword());

        // Create a new User object with the encoded password
        User use = new User(
                user.getFirstname(),
                user.getLastName(),
                user.getEmail(),
                user.getNumber(),
                user.getEducationLevel(),
                encodedPassword
        );
        User savedUser= userRepository.save(use);
        return savedUser;
    }
    public void deleteUser (long id){
        User user = userRepository.findById(id);
        userRepository.delete(user);
    }

    @Override
    public void updateUser(long id) {

    }
    public List<User> getUsers (){
        List <User> liste =userRepository.findAll();
        return liste;
    }
    public User getUser(long id){
        return userRepository.findById(id);

    }

}
