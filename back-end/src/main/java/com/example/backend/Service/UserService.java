package com.example.backend.Service;

import com.example.backend.DTO.DashboardCounts;
import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.Test;
import com.example.backend.Entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface UserService {

    String addUser(User user );
    String addFile (MultipartFile file);
    String deleteUser(long id);
    String updateUser(long id , UserDTO user);
    List<User> getUsers ();
    public List<User> getAllUsers ();
        Optional<User> getUser(long id);
    String signup (User user ,MultipartFile file );
    String acceptUser (long id );
    String rejectUser (long id );
    byte[] getResume (long id) throws IOException;
    public void changePassword(Long userId, String currentPassword, String newPassword, String confirmPassword)throws IOException ;
    DashboardCounts getDashboardCounts();
    String assignTestAndNotifyUser(long userId, Test test) ;
     String addEvaluator (User user );


    }
