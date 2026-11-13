package com.example.bank_portfolio_web.controllers.api;

import java.sql.SQLException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.bank_portfolio_web.dto.ApiResponse;
import com.example.bank_portfolio_web.dto.ClientDetailsResponse;
import com.example.bank_portfolio_web.forms.ClientForm;
import com.example.bank_portfolio_web.models.Client;
import com.example.bank_portfolio_web.models.Compte;
import com.example.bank_portfolio_web.services.BanqueService;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "${app.clients.cross.origins}")
public class ClientApiController {

    private final BanqueService banqueService;

    public ClientApiController(BanqueService banqueService) {
        this.banqueService = banqueService;
    }

    @GetMapping
    public ApiResponse<List<Client>> getClients() throws SQLException {
        List<Client> clients = banqueService.listClients();

        return new ApiResponse<>(
            true,
            "Clients récupérés avec succès",
            clients
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<ClientDetailsResponse> getClient(@PathVariable Long id) throws SQLException, InterruptedException {
        Client client = banqueService.findClient(id);

        if (client == null) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Client introuvable"
            );
        }

        List<Compte> comptes = banqueService.listClientComptes(id);

        ClientDetailsResponse data = new ClientDetailsResponse(client, comptes);

        return new ApiResponse<>(
            true,
            "Client récupéré avec succès",
            data
        );
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<Client> create(@RequestBody ClientForm form) throws SQLException {
        Client client = new Client(
            form.nom(),
            form.prenom(),
            form.email()
        );

        try {
            client  = banqueService.createClient(client);

            return new ApiResponse<>(
                true,
                "Client créé avec succès",
                client
            );
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                e.getMessage()
            );
        }
    }
}