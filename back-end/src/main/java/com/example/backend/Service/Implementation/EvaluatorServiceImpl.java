package com.example.backend.Service.Implementation;

import com.example.backend.Entity.Enum.Role;
import com.example.backend.Entity.PasswordGenerator;
import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Service.EvaluatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class EvaluatorServiceImpl implements EvaluatorService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String fromEmail;
    @Override
    public List<User> getAllEvaluator() {
        return userRepository.findByRole(Role.ROLE_EVALUATOR);
    }

    @Override
    public String addEvaluator (User user ){
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return "user already exists ";
        }  else {
            User evaluator = new User();
            evaluator.setFirstname(user.getFirstname());
            evaluator.setLastName(user.getLastName());
            evaluator.setEmail(user.getEmail());
            evaluator.setNumber(user.getNumber());
            String generatedPassword = PasswordGenerator.generateRandomPassword();
            evaluator.setPassword(passwordEncoder.encode(generatedPassword));
            evaluator.setRole(Role.ROLE_EVALUATOR);
            userRepository.save(evaluator);
            String Message = String.format(
                    "Dear %s %s,%n%n"
                            + "This email confirms that you have been added as an evaluator to Testing Intern Platform by an administrator.%n%n"
                            + "Use the following credentials to log in to the application:%n%n"
                            + "Username: %s %n"
                            + "Password: %s %n"
                            + "Best regards,%n"
                            + "The Testing Intern Platform Team",
                    user.getFirstname(), user.getLastName(),user.getEmail(),generatedPassword );
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getEmail());
            message.setFrom(fromEmail);
            message.setSubject("Welcome to Testing Intern Platform as an Evaluator! ");
            message.setText(Message);
            try {
                javaMailSender.send(message);
                return "Registration successful. Email sent successfully.";
            } catch (MailException e) {
                return "Registration successful, but failed to send email.";
            }

        }
    }
}
