package com.example.bank_portfolio_web.dto;

import java.util.List;

import com.example.bank_portfolio_web.models.Compte;
import com.example.bank_portfolio_web.models.Transaction;

public record CompteDetailsResponse (
    Compte compte,
    List<Transaction> transactions
) {}
