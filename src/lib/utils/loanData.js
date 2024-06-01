import { writable } from 'svelte/store';
import { contract } from './contract';

export const loanData = writable(null);

export const getLoanData = async (loanId) => {
    try {
        loanData.set(null);
        if (contract) {
            const loan = await contract.methods.loans(loanId).call();
            loan.loanId = Number(loan.loanId);
            loan.amount = Number(loan.amount);
            loan.initialInterestRate = Number(loan.initialInterestRate) / 100;
            loan.adjustedInterestRate = Number(loan.adjustedInterestRate) / 100;
            loan.margin = Number(loan.margin);
            loan.lifetimeCap = Number(loan.lifetimeCap);
            loan.upb = Number(loan.upb);
            loan.paymentDate = Number(loan.paymentDate);
            loan.dueDate = Number(loan.dueDate);
            loan.adjustmentInterval = Math.round(Number(loan.adjustmentInterval) / (365 * 24 * 60 * 60));
            loan.lastAdjustmentDate = Number(loan.lastAdjustmentDate);
            loanData.set(loan);
        } else {
            console.error("Contract not initialized");
            loanData.set(null);
        }
    } catch (error) {
        console.error("Error fetching loan data:", error);
        loanData.set(null);
    }
};
