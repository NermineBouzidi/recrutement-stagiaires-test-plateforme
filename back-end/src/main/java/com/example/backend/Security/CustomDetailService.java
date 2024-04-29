package com.example.backend.Security;

import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomDetailService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
      User userOptional = userRepository.findByEmail(email);

        if (userOptional != null){
            UserDetailsAdapter user=new UserDetailsAdapter(userOptional);
            return new org.springframework.security.core.userdetails.User(email,user.getPassword(),user.getAuthorities());
        }
        return null;
    }
}
