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

	/*@Bean
	public CommandLineRunner commandLineRunner() {
		return args -> {
			// Create and save an admin user during application startup
			LocalDateTime februaryRegistrationDate = LocalDateTime.of(2024, Month.JANUARY, 1, 0, 0); // Assuming the registration date is February 1st, 2024
			User adminUser = new User();
			adminUser.setFirstname("User");
			adminUser.setLastName("User");
			adminUser.setEmail("user132@example.com");
			adminUser.setRole(Role.ROLE_USER);
			adminUser.setRegistrationDate(februaryRegistrationDate);
			adminUser.setPassword(passwordEncoder.encode("admin"));
			userRepository.save(adminUser);
		};
	}*/
}
