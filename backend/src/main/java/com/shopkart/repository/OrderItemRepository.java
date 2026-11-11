package com.shopkart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopkart.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}