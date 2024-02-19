package com.example.backend.Service;

import com.example.backend.Entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface UserService {

    String addUser(User user );
    String addFile (MultipartFile file);
    String deleteUser(long id);
    void updateUser(long id);
    List<User> getUsers ();
    Optional<User> getUser(long id);
    String signup (User user ,MultipartFile file );
    String acceptUser (long id );
    String rejectUser (long id );
}