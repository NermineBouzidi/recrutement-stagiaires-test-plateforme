package com.example.backend;

import com.example.backend.Entity.Enum.Role;
import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.time.Month;

@SpringBootApplication
public class BackEndApplication {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);
	}
/*	@Bean
	public CommandLineRunner commandLineRunner() {
		return args -> {
			// Create and save an admin user during application startup
			User adminUser = new User();
			adminUser.setFirstname("User");
			adminUser.setLastName("User");
			adminUser.setEmail("exal12@example.com");
			adminUser.setRole(Role.ROLE_EVALUATOR);
			adminUser.setPassword(passwordEncoder.encode("admin"));
			userRepository.save(adminUser);
		};
	}*/
}
