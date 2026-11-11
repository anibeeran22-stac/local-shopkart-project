package com.shopkart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopkart.entity.Order;
import com.shopkart.entity.User;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUser(User user);

}