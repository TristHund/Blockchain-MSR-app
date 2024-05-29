<script>
  import { selectedAccount, chainId } from 'svelte-web3';
  import { writable } from 'svelte/store';
  import Web3 from 'web3';
  import loanContractAbi from '../../abi/MortgageServicingARMABI.json';
  import LoanDetails from '$lib/components/LoanDetails.svelte';
  import OriginateLoan from '$lib/components/OriginateLoan.svelte';
  import { loanRequests } from '../../stores.js';

  const web3 = new Web3(window.ethereum);
  const contractAddress = '0x43C595165FE9c412EB9a970f446C259eba1a2101';
  const contract = new web3.eth.Contract(loanContractAbi, contractAddress);

  const loanData = writable(null);
  const searchTerm = writable('');
  const selectedLoanId = writable(null);

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

  function approveLoan(id) {
    selectedLoanId.set(id);
  };

  function denyLoan(id) {
    loanRequests.denyLoan(id);
  };

  function handleOriginationSuccess(loanId) {
    loanRequests.approveLoan(loanId);
    selectedLoanId.set(null);
  };

</script>

<div class="bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold mb-4">Originator Page</h2>
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
  {:else}
    <p>No loan data available. Please search for a loan.</p>
  {/if}
</div>

<div class="bg-white p-6 rounded-lg shadow-md mt-6">
  <h2 class="text-2xl font-bold mb-4">Loan Requests</h2>
  {#each $loanRequests as request}
    <div class="mb-4 p-4 border border-gray-300 rounded">
      <p><strong>Request ID:</strong> {request.id}</p>
      <p><strong>Account Number:</strong> {request.accountNumber}</p>
      <p><strong>Amount:</strong> {request.amount}</p>
      <p><strong>Status:</strong> {request.status}</p>
      {#if request.status === 'pending'}
        <button on:click={() => approveLoan(request.id)} class="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded mr-2">Approve</button>
        <button on:click={() => denyLoan(request.id)} class="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded">Deny</button>
      {/if}
    </div>
    {#if $selectedLoanId !== null}
      <OriginateLoan loanId={request.accountNumber} on:success={() => handleOriginationSuccess($selectedLoanId)} />
    {/if}
  {/each}
</div>



