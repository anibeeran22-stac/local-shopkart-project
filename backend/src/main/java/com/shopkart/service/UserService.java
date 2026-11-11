package com.shopkart.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.shopkart.dto.UserRequest;
import com.shopkart.dto.UserResponse;
import com.shopkart.dto.UserUpdateRequest;

public interface UserService {
	
	UserResponse createUser(UserRequest request);
	
	List<UserResponse> getAllUsers();
	
	UserResponse getUserById(Long id);
	
	UserResponse updateUser(Long id, UserUpdateRequest request);
	
	void deleteUser(Long id);
	
	UserResponse uploadProfileImage(Long id, MultipartFile image);

}
