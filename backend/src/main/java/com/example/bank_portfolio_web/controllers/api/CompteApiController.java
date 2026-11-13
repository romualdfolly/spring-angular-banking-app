package com.example.bank_portfolio_web.controllers.api;

import java.sql.SQLException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.example.bank_portfolio_web.dto.ApiResponse;
import com.example.bank_portfolio_web.dto.CompteDetailsResponse;
import com.example.bank_portfolio_web.models.Compte;
import com.example.bank_portfolio_web.models.Transaction;
import com.example.bank_portfolio_web.services.BanqueService;

@RestController
@RequestMapping("/api/comptes")
@CrossOrigin(origins = "${app.clients.cross.origins}")
public class CompteApiController {

    private final BanqueService banqueService;

    public CompteApiController(BanqueService banqueService) {
        this.banqueService = banqueService;
    }

    @GetMapping
    public ApiResponse<List<Compte>> getComptes() throws SQLException {
        List<Compte> comptes = banqueService.listComptes();

        return new ApiResponse<List<Compte>>(
            true,
            "Comptes récupérés avec succès",
            comptes
        );
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<Compte> create(@RequestBody CreateCompteRequest request) throws SQLException {

        try {
            banqueService.openCompte(
                request.numero(),
                request.clientId()
            );

            Compte compte = banqueService.findCompte(request.numero());

            return new ApiResponse<>(
                true,
                "Compte bancaire créé avec succès",
                compte
            );

        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                e.getMessage()
            );
        }
    }

    @GetMapping("/{numero}")
    public ApiResponse<CompteDetailsResponse> getCompte(@PathVariable String numero) throws SQLException {

        Compte compte = banqueService.findCompte(numero);

        if (compte == null) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Compte bancaire introuvable"
            );
        }

        List<Transaction> transactions = banqueService.historique(numero);
        CompteDetailsResponse data = new CompteDetailsResponse(compte, transactions);

        return new ApiResponse<>(
            true,
            "Compte bancaire récupéré avec succès",
            data
        );
    }

    public record CreateCompteRequest(
        String numero,
        Long clientId
    ) {}
}