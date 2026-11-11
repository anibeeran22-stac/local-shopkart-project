package com.shopkart.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.shopkart.dto.ProductRequest;
import com.shopkart.dto.ProductResponse;

public interface ProductService {
	
	ProductResponse createProduct(ProductRequest request, MultipartFile image);
	List<ProductResponse> getAllProducts();
	
	ProductResponse getProductById(Long id);
	
	ProductResponse updateProduct(Long id, ProductRequest request, MultipartFile image);
	
	void deleteProduct(Long id);	
	
	

}
