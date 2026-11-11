
package com.shopkart.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.shopkart.dto.UserRequest;
import com.shopkart.dto.UserResponse;
import com.shopkart.dto.UserUpdateRequest;
import com.shopkart.entity.User;
import com.shopkart.exception.UserNotFoundException;
import com.shopkart.repository.UserRepository;
import com.shopkart.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private UserResponse convertToResponse(User user) {

        UserResponse response = new UserResponse();

        response.setId(user.getId());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        response.setRole(user.getRole());
        response.setActive(user.getActive());
        response.setCreatedAt(user.getCreatedAt());
        response.setUpdatedAt(user.getUpdatedAt());
        response.setProfileImage(user.getProfileImage());

        return response;
    }

    // Save profile image locally
    private String saveProfileImage(MultipartFile image) {

        try {

            Path uploadPath = Paths.get(
                    "src/main/resources/static/profile"
            ).toAbsolutePath().normalize();

            Files.createDirectories(uploadPath);

            String originalFileName = image.getOriginalFilename();
            String extension = "";

            if (originalFileName != null && originalFileName.contains(".")) {
                extension = originalFileName.substring(
                        originalFileName.lastIndexOf(".")
                ).replaceAll("[^a-zA-Z0-9.]", "");
            }

            String fileName = UUID.randomUUID() + extension;

            Path filePath = uploadPath.resolve(fileName);

            Files.copy(image.getInputStream(), filePath);

            return "/profile/" + fileName;

        } catch (IOException e) {

            throw new RuntimeException("Profile image upload failed", e);
        }
    }

    @Override
    public UserResponse createUser(UserRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setPhone(request.getPhone());
        user.setRole(request.getRole());

        User savedUser = userRepository.save(user);

        return convertToResponse(savedUser);
    }

    @Override
    public List<UserResponse> getAllUsers() {

        List<User> users = userRepository.findAll();

        return users.stream().map(this::convertToResponse).toList();
    }

    @Override
    public UserResponse getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        return convertToResponse(user);
    }

    @Override
    public UserResponse updateUser(Long id, UserUpdateRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found: " + id));

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());

        User savedUser = userRepository.save(user);

        return convertToResponse(savedUser);
    }

    @Override
    public void deleteUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        userRepository.delete(user);
    }

    @Override
    public UserResponse uploadProfileImage(Long id, MultipartFile image) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        if (image == null || image.isEmpty()) {
            throw new RuntimeException("Please select a profile image");
        }

        String imageUrl = saveProfileImage(image);

        user.setProfileImage(imageUrl);

        User savedUser = userRepository.save(user);

        return convertToResponse(savedUser);
    }
}
