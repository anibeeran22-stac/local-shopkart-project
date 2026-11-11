package com.shopkart.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shopkart.dto.OrderItemRequest;
import com.shopkart.dto.OrderItemResponse;
import com.shopkart.dto.OrderRequest;
import com.shopkart.dto.OrderResponse;
import com.shopkart.entity.Order;
import com.shopkart.entity.OrderItem;
import com.shopkart.entity.Product;
import com.shopkart.entity.User;
import com.shopkart.repository.OrderItemRepository;
import com.shopkart.repository.OrderRepository;
import com.shopkart.repository.ProductRepository;
import com.shopkart.repository.UserRepository;
import com.shopkart.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public OrderServiceImpl(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            ProductRepository productRepository,
            UserRepository userRepository) {

        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public OrderResponse createOrder(OrderRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found: " + request.getUserId()));

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new RuntimeException(
                    "Order must contain at least one product");
        }

        Order order = new Order();

        order.setUser(user);
        order.setPaymentMethod(request.getPaymentMethod());
        order.setAddress(request.getAddress());
        order.setPhone(request.getPhone());
        order.setStatus("PENDING");

        double totalAmount = 0.0;

        List<OrderItem> orderItems = new ArrayList<>();
        List<OrderItemResponse> itemResponses = new ArrayList<>();

        for (OrderItemRequest itemRequest : request.getItems()) {

            if (itemRequest.getQuantity() == null ||
                    itemRequest.getQuantity() <= 0) {

                throw new RuntimeException(
                        "Quantity must be greater than 0");
            }

            Product product = productRepository
                    .findById(itemRequest.getProductId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Product not found: "
                                            + itemRequest.getProductId()));

            if (product.getStock() < itemRequest.getQuantity()) {

                throw new RuntimeException(
                        "Insufficient stock for product: "
                                + product.getName());
            }

            Double price = product.getPrice();

            Double itemTotal =
                    price * itemRequest.getQuantity();

            totalAmount += itemTotal;

            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setPrice(price);

            orderItems.add(orderItem);

            OrderItemResponse itemResponse =
                    new OrderItemResponse();

            itemResponse.setProductId(product.getId());
            itemResponse.setProductName(product.getName());
            itemResponse.setImageUrl(product.getImageUrl());
            itemResponse.setQuantity(itemRequest.getQuantity());
            itemResponse.setPrice(price);
            itemResponse.setTotal(itemTotal);

            itemResponses.add(itemResponse);

            // Reduce stock
            product.setStock(
                    product.getStock()
                            - itemRequest.getQuantity()
            );

            productRepository.save(product);
        }

        // IMPORTANT: set total before saving Order
        order.setTotalAmount(totalAmount);

        // Attach items to order
        order.setOrderItems(orderItems);

        // Save order + order items together
        Order savedOrder = orderRepository.save(order);

        return convertToResponse(savedOrder, itemResponses);
    }

    private OrderResponse convertToResponse(
            Order order,
            List<OrderItemResponse> items) {

        OrderResponse response = new OrderResponse();

        response.setOrderId(order.getId());

        response.setUserId(order.getUser().getId());

        response.setCustomerName(
            order.getUser().getFirstName()
            + " "
            + order.getUser().getLastName()
        );

        response.setCustomerEmail(
            order.getUser().getEmail()
        );

        response.setTotalAmount(
            order.getTotalAmount()
        );

        response.setStatus(
            order.getStatus()
        );

        response.setPaymentMethod(
            order.getPaymentMethod()
        );

        response.setAddress(
            order.getAddress()
        );

        response.setPhone(
            order.getPhone()
        );

        response.setCreatedAt(
            order.getCreatedAt()
        );

        response.setItems(items);

        return response;
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getOrdersByUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found: " + userId));

        List<Order> orders = orderRepository.findByUser(user);

        return orders.stream()
                .map(order -> {

                    List<OrderItemResponse> itemResponses =
                            order.getOrderItems()
                                    .stream()
                                    .map(item -> {

                                        OrderItemResponse response =
                                                new OrderItemResponse();

                                        response.setProductId(
                                                item.getProduct().getId()
                                        );

                                        response.setProductName(
                                                item.getProduct().getName()
                                        );

                                        response.setImageUrl(
                                                item.getProduct().getImageUrl()
                                        );

                                        response.setQuantity(
                                                item.getQuantity()
                                        );

                                        response.setPrice(
                                                item.getPrice()
                                        );

                                        response.setTotal(
                                                item.getPrice()
                                                        * item.getQuantity()
                                        );

                                        return response;

                                    })
                                    .collect(Collectors.toList());

                    return convertToResponse(
                            order,
                            itemResponses
                    );

                })
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getAllOrders() {

        List<Order> orders = orderRepository.findAll();

        return orders.stream()
                .map(order -> {

                    List<OrderItemResponse> itemResponses =
                            order.getOrderItems()
                                    .stream()
                                    .map(item -> {

                                        OrderItemResponse response =
                                                new OrderItemResponse();

                                        response.setProductId(
                                                item.getProduct().getId()
                                        );

                                        response.setProductName(
                                                item.getProduct().getName()
                                        );

                                        response.setImageUrl(
                                                item.getProduct().getImageUrl()
                                        );

                                        response.setQuantity(
                                                item.getQuantity()
                                        );

                                        response.setPrice(
                                                item.getPrice()
                                        );

                                        response.setTotal(
                                                item.getPrice()
                                                        * item.getQuantity()
                                        );

                                        return response;

                                    })
                                    .collect(Collectors.toList());

                    return convertToResponse(
                            order,
                            itemResponses
                    );

                })
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional
    public OrderResponse updateOrderStatus(
            Long orderId,
            String status) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Order not found: " + orderId));

        String newStatus =
                status.trim().toUpperCase();

        if (!newStatus.equals("PENDING") &&
                !newStatus.equals("CONFIRMED") &&
                !newStatus.equals("SHIPPED") &&
                !newStatus.equals("DELIVERED") &&
                !newStatus.equals("CANCELLED")) {

            throw new RuntimeException(
                    "Invalid order status");
        }

        order.setStatus(newStatus);

        Order savedOrder =
                orderRepository.save(order);

        List<OrderItemResponse> itemResponses =
                savedOrder.getOrderItems()
                        .stream()
                        .map(item -> {

                            OrderItemResponse response =
                                    new OrderItemResponse();

                            response.setProductId(
                                    item.getProduct().getId()
                            );

                            response.setProductName(
                                    item.getProduct().getName()
                            );

                            response.setImageUrl(
                                    item.getProduct().getImageUrl()
                            );

                            response.setQuantity(
                                    item.getQuantity()
                            );

                            response.setPrice(
                                    item.getPrice()
                            );

                            response.setTotal(
                                    item.getPrice()
                                            * item.getQuantity()
                            );

                            return response;

                        })
                        .collect(Collectors.toList());

        return convertToResponse(
                savedOrder,
                itemResponses
        );
    }
    
    
    @Override
    @Transactional(readOnly = true)
    public OrderResponse getOrderById(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Order not found: " + orderId));

        List<OrderItemResponse> itemResponses =
                order.getOrderItems()
                        .stream()
                        .map(item -> {

                            OrderItemResponse response =
                                    new OrderItemResponse();

                            response.setProductId(
                                    item.getProduct().getId()
                            );

                            response.setProductName(
                                    item.getProduct().getName()
                            );

                            response.setImageUrl(
                                    item.getProduct().getImageUrl()
                            );

                            response.setQuantity(
                                    item.getQuantity()
                            );

                            response.setPrice(
                                    item.getPrice()
                            );

                            response.setTotal(
                                    item.getPrice()
                                            * item.getQuantity()
                            );

                            return response;

                        })
                        .toList();

        return convertToResponse(
                order,
                itemResponses
        );
    }
}