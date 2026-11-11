package com.shopkart.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.shopkart.dto.UserRequest;
import com.shopkart.dto.UserResponse;
import com.shopkart.dto.UserUpdateRequest;
import com.shopkart.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private final UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@PostMapping
	public UserResponse createUser(@Valid @RequestBody UserRequest request) {
		
		System.out.println("Controller Hit");
		
		return userService.createUser(request);
	}
	
	@GetMapping
	public List<UserResponse> getAllUsers(){
		return userService.getAllUsers();
	}
	
	@GetMapping("/{id}")
	public UserResponse getUserById(@PathVariable Long id) {
		return userService.getUserById(id);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<UserResponse> updateUser(
	        @PathVariable Long id,
	        @Valid @RequestBody UserUpdateRequest request) {

	    UserResponse response =
	            userService.updateUser(id, request);

	    return ResponseEntity.ok(response);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteUser(@PathVariable Long id) {
		userService.deleteUser(id);
	}
	
	@PostMapping(value = "/{id}/profile-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public UserResponse uploadProfileImage(
	        @PathVariable Long id,
	        @RequestParam("image") MultipartFile image) {

	    return userService.uploadProfileImage(id, image);
	}
	
	
	
}
