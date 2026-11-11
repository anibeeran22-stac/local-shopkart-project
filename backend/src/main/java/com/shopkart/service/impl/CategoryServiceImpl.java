package com.shopkart.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shopkart.dto.CategoryRequest;
import com.shopkart.dto.CategoryResponse;
import com.shopkart.entity.Category;
import com.shopkart.exception.CategoryNotFoundException;
import com.shopkart.repository.CategoryRepository;
import com.shopkart.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {
	
	private final CategoryRepository categoryRepository;
	
	// Constructor
	public CategoryServiceImpl(CategoryRepository categoryRepository) {
		this.categoryRepository=categoryRepository;
	}
	
	@Override
	public CategoryResponse createCategory(CategoryRequest request) {
		
		Category category = new Category();
		
		category.setName(request.getName());
		category.setDescription(request.getDescription());
		category.setImageUrl(request.getImageUrl());
		
		Category savedCategory = categoryRepository.save(category);
		
		CategoryResponse response=new CategoryResponse();
		
		response.setId(savedCategory.getId());
		response.setName(savedCategory.getName());
		response.setDescription(savedCategory.getDescription());
		response.setImageUrl(savedCategory.getImageUrl());
		response.setActive(savedCategory.getActive());
		response.setCreatedAt(savedCategory.getCreatedAt());
		response.setUpdatedAt(savedCategory.getUpdatedAt());
		
		return response;
	}

	@Override
	public List<CategoryResponse> getAllCategories(){
		List<Category> categories = categoryRepository.findAll();
		
		return categories.stream().map(category ->{
			
			CategoryResponse response=new CategoryResponse();
			
			response.setId(category.getId());
			response.setName(category.getName());
			response.setDescription(category.getDescription());
			response.setActive(category.getActive());
			response.setCreatedAt(category.getCreatedAt());
			response.setUpdatedAt(category.getUpdatedAt());
			response.setImageUrl(category.getImageUrl());
			
			return response;
			
		}).toList();
	}
	
	@Override
	public CategoryResponse getCategoryById(Long id) {
		Category category=categoryRepository.findById(id)
		.orElseThrow(() -> new CategoryNotFoundException("Category not found"));
		
		
		CategoryResponse response=new CategoryResponse();
		
		response.setId(category.getId());
		response.setName(category.getName());
		response.setDescription(category.getDescription());
		response.setActive(category.getActive());
		response.setCreatedAt(category.getCreatedAt());
		response.setUpdatedAt(category.getUpdatedAt());
		response.setImageUrl(category.getImageUrl());
		
		return response;
		
	}
	
	@Override
	public CategoryResponse updateCategory(Long id, CategoryRequest request) {
		
		Category category = categoryRepository.findById(id)
				.orElseThrow(()-> new CategoryNotFoundException("Category not Found"));
		
		category.setName(request.getName());
		category.setDescription(request.getDescription());
		category.setImageUrl(request.getImageUrl());
		
		Category updatedCategory=categoryRepository.save(category);
		
		CategoryResponse response=new CategoryResponse();
		
		response.setId(updatedCategory.getId());
	    response.setName(updatedCategory.getName());
	    response.setDescription(updatedCategory.getDescription());
	    response.setImageUrl(updatedCategory.getImageUrl());
	    response.setActive(updatedCategory.getActive());
	    response.setCreatedAt(updatedCategory.getCreatedAt());
	    response.setUpdatedAt(updatedCategory.getUpdatedAt());

	    return response;
	}
	
	@Override
	public void deleteCategory(Long id) {
		Category category = categoryRepository.findById(id)
				.orElseThrow(()-> new  CategoryNotFoundException("Category not found"));
		
		categoryRepository.delete(category);
	}
	
	
	
	

}
