package com.shopkart.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shopkart.dto.CategoryRequest;
import com.shopkart.dto.CategoryResponse;

public interface CategoryService {
	
	CategoryResponse createCategory(CategoryRequest request);
	
	List<CategoryResponse> getAllCategories();
	
	CategoryResponse getCategoryById(Long id);
	
	CategoryResponse updateCategory(Long id, CategoryRequest request);
	
	void deleteCategory(Long id);
	

}
