import { writable } from 'svelte/store';

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
