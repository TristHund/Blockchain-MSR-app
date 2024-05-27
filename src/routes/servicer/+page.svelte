<script>
  import { onMount } from 'svelte';
  import { selectedAccount, chainId } from 'svelte-web3';
  import { writable } from 'svelte/store';
  import Web3 from 'web3';
  import loanContractAbi from '../../abi/MortgageServicingARMABI.json';
  import LoanDetails from '$lib/components/LoanDetails.svelte';
  import PaymentProcessing from '$lib/components/PaymentProcessing.svelte';
  import AdjustInterestRate from '$lib/components/AdjustInterestRate.svelte';
  import ResetPaymentStatus from '$lib/components/ResetPaymentStatus.svelte';

  const web3 = new Web3(window.ethereum);
  const contractAddress = '0x43C595165FE9c412EB9a970f446C259eba1a2101';
  const contract = new web3.eth.Contract(loanContractAbi, contractAddress);

  const loanData = writable(null);
  const searchTerm = writable('');

  // Function to fetch Loan data
  const getLoanData = async (loanId) => {
    try {
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
    } catch (error) {
      console.error("Error fetching loan data:", error);
      loanData.set(null);
    }
  };

  // Fetch loan data when the component is mounted
  onMount(() => {
    getLoanData(1); // default loan ID for initial load
  });
</script>

<div class="bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold mb-4">Servicer Page</h2>
  <div class="mb-6">
    <input 
      type="number" 
      placeholder="Enter Loan ID" 
      bind:value={$searchTerm} 
      class="border p-2 rounded w-full"
    />
    <button 
      on:click={() => getLoanData($searchTerm)}
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
    >
      Search Loan
    </button>
  </div>

  {#if $loanData}
    <LoanDetails loan={$loanData} />
    <PaymentProcessing loanId={$loanData.loanId} />
    <AdjustInterestRate loanId={$loanData.loanId} currentInterestRate={$loanData.adjustedInterestRate} />
    <ResetPaymentStatus loanId={$loanData.loanId} isPaid={$loanData.isPaid} />
  {:else}
    <p>No loan data available. Please search for a loan.</p>
  {/if}
</div>

<style>
  .shadow-inner {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
