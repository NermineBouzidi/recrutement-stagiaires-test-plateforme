package com.example.backend.Service.Implementation;

import com.example.backend.DTO.AdminDTO;
import com.example.backend.DTO.LoginDTO;
import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.Admin;
import com.example.backend.Repository.AdminRepository;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Entity.User;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImp implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
  //  @Autowired
    //private AuthenticationManager authenticationManager;


    public String addUser (UserDTO userDTO){
        User use = new User(
                userDTO.getFirstname(),
                userDTO.getLastName(),
                userDTO.getEmail(),
                userDTO.getNumber(),
                userDTO.getEducationLevel()
        );
        use.setPassword(passwordEncoder.encode(use.getPassword()));
        userRepository.save(use);
        return "Registration successful";

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
    public String login(LoginDTO loginDTO) {

        User user = userRepository.findByEmail(loginDTO.getEmail());

        if (user != null) {
            String enteredPassword = loginDTO.getPassword();

            if (enteredPassword != null) {
                String passwordBD = user.getPassword();

                if (passwordEncoder.matches(enteredPassword, passwordBD)) {
                    return "Login successful";
                } else {
                    return "Incorrect password";
                }
            } else {
                return "Password is null";
            }
        } else {
            return "User not found";
        }
    }
   public String adminLogin(AdminDTO adminDTO){
        Admin admin = adminRepository.findByEmail(adminDTO.getEmail());

        if (admin != null) {
            String enteredPassword = adminDTO.getPassword();

            if (enteredPassword != null) {
                String passwordBD = admin.getPassword();

                if (enteredPassword.equals(passwordBD)) {
                    return "Login successful";
                } else {
                    return "Incorrect password";
                }
            } else {
                return "Password is null";
            }
        } else {
            return "User not found";
        }
    }





}
