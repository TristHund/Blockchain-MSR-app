// src/stores.js
import { writable } from 'svelte/store';

const createLoanRequestsStore = () => {
  const { subscribe, update } = writable([]);
  let nextRequestId = 1;

  return {
    subscribe,
    addLoanRequest: (loanRequest) => {
      loanRequest.id = nextRequestId++;
      update(requests => [...requests, loanRequest]);
    },
    approveLoan: (id) => {
      update(requests => {
        const index = requests.findIndex(r => r.id === id);
        if (index !== -1) {
          requests[index].status = 'approved';
        }
        return requests;
      });
    },
    denyLoan: (id) => {
      update(requests => {
        const index = requests.findIndex(r => r.id === id);
        if (index !== -1) {
          requests[index].status = 'denied';
        }
        return requests;
      });
    }
  };
};

const createPaymentsStore = () => {
  const { subscribe, update } = writable([]);
  let nextPaymentId = 1;

  return {
    subscribe,
    addPayment: (payment) => {
      payment.id = nextPaymentId++;
      update(payments => [...payments, payment]);
    },
    approvePayment: (id) => {
      update(payments => {
        const index = payments.findIndex(p => p.id === id);
        if (index !== -1) {
          payments[index].status = 'approved';
        }
        return payments;
      });
    },
  };
};

export const payments = createPaymentsStore();
export const loanRequests = createLoanRequestsStore();
