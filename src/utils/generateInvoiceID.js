import { nanoid } from 'nanoid';

export const generateInvoiceId = () => {
  return `INV-${nanoid(10).toUpperCase()}`; // Generates a 10-character short ID
};

export const generateTransactionId = () => {
  return `TRX-${nanoid(10).toUpperCase()}`; // Generates a 10-character short ID
}

// refercode generate

export const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}
