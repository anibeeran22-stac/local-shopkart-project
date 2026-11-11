package com.shopkart.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


public class CategoryRequest {
	@NotBlank(message="Category name is required")
	@Size(max=100, message="Category name should not exceed 100 characters")
	private String name;
	
	@Size(max=500, message="Description should not exceed 500 characters")
	private String description;
	
	private String imageurl;
	
	public CategoryRequest() {
		
	}

	public CategoryRequest(
			@NotBlank(message = "Category name is required") @Size(max = 100, message = "Category name should not exceed 100 characters") String name,
			@Size(max = 500, message = "Description should not exceed 500 characters") String description,
			String imageurl) {
		super();
		this.name = name;
		this.description = description;
		this.imageurl = imageurl;
	}


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImageUrl() {
		return imageurl;
	}

	public void setImageUrl(String imageurl) {
		this.imageurl = imageurl;
	}
	
	

	

	

}
