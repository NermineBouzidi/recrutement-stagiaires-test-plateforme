package com.example.backend.Service.Implementation;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.PasswordGenerator;
import com.example.backend.Entity.Quiz;
import com.example.backend.Entity.Role;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Entity.User;
import com.example.backend.Service.UserService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImp implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
   private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

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
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return "succes";
        } else {
            return "user not found";

        }
    }

    @Override
    public String updateUser(long id , UserDTO user) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User user1 = existingUser.get();
            user1.setFirstname(user.getFirstname());
            user1.setLastName(user.getLastName());
            user1.setEmail(user.getEmail());
            user1.setNumber(user.getNumber());
            userRepository.save(user1);
            return "user updated successfully";
        } else {
            return "update failed";
        }

    }

    public List<User> getUsers (){
        List <User> liste =userRepository.findAll();
        List<User> listeUser = liste.stream()
                .filter(user -> user.getRole() == Role.ROLE_USER)
                .collect(Collectors.toList());
        return listeUser;
    }
    public Optional<User> getUser(long id){

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

    public String acceptUser (long id ){

        try {
            Optional<User> userOptional = userRepository.findById(id);

            if (userOptional.isPresent()) {
                User user =userOptional.get();
                String email = user.getEmail();
                String generatedPassword = PasswordGenerator.generateRandomPassword();
                user.setPassword(passwordEncoder.encode(generatedPassword));
                userRepository.save(user);
                SimpleMailMessage message = new SimpleMailMessage();
                String acceptanceMessage = String.format(
                        "Dear %s %s,%n%n"
                                + "Congratulations! We are pleased to inform you that your application at Testing Intern Platform has been accepted.%n%n"
                                + "You are now a part of our internship program. Below are the details to access your account and start taking the tests:%n%n"
                                + "Username: %s %n"
                                + "Password: %s%n"
                                + "Please log in to our platform using the provided credentials and follow the instructions to begin your journey with us.%n%n"
                                + "If you have any questions or need assistance, feel free to contact us at %s .%n%n"
                                + "We look forward to having you on board!%n%n"
                                + "Best regards,%n"
                                + "The Testing Intern Platform Team",
                        user.getFirstname(), user.getLastName(), email, generatedPassword,fromEmail);
                message.setTo(email);
                message.setSubject("Application Update: Internship at Testing Intern Platform");
                message.setText(acceptanceMessage);
                message.setFrom(fromEmail);
                javaMailSender.send(message);
                return "email send successfully";
            } else {
                return "User not found with id ";

            }
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }
    public String rejectUser (long id ){

        try {
            Optional<User> userOptional = userRepository.findById(id);

            if (userOptional.isPresent()) {
                User user =userOptional.get();
                String email = user.getEmail();
                String rejectionMessage = String.format(
                "Dear %s %s,%n%n"
                        + "Thank you for applying for the internship position at Testing Intern Platform.%n%n"
                        + "After careful consideration, we regret to inform you that your application has not been selected for further consideration. We received many qualified applications, and the decision was a difficult one.%n%n"
                        + "We appreciate your interest in joining our team and encourage you to apply for future opportunities. Your skills and experience are commendable, and we wish you the best in your future endeavors.%n%n"
                        + "If you have any questions or would like feedback on your application, please feel free to contact us at %s .%n%n"
                        + "Thank you for your understanding.%n%n"
                        + "Best regards,%n"
                        + "The Testing Intern Platform Team",
                        user.getFirstname(), user.getLastName() ,fromEmail);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setFrom(fromEmail);
        message.setSubject("Application Update: Internship at Testing Intern Platform");
        message.setText(rejectionMessage);
        javaMailSender.send(message);
                return "email send successfully";
            } else {
                return "User not found with id ";

            }
        } catch (Exception e){
            throw new RuntimeException(e);
        }

    }

    public byte[] getResume (long id) throws IOException{
        Optional<User> user= userRepository.findById(id);
        if(user.isPresent()){
            String resumePath = user.get().getResumePath();
            byte[] resume = Files.readAllBytes(new File(resumePath).toPath());
            return resume;
        } else
            throw new IOException("user not found");
    }

    @Override
    public void changePassword(Long userId, String currentPassword, String newPassword, String confirmPassword) throws IOException{
        // Use orElseThrow for proper exception handling
        Optional<User> userOptional = userRepository.findById(userId);
        if(userOptional.isPresent()) {
            User user =userOptional.get();
            // Validate password match before hashing
            if (!newPassword.equals(confirmPassword)) {
                throw new BadRequestException("New passwords do not match");
            }

            // Ensure current password matches before updating
            if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
                throw new BadRequestException("Current password is incorrect");
            }

            // Update password with hashed value
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        } else
            throw new IOException("user not found");
    }


}