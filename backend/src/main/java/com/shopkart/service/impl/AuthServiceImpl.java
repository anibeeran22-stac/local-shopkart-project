package com.shopkart.service.impl;

import org.springframework.stereotype.Service;

import com.shopkart.dto.LoginRequest;
import com.shopkart.dto.LoginResponse;
import com.shopkart.entity.User;
import com.shopkart.repository.UserRepository;
import com.shopkart.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    public AuthServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid Email"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        LoginResponse response = new LoginResponse();

        response.setId(user.getId());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());

        return response;
    }

}