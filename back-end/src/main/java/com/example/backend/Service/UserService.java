package com.example.backend.Service;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.User;

import java.util.List;

public interface UserService {

    User addUser(User user);
    void deleteUser(long id);
    void updateUser(long id);
    List<User> getUsers ();
    User getUser(long id);

}