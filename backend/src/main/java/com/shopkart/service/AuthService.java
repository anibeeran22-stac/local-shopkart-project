package com.shopkart.service;

import com.shopkart.dto.LoginRequest;
import com.shopkart.dto.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);

}