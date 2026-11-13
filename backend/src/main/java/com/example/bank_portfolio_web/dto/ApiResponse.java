package com.example.bank_portfolio_web.dto;

public record ApiResponse<T>(
    boolean success,
    String message,
    T data
) {}