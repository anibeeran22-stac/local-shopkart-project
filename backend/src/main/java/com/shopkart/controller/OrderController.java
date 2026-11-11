package com.shopkart.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shopkart.dto.OrderRequest;
import com.shopkart.dto.OrderResponse;
import com.shopkart.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(
            @RequestBody OrderRequest request) {

        OrderResponse response =
                orderService.createOrder(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderResponse>> getOrdersByUser(
            @PathVariable Long userId) {

        List<OrderResponse> orders =
                orderService.getOrdersByUser(userId);

        return ResponseEntity.ok(orders);
    }
    
    @GetMapping
    public ResponseEntity<List<OrderResponse>>
    getAllOrders() {

        List<OrderResponse> orders =
                orderService.getAllOrders();

        return ResponseEntity.ok(orders);
    }
    
    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderResponse>
    updateOrderStatus(
            @PathVariable Long orderId,
            @RequestParam String status) {

        OrderResponse response =
                orderService.updateOrderStatus(
                        orderId,
                        status
                );

        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrderById(
            @PathVariable Long orderId) {

        OrderResponse response =
                orderService.getOrderById(orderId);

        return ResponseEntity.ok(response);
    }
}