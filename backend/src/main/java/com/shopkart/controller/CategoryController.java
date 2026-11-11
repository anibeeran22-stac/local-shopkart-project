package com.shopkart.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.shopkart.dto.CategoryRequest;
import com.shopkart.dto.CategoryResponse;
import com.shopkart.repository.CategoryRepository;
import com.shopkart.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
	
	public final CategoryService categoryService;
	
	// constructor Injuction
	public CategoryController(CategoryService categoryService, CategoryRepository categoryRepository) {
		this.categoryService=categoryService;
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public CategoryResponse createCategory(@RequestBody CategoryRequest request) {
		return categoryService.createCategory(request);
	
	}
	
	@GetMapping
	public List<CategoryResponse> getAllCategories(){
		return categoryService.getAllCategories();
	}
	
	@GetMapping("/{id}")
	public CategoryResponse getCategoryById(@PathVariable Long id) {
		return categoryService.getCategoryById(id);
	}
	
	@PutMapping("/{id}")
	public CategoryResponse updateCategory(@PathVariable Long id, @RequestBody CategoryRequest request	) {
		
		return categoryService.updateCategory(id, request);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteCategory(@PathVariable Long id) {
		categoryService.deleteCategory(id);
	}
	

}
