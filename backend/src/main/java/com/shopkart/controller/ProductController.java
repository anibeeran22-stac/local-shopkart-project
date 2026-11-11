package com.shopkart.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.shopkart.dto.ProductRequest;
import com.shopkart.dto.ProductResponse;
import com.shopkart.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {
	

	private final ProductService productService;
	
	// constructor
	public ProductController(ProductService productService) {
		this.productService=productService;
	}
	
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ProductResponse createProduct(

	        @ModelAttribute ProductRequest request,

	        @RequestParam("image") MultipartFile image

	) {

	    return productService.createProduct(request, image);

	}
		
	@GetMapping
	public List<ProductResponse> getAllProducts() {
		return productService.getAllProducts();
	}
	
	
	@GetMapping("/{id}")
	public ProductResponse getProductById(@PathVariable Long id) {
		return productService.getProductById(id);
		
	}
	
	@PutMapping(value="/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ProductResponse updateProduct(

	        @PathVariable Long id,

	        @ModelAttribute ProductRequest request,

	        @RequestParam(value="image", required = false) MultipartFile image

	) {

	    return productService.updateProduct(id, request, image);

	}
	
	@DeleteMapping("/{id}")
	public void deleteProduct(@PathVariable Long id) {
		 productService.deleteProduct(id);
	}
	

}
