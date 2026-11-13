package com.example.bank_portfolio_web.controllers.api;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.example.bank_portfolio_web.dto.ApiResponse;
import com.example.bank_portfolio_web.models.Transaction;
import com.example.bank_portfolio_web.services.BanqueService;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "${app.clients.cross.origins}")
public class TransactionApiController {

    private final BanqueService banqueService;

    public TransactionApiController(BanqueService banqueService) {
        this.banqueService = banqueService;
    }

    @GetMapping
    public ApiResponse<List<Transaction>> gettransactions() throws SQLException {
        List<Transaction> transactions = banqueService.listTransactions();

        return new ApiResponse<List<Transaction>>(
            true,
            "Transactions récupérées avec succès",
            transactions
        );
    }

    @PostMapping("/deposit")
    public ApiResponse<Transaction> deposit(
        @RequestBody MontantRequest request
    ) throws SQLException {

        try {
            Transaction t = banqueService.deposit(
                request.numero(),
                request.montant()
            );

            return new ApiResponse<>(
                true,
                "Dépôt effectué avec succès",
                t
            );

        } catch (IllegalArgumentException | IllegalStateException e) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                e.getMessage()
            );
        }
    }

    @PostMapping("/withdraw")
    public ApiResponse<Transaction> withdraw(
        @RequestBody MontantRequest request
    ) throws SQLException, InterruptedException {
        /*
        delete from transactions where date_transaction like '%2026-11-13T%';
        select * from transactions;
        */

        try {
            Transaction t = banqueService.withdraw(
                request.numero(),
                request.montant()
            );

            return new ApiResponse<>(
                true,
                "Retrait effectué avec succès",
                t
            );

        } catch (IllegalArgumentException | IllegalStateException e) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                e.getMessage()
            );
        }
    }

    @PostMapping("/transfert")
    public ApiResponse<Transaction> transfert(
        @RequestBody TransfertRequest request
    ) throws SQLException {

        try {
            Transaction t = banqueService.transfert(
                request.numeroSource(),
                request.numeroDestination(),
                request.montant()
            );

            return new ApiResponse<>(
                true,
                "Virement effectué avec succès",
                t
            );

        } catch (IllegalArgumentException | IllegalStateException e) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                e.getMessage()
            );
        }
    }

    public record MontantRequest(
        String numero,
        BigDecimal montant
    ) {}

    public record TransfertRequest(
        String numeroSource,
        String numeroDestination,
        BigDecimal montant
    ) {}
}