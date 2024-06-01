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

export const loanRequests = createLoanRequestsStore();
