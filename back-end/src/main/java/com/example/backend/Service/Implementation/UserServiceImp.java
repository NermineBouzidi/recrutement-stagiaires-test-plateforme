package com.example.backend.Service.Implementation;

import com.example.backend.DTO.AdminDTO;
import com.example.backend.DTO.LoginDTO;
import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.Admin;
import com.example.backend.Entity.Role;
import com.example.backend.Repository.AdminRepository;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Entity.User;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class UserServiceImp implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    private final String FOLDER_PATH="C:/Users/nermi/Documents/CVs/";
  //  @Autowired
    //private AuthenticationManager authenticationManager;

    public  String addFile (MultipartFile file){
        String filePath = FOLDER_PATH + file.getOriginalFilename();
        try {

            file.transferTo(new File(filePath));
            return "file added successfuly";
        } catch (IOException | RuntimeException e) {
            e.printStackTrace(); // Log the exception for debugging
            return "Error during registration";

        }

    }
    public String addUser (User user ){

        if (userRepository.findByEmail(user.getEmail())!=null){
            return "user already exists ";
        }else {
            User use = new User(
                    user.getFirstname(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getNumber(),
                    user.getEducationLevel(),
                   // passwordEncoder.encode(user.getPassword()),
                    user.getLinkedinUrl()
            );
            use.setRole(Role.ROLE_USER);
            use.setPassword(passwordEncoder.encode(use.getPassword()));
            userRepository.save(use);
            return "Registration successful";
        }
    }
    public String deleteUser (long id){
        User user = userRepository.findById(id);
        if (user !=null) {
            userRepository.deleteById(id);
            return "succes";
        } else {
            return "user not found";

        }
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

    public String signup (User user ,MultipartFile file ) {
        String filePath = FOLDER_PATH + file.getOriginalFilename();

        if (userRepository.findByEmail(user.getEmail()) != null) {
            return "user already exists ";
        } else {
            try {
            User use = new User(
                    user.getFirstname(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getNumber(),
                    user.getEducationLevel(),
                    // passwordEncoder.encode(user.getPassword()),
                    user.getLinkedinUrl()
            );
            use.setRole(Role.ROLE_USER);
            use.setPassword(passwordEncoder.encode(use.getPassword()));
            use.setResumePath(filePath);
            userRepository.save(use);


                file.transferTo(new File(filePath));
                return "Registration successful";
            } catch (IOException | RuntimeException e) {
                e.printStackTrace(); // Log the exception for debugging
                return "Error during registration";

            }

        }
    }
}