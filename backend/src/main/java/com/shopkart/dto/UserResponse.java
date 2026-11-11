package com.shopkart.dto;

import java.time.LocalDateTime;

import com.shopkart.enums.Role;

public class UserResponse {
	
	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private String phone;
	private Role role;
	private Boolean active;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	
	private String profileImage;
	
	public UserResponse() {
		
	}
	// getters andd setters

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}


	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
	
	public String getProfileImage() {
	    return profileImage;
	}

	public void setProfileImage(String profileImage) {
	    this.profileImage = profileImage;
	}
	
	

}
