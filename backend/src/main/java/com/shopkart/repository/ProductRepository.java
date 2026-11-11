package com.shopkart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopkart.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

}
