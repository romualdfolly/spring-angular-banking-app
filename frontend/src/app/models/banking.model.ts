export interface Client {
  id: number;
  nom: string;
  prenom: string;
  email: string;
}

export interface Compte {
  numero: string;
  solde: string;
  clientId: number;
}

export interface Transaction {
  id: number;
  type: OperationType;
  montant: string;
  compteSource: string;
  compteDestination: string;
  dateTransaction: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export enum OperationType {
  RETRAIT = 'RETRAIT',
  DEPOT = 'DEPOT',
  VIREMENT = 'VIREMENT'
}