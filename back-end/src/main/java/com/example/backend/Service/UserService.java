package com.example.backend.Service;

import com.example.backend.DTO.AdminDTO;
import com.example.backend.DTO.LoginDTO;
import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {

    String addUser(User user );
    String addFile (MultipartFile file);
    String deleteUser(long id);
    void updateUser(long id);
    List<User> getUsers ();
    User getUser(long id);
    String signup (User user ,MultipartFile file );


}