package com.example.backend.Service.Implementation;

import com.example.backend.Entity.PasswordGenerator;
import com.example.backend.Entity.Role;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Entity.User;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
    private PasswordEncoder passwordEncoder;
    @Autowired
   private JavaMailSender javaMailSender;

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
                  //  passwordEncoder.encode(user.getPassword()),
                    user.getLinkedinUrl()
            );
            use.setRole(Role.ROLE_USER);
            //use.setPassword(passwordEncoder.encode(use.getPassword()));
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
                    //passwordEncoder.encode(user.getPassword()),
                    user.getLinkedinUrl()
            );

            use.setRole(Role.ROLE_USER);
           // use.setPassword(passwordEncoder.encode(use.getPassword()));
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

    public void acceptUser (long id ){
        User user = userRepository.findById(id);
        String email = user.getEmail();
        user.setPassword(passwordEncoder.encode(PasswordGenerator.generateRandomPassword()));
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject("Application Update: Internship at [Your Company]");

       
    }
    public void rejectUser (long id ){
        User user = userRepository.findById(id);
        String email = user.getEmail();
        String firstName =user.getFirstname();
        String lastName=user.getLastName();
        String rejectionMessage = String.format(
                "Dear %s %s,%n%n"
                        + "Thank you for applying for the internship position at [Your Company].%n%n"
                        + "After careful consideration, we regret to inform you that your application has not been selected for further consideration. We received many qualified applications, and the decision was a difficult one.%n%n"
                        + "We appreciate your interest in joining our team and encourage you to apply for future opportunities. Your skills and experience are commendable, and we wish you the best in your future endeavors.%n%n"
                        + "If you have any questions or would like feedback on your application, please feel free to contact us at [Your Contact Email].%n%n"
                        + "Thank you for your understanding.%n%n"
                        + "Best regards,%n"
                        + "The [Your Company] Team",
                firstName, lastName);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Application Update: Internship at [Your Company]");
        message.setText(rejectionMessage);
        javaMailSender.send(message);

    }
}