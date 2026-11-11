
package com.shopkart.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.shopkart.dto.ProductRequest;
import com.shopkart.dto.ProductResponse;
import com.shopkart.entity.Category;
import com.shopkart.entity.Product;
import com.shopkart.exception.CategoryNotFoundException;
import com.shopkart.exception.ProductNotFoundException;
import com.shopkart.repository.CategoryRepository;
import com.shopkart.repository.ProductRepository;
import com.shopkart.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    // Constructor
    public ProductServiceImpl(
            ProductRepository productRepository,
            CategoryRepository categoryRepository) {

        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    // Save image in local folder
    private String saveImage(MultipartFile image) {

        try {
            Path uploadPath = Paths.get(
                    "src/main/resources/static/images"
            ).toAbsolutePath().normalize();

            Files.createDirectories(uploadPath);

            String originalFileName = image.getOriginalFilename();
            String extension = "";

            if (originalFileName != null && originalFileName.contains(".")) {
                extension = originalFileName.substring(
                        originalFileName.lastIndexOf(".")
                );
            }

            String fileName = UUID.randomUUID() + extension;

            Path filePath = uploadPath.resolve(fileName);

            Files.copy(image.getInputStream(), filePath);

            return "/images/" + fileName;

        } catch (IOException e) {
            throw new RuntimeException("Image Upload Failed", e);
        }
    }

    @Override
    public ProductResponse createProduct(ProductRequest request, MultipartFile image) {

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

        String imageUrl = null;

        if (image != null && !image.isEmpty()) {
            imageUrl = saveImage(image);
        }

        Product product = new Product();

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setCategory(category);
        product.setImageUrl(imageUrl);

        Product savedProduct = productRepository.save(product);

        ProductResponse response = new ProductResponse();

        response.setId(savedProduct.getId());
        response.setName(savedProduct.getName());
        response.setDescription(savedProduct.getDescription());
        response.setPrice(savedProduct.getPrice());
        response.setStock(savedProduct.getStock());
        response.setImageUrl(savedProduct.getImageUrl());
        response.setActive(savedProduct.getActive());
        response.setCategoryId(savedProduct.getCategory().getId());
        response.setCategoryName(savedProduct.getCategory().getName());

        return response;
    }

    @Override
    public List<ProductResponse> getAllProducts() {

        List<Product> products = productRepository.findAll();

        return products.stream().map(product -> {

            ProductResponse response = new ProductResponse();

            response.setId(product.getId());
            response.setName(product.getName());
            response.setDescription(product.getDescription());
            response.setPrice(product.getPrice());
            response.setStock(product.getStock());
            response.setImageUrl(product.getImageUrl());
            response.setActive(product.getActive());
            response.setCategoryName(product.getCategory().getName());
            response.setCategoryId(product.getCategory().getId());

            return response;

        }).toList();
    }

    @Override
    public ProductResponse getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));

        ProductResponse response = new ProductResponse();

        response.setId(product.getId());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setStock(product.getStock());
        response.setImageUrl(product.getImageUrl());
        response.setActive(product.getActive());
        response.setCategoryName(product.getCategory().getName());
        response.setCategoryId(product.getCategory().getId());

        return response;
    }

    @Override
    public ProductResponse updateProduct(
            Long id,
            ProductRequest request,
            MultipartFile image) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());

        if (image != null && !image.isEmpty()) {
            String imageUrl = saveImage(image);
            product.setImageUrl(imageUrl);
        }

        product.setCategory(category);

        Product saved = productRepository.save(product);

        ProductResponse response = new ProductResponse();

        response.setId(saved.getId());
        response.setName(saved.getName());
        response.setDescription(saved.getDescription());
        response.setPrice(saved.getPrice());
        response.setStock(saved.getStock());
        response.setImageUrl(saved.getImageUrl());
        response.setActive(saved.getActive());
        response.setCategoryId(saved.getCategory().getId());
        response.setCategoryName(saved.getCategory().getName());

        return response;
    }

    @Override
    public void deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));

        productRepository.delete(product);
    }
}
