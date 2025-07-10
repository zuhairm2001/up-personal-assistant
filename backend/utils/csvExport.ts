import type { Transaction, TransactionResource } from "./types";
import { writeFileSync } from "fs";
import { join } from "path";

export function createCSV(transactions: Transaction): string {
  // CSV Headers
  const headers = [
    'Date',
    'Description', 
    'Category',
    'Amount (AUD)',
    'GST',
    'Payment Method',
    'Transaction ID',
    'Vendor',
    'Notes'
  ];

  // Convert transactions to CSV rows
  const rows = transactions.data.map((transaction: TransactionResource) => {
    const attrs = transaction.attributes;
    
    // Date - prefer settledAt, fallback to createdAt
    const date = attrs.settledAt || attrs.createdAt;
    const formattedDate = new Date(date).toLocaleDateString('en-AU');
    
    // Description
    const description = attrs.description || '';
    
    // Category - extract from relationships
    const category = transaction.relationships?.category?.data?.id || 'Uncategorized';
    
    // Amount - convert to positive number for expenses, negative for income
    const amount = parseFloat(attrs.amount.value);
    const formattedAmount = Math.abs(amount).toFixed(2);
    
    // GST - Infer 10% GST for business transactions (if amount > $10 and has category)
    let gst = '';
    if (Math.abs(amount) > 10 && category !== 'Uncategorized') {
      const gstAmount = (Math.abs(amount) * 0.1 / 1.1).toFixed(2); // GST component of GST-inclusive amount
      gst = gstAmount;
    }
    
    // Payment Method
    const paymentMethod = attrs.cardPurchaseMethod?.method || 'Unknown';
    
    // Transaction ID
    const transactionId = transaction.id;
    
    // Vendor - use performingCustomer displayName or fallback to description
    const vendor = attrs.performingCustomer?.displayName || attrs.description || '';
    
    // Notes - empty as requested
    const notes = '';
    
    return [
      formattedDate,
      `"${description.replace(/"/g, '""')}"`, // Escape quotes in CSV
      category,
      formattedAmount,
      gst,
      paymentMethod,
      transactionId,
      `"${vendor.replace(/"/g, '""')}"`, // Escape quotes in CSV
      notes
    ];
  });

  // Combine headers and rows
  const csvContent = [headers, ...rows]
    .map(row => row.join(','))
    .join('\n');

  // Save to file
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `transactions_${timestamp}.csv`;
  const filepath = join(process.cwd(), 'exports', filename);
  
  try {
    // Create exports directory if it doesn't exist
    const { mkdirSync } = require('fs');
    mkdirSync(join(process.cwd(), 'exports'), { recursive: true });
    
    // Write CSV file
    writeFileSync(filepath, csvContent, 'utf8');
    console.log(`CSV exported successfully to: ${filepath}`);
  } catch (error) {
    console.error('Error writing CSV file:', error);
  }

  return csvContent;
}
