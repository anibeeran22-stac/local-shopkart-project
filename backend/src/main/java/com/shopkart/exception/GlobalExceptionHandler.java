package com.shopkart.exception;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.shopkart.dto.ErrorResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(CategoryNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleCategoryNotFound(CategoryNotFoundException ex){
		
		ErrorResponse error = new ErrorResponse();
		
		error.setStatus(HttpStatus.NOT_FOUND.value());
		error.setMessage(ex.getMessage());
		error.setTimestamp(LocalDateTime.now());
		
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<ExceptionResponse> handleUserNotFound(UserNotFoundException ex){
		
		ExceptionResponse response = new ExceptionResponse();
		
		response.setTimestamp(LocalDateTime.now());
		response.setStatus(HttpStatus.NOT_FOUND.value());
		response.setMessage(ex.getMessage());
	
		return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ValidationErrorResponse> handleValidationException(
			MethodArgumentNotValidException ex){
		
		List<String> errors = ex.getBindingResult()
				.getFieldErrors()
				.stream()
				.map(error ->error.getDefaultMessage())
				.toList();
		
		ValidationErrorResponse response = new ValidationErrorResponse();
		
		response.setTimestamp(LocalDateTime.now());
		response.setStatus(HttpStatus.BAD_REQUEST.value());
	    response.setMessage("Validation Failed");
	    response.setErrors(errors);

	    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		
	}
	
}
