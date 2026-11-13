package com.example.bank_portfolio_web.dto;

import java.util.List;

import com.example.bank_portfolio_web.models.Client;
import com.example.bank_portfolio_web.models.Compte;

public record ClientDetailsResponse(
    Client client,
    List<Compte> comptes
) {}
