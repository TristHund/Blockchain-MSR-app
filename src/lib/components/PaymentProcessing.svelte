<script>
    export let loanId;

    import { writable } from 'svelte/store';
    import Web3 from 'web3';
    import loanContractAbi from '../../abi/MortgageServicingARMABI.json';
    import { onMount } from 'svelte';
    import { payments } from '../../stores.js';

    const web3 = new Web3(window.ethereum);
    const contractAddress = '0x43C595165FE9c412EB9a970f446C259eba1a2101';
    const contract = new web3.eth.Contract(loanContractAbi, contractAddress);
  
    
  
    const paymentAmount = writable(0);
    const pendingPayments = writable([]);

    // Function to process payments
    const processPayment = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        console.log($paymentAmount)
        await contract.methods.makePayment(loanId, $paymentAmount).send({ from: accounts[0] });
        console.log("Payment processed successfully");
      } catch (error) {
        console.error("Error processing payment:", error);
      }
    };

    const fetchPendingPayments = () => {
    payments.subscribe(value => {
      const pending = value.filter(payment => payment.status === 'pending');
      pendingPayments.set(pending);
    });
  };

  const approvePayment = async (paymentId, amount) => {
    payments.approvePayment(paymentId);
    paymentAmount.set(amount)
    const payment = payments[paymentId];
    try {
      processPayment();
      console.log('Payment approved and applied to the blockchain');
    } catch (error) {
      console.error('Error applying payment:', error);
    }
  };

    onMount(() => {
    fetchPendingPayments();
  });

  </script>

<div class="bg-white p-6 rounded-lg shadow-md mt-6">
  <h2 class="text-2xl font-bold mb-4">Pending Payments</h2>
  {#each $pendingPayments as payment}
    <div class="mb-4 p-4 border border-gray-300 rounded">
      <p><strong>Payment ID:</strong> {payment.id}</p>
      <p><strong>Account Number:</strong> {payment.accountNumber}</p>
      <p><strong>Amount:</strong> {payment.amount}</p>
      <p><strong>Status:</strong> {payment.status}</p>
      <button on:click={() => approvePayment(payment.id, payment.amount)} class="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded">Approve</button>
    </div>
  {/each}
</div>
  
  <div class="mt-6 bg-gray-200 p-4 rounded-lg">
    <h3 class="text-lg font-semibold mb-2">Payment Processing</h3>
    <input 
      type="number" 
      placeholder="Enter Amount" 
      bind:value={$paymentAmount} 
      class="border p-2 rounded w-full mb-2"
    />
    <button 
      on:click={processPayment}
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      Process Payment
    </button>
  </div>
  