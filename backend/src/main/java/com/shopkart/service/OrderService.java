package com.shopkart.service;

import java.util.List;

import com.shopkart.dto.OrderRequest;
import com.shopkart.dto.OrderResponse;

public interface OrderService {

    OrderResponse createOrder(OrderRequest request);
    
    List<OrderResponse> getOrdersByUser(Long userId);
    
    List<OrderResponse> getAllOrders();

    OrderResponse updateOrderStatus(Long orderId, String status);
    
    OrderResponse getOrderById(Long orderId);
    
    

}
