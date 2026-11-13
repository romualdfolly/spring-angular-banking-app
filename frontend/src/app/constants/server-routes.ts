import { environment } from '../environments/environment';

const BASE_URL = environment.serverBaseUrl;

export const ServerRoutes = {
  Clients: {
    GET_ALL: `${BASE_URL}/clients`,
    GET_BY_ID: (id: number) => `${BASE_URL}/clients/${id}`,
    CREATE: `${BASE_URL}/clients`,
  },

  Accounts: {
    CREATE: `${BASE_URL}/comptes`,
    ALL_COMPTES: `${BASE_URL}/comptes`,
    GET_BY_NUMERO: (numero: string) => `${BASE_URL}/comptes/${encodeURIComponent(numero)}`,
    GET_CLIENT_COMPTES: (clientId: number) => `${BASE_URL}/comptes/client/${clientId}`,
  },

  Transactions: {
    DEPOSIT: `${BASE_URL}/comptes/deposit`,
    WITHDRAW: `${BASE_URL}/comptes/withdraw`,
    TRANSFER: `${BASE_URL}/comptes/transfert`,
    ALL_TRANSACTIONS: `${BASE_URL}/transactions`,
  },
} as const;