package com.example.backend;

import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

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
			adminUser.setFirstname("Admin");
			adminUser.setLastName("Admin");
			adminUser.setEmail("admin@example.com");
			adminUser.setRole(Role.ROLE_ADMIN);
			adminUser.setPassword(passwordEncoder.encode("admin"));
			userRepository.save(adminUser);
		};
	}*/
}
